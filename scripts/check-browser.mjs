#!/usr/bin/env node
// npm run test:browser
// Optional: PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs
// BASE_URL=http://127.0.0.1:8000/ skips the temporary local server.
// CHROME_EXECUTABLE=/path/to/chrome or BROWSER_CHANNEL=chromium selects a browser.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, isAbsolute, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = resolve(root, 'public');
const artifacts = resolve(root, 'artifacts/browser-qa');
const moduleName = process.env.PLAYWRIGHT_MODULE || 'playwright';
const moduleSpecifier = isAbsolute(moduleName) ? pathToFileURL(moduleName).href : moduleName;
const { chromium } = await import(moduleSpecifier);
const report = {
  startedAt: new Date().toISOString(),
  limitations: [
    'Headless Chromium/Chrome only; not Safari, Firefox, or a physical mobile device.',
    'Print-media CSS and geometry are checked, not a generated PDF or physical print.',
    'Fullscreen entry and operating-system controls are not tested.',
    'External reference links are not opened or revalidated by this browser test.',
    'Geometry checks do not replace human visual or research-content review.',
  ],
  checks: [], failures: [], profiles: [], screenshots: [],
};
let server;
let browser;

async function check(name, run) {
  try {
    const details = await run();
    report.checks.push({ name, status: 'passed', ...(details === undefined ? {} : { details }) });
    console.log(`PASS ${name}`);
    return details;
  } catch (error) {
    report.checks.push({ name, status: 'failed', error: error.message });
    report.failures.push({ name, error: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

async function serve() {
  server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      if (pathname === '/favicon.ico') { response.writeHead(204).end(); return; }
      const path = resolve(publicRoot, `.${pathname === '/' ? '/index.html' : pathname}`);
      if (!path.startsWith(`${publicRoot}${sep}`) || !(await stat(path)).isFile()) {
        response.writeHead(404).end(); return;
      }
      const mime = { '.html': 'text/html; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
        '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json' };
      response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' });
      response.end(await readFile(path));
    } catch { response.writeHead(404).end(); }
  });
  await new Promise((accept, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', accept);
  });
  return `http://127.0.0.1:${server.address().port}/`;
}

async function active(page, number) {
  await page.waitForFunction(n => document.querySelector('.slide.active')?.id === `slide-${n}`, number);
  const state = await page.evaluate(() => ({
    active: [...document.querySelectorAll('.slide.active')].map(s => s.id),
    visible: [...document.querySelectorAll('.slide')].filter(s => getComputedStyle(s).display !== 'none').map(s => s.id),
    exposed: [...document.querySelectorAll('.slide')].filter(s => s.getAttribute('aria-hidden') === 'false' && !s.inert).map(s => s.id),
    counter: document.querySelector('#counter').textContent,
  }));
  assert.deepEqual(state.active, [`slide-${number}`]);
  assert.deepEqual(state.visible, [`slide-${number}`]);
  assert.deepEqual(state.exposed, [`slide-${number}`]);
  assert.equal(state.counter.trim(), `${number} / 31`);
}

async function jump(page, number) {
  await page.evaluate(n => { location.hash = `slide-${n}`; }, number);
  await active(page, number);
  await page.evaluate(() => new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done))));
}

