import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
const root = new URL('../', import.meta.url);
const read = p => fs.readFileSync(new URL(p, root), 'utf8');
const html = () => read('public/index.html');
test('release contains exactly the 31-slide approved HTML', () => {
  const value = html();
  assert.equal((value.match(/<section class="slide/g)||[]).length, 31);
  for (let n=1;n<=31;n++) assert.equal((value.match(new RegExp(`id="slide-${n}"`, 'g'))||[]).length,1);
  assert.equal(crypto.createHash('sha256').update(value).digest('hex'), JSON.parse(read('presentation-source/release-source.json')).sha256);
});
test('all controls, notes and dialogs exist', () => {
  for (const id of ['prev','next','counter','navTitle','overviewButton','noteButton','fullButton','helpButton','notes','notesText','overview','overviewList','help','live']) assert.ok(html().includes(`id="${id}"`),id);
  assert.equal((html().match(/data-note=/g)||[]).length,31);
});
test('inline scripts and provenance JSON parse', () => {
  for (const [,attrs,body] of html().matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if(attrs.includes('application/json')) JSON.parse(body); else new vm.Script(body);
  }
});
test('HTML has no executable network dependencies or private local references', () => {
  assert.doesNotMatch(html(), /<script[^>]+src=/i);
  assert.doesNotMatch(html(), /(?:\/Users\/|\/workspace\/|oai-library:\/\/|gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/);
  assert.doesNotMatch(html(), /(?:fetch\s*\(|XMLHttpRequest|sendBeacon\s*\()/);
});
test('publication directory exposes only the deck and robots.txt', () => {
  assert.deepEqual(fs.readdirSync(new URL('public/',root)).sort(), ['index.html','robots.txt']);
  assert.match(read('public/robots.txt'),/Disallow: \//);
});
test('Vercel is static public-only with source hidden and no functions', () => {
  const config=JSON.parse(read('vercel.json'));
  assert.equal(config.outputDirectory,'public');
  assert.equal(config.framework,null);
  assert.equal(config.buildCommand,'');
  assert.equal(config.installCommand,'');
  assert.ok(config.headers.some(x=>x.headers.some(h=>h.key==='X-Robots-Tag'&&h.value.includes('noindex'))));
  assert.equal(config.functions,undefined);
});
test('font license and proposal status survive release',()=>{
  assert.match(html(),/SIL OPEN FONT LICENSE|SIL Open Font License/i);
  assert.match(html(),/ข้อเสนอโครงร่างวิจัย/);
  assert.match(html(),/Scope 2/);
});