// Measure text fragments (rather than flex-container whitespace) against slide bounds
// and the footer. Mobile content is allowed to scroll vertically, but never horizontally.
async function geometry(page, selector = '.slide.active') {
  return page.evaluate(selector => {
    const slides = [...document.querySelectorAll(selector)];
    const compact = r => ({ x: +r.x.toFixed(2), y: +r.y.toFixed(2), width: +r.width.toFixed(2), height: +r.height.toFixed(2) });
    return slides.map(slide => {
      const rect = slide.getBoundingClientRect();
      const footer = slide.querySelector('.slide-footer').getBoundingClientRect();
      const scale = rect.width / slide.offsetWidth;
      const tolerance = Math.max(1, scale * 2);
      const issues = [];
      const add = (kind, element, box, text = '') => issues.push({ kind, element: element.tagName.toLowerCase(), class: element.className, text: text.slice(0, 90), bounds: compact(box) });
      const walk = document.createTreeWalker(slide, NodeFilter.SHOW_TEXT);
      while (walk.nextNode()) {
        const node = walk.currentNode;
        const el = node.parentElement;
        if (!node.textContent.trim() || !el || el.closest('script,style') || !el.getClientRects().length) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const box of range.getClientRects()) {
          if (!box.width || !box.height) continue;
          if (box.left < rect.left - tolerance || box.right > rect.right + tolerance || box.top < rect.top - tolerance || box.bottom > rect.bottom + tolerance) add('text-outside-slide', el, box, node.textContent);
          if (!el.closest('.slide-footer') && box.bottom > footer.top + tolerance) add('text-overlaps-footer', el, box, node.textContent);
        }
      }
      for (const el of slide.querySelectorAll('img,svg,canvas')) {
        const box = el.getBoundingClientRect();
        if (box.left < rect.left - tolerance || box.right > rect.right + tolerance || box.top < rect.top - tolerance || box.bottom > rect.bottom + tolerance) add('image-outside-slide', el, box);
      }
      if (slide.scrollWidth > slide.clientWidth + 2) issues.push({ kind: 'horizontal-slide-overflow', client: slide.clientWidth, scroll: slide.scrollWidth });
      if (slide.scrollHeight > slide.clientHeight + 2) issues.push({ kind: 'vertical-slide-overflow', client: slide.clientHeight, scroll: slide.scrollHeight });
      return { id: slide.id, title: slide.dataset.title, bounds: compact(rect), footer: compact(footer), issues };
    });
  }, selector);
}

async function screenshot(page, profile, number, label) {
  await jump(page, number);
  const filename = `${profile}-${String(number).padStart(2, '0')}-${label}.png`;
  await page.screenshot({ path: resolve(artifacts, filename), fullPage: true });
  report.screenshots.push(filename);
  if (profile === 'mobile') {
    // A full-page capture keeps the fixed toolbar at its initial viewport location.
    // Also capture the scrolled bottom to show that content remains reachable.
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    const bottom = filename.replace('.png', '-bottom.png');
    await page.screenshot({ path: resolve(artifacts, bottom) });
    report.screenshots.push(bottom);
    await page.evaluate(() => scrollTo(0, 0));
  }
}

async function exerciseNavigation(page, name) {
  await check(`${name}: navigation and boundary buttons`, async () => {
    await page.keyboard.press('Home'); await active(page, 1);
    assert.equal(await page.locator('#prev').isDisabled(), true);
    assert.equal(await page.locator('#next').isDisabled(), false);
    await page.keyboard.press('ArrowLeft'); await active(page, 1);
    await page.locator('#next').click(); await active(page, 2);
    await page.locator('#prev').click(); await active(page, 1);
    await page.keyboard.press('ArrowRight'); await active(page, 2);
    await page.keyboard.press('ArrowDown'); await active(page, 3);
    await page.keyboard.press('ArrowUp'); await active(page, 2);
    await page.keyboard.press('PageDown'); await active(page, 3);
    await page.keyboard.press('PageUp'); await active(page, 2);
    await page.evaluate(() => document.activeElement?.blur());
    await page.keyboard.press('Space'); await active(page, 3);
    await page.keyboard.press('End'); await active(page, 31);
    assert.equal(await page.locator('#next').isDisabled(), true);
    assert.equal(await page.locator('#prev').isDisabled(), false);
    await page.keyboard.press('ArrowRight'); await active(page, 31);
    await page.keyboard.press('Home'); await active(page, 1);
  });
  await check(`${name}: overview open, jump, Escape, reopen and close`, async () => {
    await page.locator('#overviewButton').click();
    assert.equal(await page.locator('#overview').evaluate(d => d.open), true);
    assert.equal(await page.locator('#overviewList button').count(), 31);
    await page.locator('#overviewList button').nth(17).click(); await active(page, 18);
    assert.equal(await page.locator('#overview').evaluate(d => d.open), false);
    await page.keyboard.press('o');
    assert.equal(await page.locator('#overview').evaluate(d => d.open), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#overview').evaluate(d => d.open), false);
    await active(page, 18);
    await page.locator('#overviewButton').click();
    assert.equal(await page.locator('#overviewList button.active').getAttribute('aria-current'), 'page');
    await page.locator('[data-close="overview"]').click();
    assert.equal(await page.locator('#overview').evaluate(d => d.open), false);
    await page.keyboard.press('ArrowRight'); await active(page, 19);
  });
  await check(`${name}: speaker notes, content update and Escape`, async () => {
    await page.locator('#noteButton').click();
    assert.equal(await page.locator('#notes').isVisible(), true);
    assert.equal(await page.locator('#noteButton').getAttribute('aria-expanded'), 'true');
    assert.equal(await page.locator('#notesText').textContent(), await page.locator('.slide.active').getAttribute('data-note'));
    await page.keyboard.press('ArrowLeft'); await active(page, 18);
    assert.equal(await page.locator('#notesText').textContent(), await page.locator('.slide.active').getAttribute('data-note'));
    await page.keyboard.press('n'); assert.equal(await page.locator('#notes').isVisible(), false);
    await page.keyboard.press('n'); assert.equal(await page.locator('#notes').isVisible(), true);
    await page.keyboard.press('Escape'); assert.equal(await page.locator('#notes').isVisible(), false);
    assert.equal(await page.locator('#noteButton').getAttribute('aria-expanded'), 'false');
  });
  await check(`${name}: help close and Escape/reopen`, async () => {
    await page.locator('#helpButton').click();
    assert.equal(await page.locator('#help').evaluate(d => d.open), true);
    await page.keyboard.press('ArrowRight'); await active(page, 18);
    await page.locator('[data-close="help"]').click();
    assert.equal(await page.locator('#help').evaluate(d => d.open), false);
    await page.keyboard.press('?');
    assert.equal(await page.locator('#help').evaluate(d => d.open), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#help').evaluate(d => d.open), false);
    await page.keyboard.press('ArrowRight'); await active(page, 19);
  });
  await check(`${name}: deep link, reload and hash change`, async () => {
    await page.goto(`${report.baseUrl.split('#')[0]}#slide-18`);
    await active(page, 18);
    await page.reload(); await active(page, 18);
    await page.evaluate(() => { location.hash = '#7'; }); await active(page, 7);
    await page.evaluate(() => { location.hash = '#slide-999'; }); await active(page, 31);
    await page.evaluate(() => { location.hash = '#slide-0'; }); await active(page, 1);
    await page.evaluate(() => { location.hash = '#invalid'; }); await active(page, 1);
  });
}

try {
  await mkdir(artifacts, { recursive: true });
  const source = await readFile(resolve(publicRoot, 'index.html'));
  report.localSourceSha256 = createHash('sha256').update(source).digest('hex');
  report.baseUrl = process.env.BASE_URL || await serve();
  const launch = { headless: true };
  if (process.env.CHROME_EXECUTABLE) launch.executablePath = process.env.CHROME_EXECUTABLE;
  else if (process.env.BROWSER_CHANNEL !== 'chromium') launch.channel = process.env.BROWSER_CHANNEL || 'chrome';
  browser = await chromium.launch(launch);
  report.browserVersion = browser.version();
  const profiles = [
    { name: 'desktop', viewport: { width: 1600, height: 1000 }, isMobile: false, hasTouch: false },
    { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
    { name: 'mobile-narrow', viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true },
  ];
  for (const profile of profiles) {
    const context = await browser.newContext({ viewport: profile.viewport, isMobile: profile.isMobile,
      hasTouch: profile.hasTouch, deviceScaleFactor: 1, reducedMotion: 'reduce', serviceWorkers: 'block' });
    const page = await context.newPage();
    page.setDefaultTimeout(7000);
    const state = { ...profile, slides: [], pageErrors: [], consoleErrors: [], externalRequests: [], failedRequests: [] };
    report.profiles.push(state);
    page.on('pageerror', error => state.pageErrors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') state.consoleErrors.push(message.text()); });
    page.on('requestfailed', request => state.failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
    await context.route('**/*', route => {
      const url = route.request().url();
      if (/^https?:/.test(url) && new URL(url).origin !== new URL(report.baseUrl).origin) {
        state.externalRequests.push(url); return route.abort();
      }
      return route.continue();
    });
    await page.goto(report.baseUrl, { waitUntil: 'networkidle' });
    await check(`${profile.name}: 31 slides, embedded loaded fonts and images`, async () => {
      assert.equal(await page.locator('.slide').count(), 31);
      const assets = await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([document.fonts.load('400 24px KKUKanit', 'พลังงาน'), document.fonts.load('700 24px KKUKanit', 'พลังงาน')]);
        return {
          fonts: [...document.fonts].map(f => ({ family: f.family, weight: f.weight, status: f.status })),
          family: getComputedStyle(document.querySelector('.slide')).fontFamily,
          images: [...document.images].map(i => ({ alt: i.alt, embedded: i.src.startsWith('data:'), complete: i.complete, width: i.naturalWidth, height: i.naturalHeight })),
          externalLoadElements: [...document.querySelectorAll('script[src],link[rel="stylesheet"],iframe,video,audio,source')].map(e => ({ tag: e.tagName, url: e.src || e.href })),
          externalCss: [...document.querySelectorAll('style')].some(e => /@import\b|url\(\s*["']?https?:/i.test(e.textContent)),
          networkCode: [...document.querySelectorAll('script:not([src])')].some(e => /\b(?:fetch\s*\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon\s*\(|import\s*\()/m.test(e.textContent)),
        };
      });
      assert.ok(assets.family.includes('KKUKanit'));
      assert.deepEqual(assets.fonts.map(f => `${f.family}/${f.weight}/${f.status}`).sort(), ['KKUKanit/400/loaded', 'KKUKanit/700/loaded']);
      assert.equal(assets.images.length, 4);
      assert.ok(assets.images.every(i => i.embedded && i.complete && i.width > 0 && i.height > 0));
      assert.deepEqual(assets.externalLoadElements, []);
      assert.equal(assets.externalCss, false);
      assert.equal(assets.networkCode, false);
      return assets;
    });
    await exerciseNavigation(page, profile.name);
    await check(`${profile.name}: all 31 slides, single-active state and overflow`, async () => {
      for (let n = 1; n <= 31; n++) {
        await jump(page, n);
        state.slides.push(...await geometry(page));
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `document horizontal overflow on slide ${n}`);
        if (profile.isMobile) {
          const bottom = await page.evaluate(() => {
            scrollTo(0, document.documentElement.scrollHeight);
            const footer = document.querySelector('.slide.active .slide-footer').getBoundingClientRect();
            const toolbar = document.querySelector('#toolbar').getBoundingClientRect();
            return { footerTop: footer.top, footerBottom: footer.bottom, toolbarTop: toolbar.top };
          });
          assert.ok(bottom.footerTop >= 0 && bottom.footerBottom <= bottom.toolbarTop + 2,
            `slide ${n} footer cannot be scrolled above the fixed toolbar: ${JSON.stringify(bottom)}`);
        }
      }
      const bad = state.slides.filter(s => s.issues.length);
      assert.deepEqual(bad.map(s => ({ id: s.id, issues: s.issues })), []);
      return { count: state.slides.length, overflowIssues: 0 };
    });
    if (profile.name !== 'mobile-narrow') {
      for (const [number, label] of [[1, 'first'], [18, 'method'], [26, 'discussion'], [31, 'final']]) {
        await screenshot(page, profile.name, number, label);
      }
    }
    if (profile.hasTouch) {
      await check(`${profile.name}: synthetic swipe navigation and vertical-scroll reset`, async () => {
        await jump(page, 18);
        await page.evaluate(() => {
          const canvas = document.querySelector('#canvas');
          const start = new Touch({ identifier: 1, target: canvas, clientX: 280, clientY: 250 });
          const end = new Touch({ identifier: 1, target: canvas, clientX: 80, clientY: 255 });
          canvas.dispatchEvent(new TouchEvent('touchstart', { touches: [start], bubbles: true }));
          canvas.dispatchEvent(new TouchEvent('touchend', { changedTouches: [end], bubbles: true }));
        });
        await active(page, 19);
        await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
        assert.ok(await page.evaluate(() => scrollY > 0));
        await page.locator('#next').click(); await active(page, 20);
        assert.equal(await page.evaluate(() => scrollY), 0);
      });
    }
    await check(`${profile.name}: navigation without a network connection`, async () => {
      await context.setOffline(true);
      await page.keyboard.press('Home'); await active(page, 1);
      await page.keyboard.press('ArrowRight'); await active(page, 2);
      await page.keyboard.press('End'); await active(page, 31);
      await context.setOffline(false);
    });
    if (profile.name === 'desktop') {
      await check('desktop: print-media geometry for all 31 slides', async () => {
        await page.emulateMedia({ media: 'print' });
        state.printSlides = await geometry(page, '.slide');
        const print = await page.evaluate(() => ({
          slides: [...document.querySelectorAll('.slide')].map(s => ({ id: s.id, display: getComputedStyle(s).display,
            width: s.getBoundingClientRect().width, height: s.getBoundingClientRect().height,
            top: s.getBoundingClientRect().top, breakAfter: getComputedStyle(s).breakAfter })),
          toolbar: getComputedStyle(document.querySelector('#toolbar')).display,
          canvasTransform: getComputedStyle(document.querySelector('#canvas')).transform,
        }));
        assert.equal(print.toolbar, 'none'); assert.equal(print.canvasTransform, 'none');
        assert.equal(print.slides.length, 31);
        for (const [i, s] of print.slides.entries()) {
          assert.equal(s.display, 'flex'); assert.equal(s.width, 1600); assert.equal(s.height, 900);
          assert.ok(Math.abs(s.top - i * 900) < 2, `${s.id} does not form a separate print page`);
          assert.equal(s.breakAfter, i === 30 ? 'auto' : 'page');
        }
        assert.deepEqual(state.printSlides.filter(s => s.issues.length), []);
        await page.emulateMedia({ media: 'screen' });
        return print;
      });
    }
    await check(`${profile.name}: no page errors or external asset requests`, async () => {
      assert.deepEqual(state.pageErrors, []); assert.deepEqual(state.externalRequests, []);
      assert.deepEqual(state.consoleErrors, []); assert.deepEqual(state.failedRequests, []);
    });
    await context.close();
  }
} catch (error) {
  report.failures.push({ name: 'browser test infrastructure', error: error.stack || error.message });
  console.error(error);
} finally {
  if (browser) await browser.close();
  if (server) await new Promise(done => server.close(done));
  report.finishedAt = new Date().toISOString();
  report.status = report.failures.length ? 'failed' : 'passed';
  await mkdir(artifacts, { recursive: true });
  await writeFile(resolve(artifacts, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`${report.status.toUpperCase()}: ${report.checks.filter(c => c.status === 'passed').length} checks passed; ${report.failures.length} failures. Report: artifacts/browser-qa/report.json`);
  process.exitCode = report.failures.length ? 1 : 0;
}
