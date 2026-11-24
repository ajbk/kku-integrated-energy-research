# KKU Integrated Energy Research | Project handoff

Updated 24 November 2026. Start here for the revised proposal. The historical section below is retained for reference, not as the current experiment protocol.

## Current proposal

Read [When Does Perfect Foresight Mis-Size Campus Energy Assets?](docs/06_policy_aware_sizing_proposal_revised_EN.md) as the canonical working proposal for adviser discussion. The question is whether PV and BESS capacities chosen with perfect foresight remain appropriate when the system can use only information available at decision time, and whether billed-peak memory and declared EV charging commitments help predict when designs switch rank. Do not claim confirmed novelty, approval, feasibility, or measured KKU results. Start the prior-art review with the full texts in §1 of the proposal.

The 19 Engineering buildings define screening scope, not 19 independent meters. Target 2–4 verified billing points for detailed evaluation. Keep fixed EV infrastructure and unidirectional managed charging (V1G) in the central case; preserve no-new-investment, PV-only and zero-BESS alternatives. Report PV kWp, BESS power in kW and energy in kWh separately. Do not assume export or cross-account netting.

## Fair comparison

1. The retrospective oracle has realized future data and gives a lower cost bound **at fixed design, physics, service and chronology**. It is not a deployable controller or evidence of realizable savings.
2. The causal controller sees only information known before each decision: observed SOC and billing peak, active connections and timestamped EV requests. Actual departure, delivered energy and the final billed peak are outcomes, not inputs.
3. Select capacities on development data and lock both designs before chronological holdout. Compare (a) oracle versus causal costs at the same design, (b) the two selected designs operated by the **same causal controller**, and (c) capacity choices including zero BESS. The held-out sizing difference can change sign. Use only certified oracle lower bounds for screening, not unconverged feasible incumbents. Coordination, lower-bound pruning and the fact that oracle costs are optimistic do not establish novelty; test the proposed crossover mechanisms on unseen data.

## Evidence and decision gates

- **Meter and billing:** Obtain a custodian-verified building/account/submeter map, applicable terms, actual read-to-read invoice and native interval export. Reconcile energy, eligible physical peak and billed demand separately. One reconciled bill is a first test, not multi-meter validation. Do not fill peak-window gaps silently, infer a tariff, or promise export credit or settlements without evidence.
- **EV:** Ask an authorized operator for de-identified records distinguishing plug-in/out from charging start/stop, power and energy, charger-to-meter mapping, and what requested energy and departure were available to the controller and when. Do not infer commitments from realized outcomes. Obtain separate privacy/ethics, publication and control approvals; read-only access is not dispatch permission. Start with shadow mode; live opt-in operation requires authorized supervision and fallback. Keep raw bills and identifiable sessions outside the repository.
- **Preferred B+C:** New method and prospective field evidence if billing, control, operations and publication access are verified. **Fallback B+D:** If control is unavailable, proceed only with adviser agreement and independently measured site evidence that supports the same decision-time question under declared tariff scenarios. One KKU site plus one qualified outside site can test transferability, not KKU multi-meter performance. If measured cases are inadequate, pause. Synthetic-only evidence is not a completion route; public component data or synthetic fixtures can test mechanics without being presented as integrated KKU validation.
- **Sources:** [KKU administration minutes on internal metering](https://council.kku.ac.th/wp-content/uploads/2024/06/KKU-Admin-Meeting-Report_No.-8-67_20-May-2024.pdf#page=14) and [2023 V2H prototype](https://www.khonkaen.go.th/khonkaen6/detail/dtActivity.php?id=4203&ym=) are dated context, not current utility or control evidence. [ACN-Data](https://ev.caltech.edu/dataset), [CU-BEMS](https://www.nature.com/articles/s41597-020-00582-3), and [Building Data Genome 2](https://doi.org/10.1038/s41597-020-00712-x) are separate benchmarks; splicing them does not create a measured integrated site.

## Branches and next actions

- [Revised proposal and handoff](https://github.com/ajbk/kku-integrated-energy-research/tree/research/policy-aware-sizing-revision): continue from this branch, following [AGENTS.md](AGENTS.md).
- [EN049992-2 seminar](https://github.com/ajbk/kku-integrated-energy-research/tree/seminar/en049992-2-2026-11-21): the separate Thai/English three-slide decks predate the revision and **are not yet aligned**. Preserve the originals. If asked to revise, first map the changed question, comparators, scope and evidence status before editing a new copy.
- [Release](https://github.com/ajbk/kku-integrated-energy-research/tree/research/integrated-energy-19-buildings) and [main](https://github.com/ajbk/kku-integrated-energy-research/tree/main): retain separately. The existing website is not the revised proposal. Do not merge, publish, open a PR, or deploy under this handoff.
- Next: (1) review nearest prior art and prepare adviser decisions; (2) establish one bill/export pair and EV schema; (3) at the 30-day access review choose B+C, B+D or pause; (4) freeze the capacity catalog, replay policy and held-out-test rules when evidence permits; (5) handle any seminar alignment as separate work.

## Paste-ready starter for another AI

> Continue the private ajbk/kku-integrated-energy-research project on research/policy-aware-sizing-revision. Read AGENTS.md, this handoff's current sections and docs/06_policy_aware_sizing_proposal_revised_EN.md. Treat the last file as canonical. First summarize the decision-time question, the oracle versus causal comparisons, and the B+C/B+D evidence gaps. Then propose a prior-art checklist and the facts needed for one reconciled bill and one usable EV sample. Label verified, assumed and unknown separately. Do not claim novelty, approval, KKU results, tariff or export rights without evidence. Keep seminar and release work separate. Do not change artifacts, open a PR, deploy, contact anyone, transfer private data or operate devices without specific instructions. For thesis-bound writing, work from the student's own substantive text and follow KKU's AI-use disclosure rules.

---

## Historical context (not the current protocol)

The remainder records the legacy research direction and seminar handoff. Its terminology and branch pointers do not supersede the sections above.

## เริ่มตรงนี้

Research direction: **Integrated Energy Portfolio Planning under Uncertainty** สำหรับ 19 อาคารคณะวิศวกรรมศาสตร์ มหาวิทยาลัยขอนแก่น คำถามคือควรลงทุนอะไร ขนาดเท่าใด ที่จุดใด และเมื่อใด ภายใต้ข้อจำกัดระบบไฟฟ้า บริการ และความไม่แน่นอน นี่เป็นแนวทางวิจัยแยกจาก Proposal v3, PV paper, PV/BESS PoC, thesis tracker และ portfolio เดิม ไม่ได้แทนที่หรือเปลี่ยนสถานะของงานเหล่านั้น

**สถานะ:** มีข้อเสนอ แผนทดลอง และสื่อสำหรับหารือ ยังไม่มี simulation engine, backend, การควบคุมอุปกรณ์จริง ผลทดลองจากข้อมูล มข. หรือข้อยืนยันว่าอาจารย์อนุมัติหัวข้อ ผลประโยชน์ หรือนโยบาย Net Zero ตัวเลขสมมติสำหรับทดลองวิธีต้องติดป้าย synthetic ชัดเจน ไม่ใช่ผลของทั้ง 19 อาคาร

- **Repo ส่วนตัว:** `ajbk/kku-integrated-energy-research` · **branch สำหรับรับช่วงพร้อมไฟล์สัมมนา:** `seminar/en049992-2-2026-11-21`
- **Default/release branch:** `research/integrated-energy-19-buildings` คนละหน้าที่กับ branch ส่งต่องานนี้ หากได้รับโจทย์ใหม่ ให้แยก working branch จากฐานที่ตรงงาน อย่าแก้หรือ merge เข้า release branch โดยอัตโนมัติ
- ใช้ checkout ที่ได้รับอนุญาตและอ่าน [AGENTS.md](AGENTS.md) ก่อนเริ่ม ไม่ต้องใช้พาธบน Mac ของผู้วิจัยเมื่อต่อจากเครื่องอื่น ไม่แตะต้นฉบับใน worktree อื่น โฟลเดอร์เดิม หรือ iCloud
- ข้อความสำหรับเริ่มกับ AI ตัวอื่นอยู่ท้ายไฟล์ สิทธิ์อ่าน repo ไม่ได้ให้อำนาจแชร์ข้อมูล เปลี่ยนสิทธิ์ เปิด PR หรือ deploy

## แผนที่ไฟล์

| เมื่อจะทำเรื่องนี้ | อ่านหรือแก้ไฟล์นี้ |
| --- | --- |
| ขอบเขต คำถามวิจัย วัตถุประสงค์ ชื่อ/abstract | [ข้อเสนอหลักภาษาไทย](docs/01_proposal_TH.md) |
| เทียบแนวทางนี้กับ Proposal v3 และ PV/BESS เดิม | [เปรียบเทียบขอบเขต](docs/02_scope_comparison.md) |
| ออกแบบ comparator, scenarios, holdout และ KPI | [แผนทดลองและตัวชี้วัด](docs/03_experiments_and_metrics.md) |
| ขอข้อมูล ประเมินความพร้อม และควบคุมข้อสรุป | [ข้อมูลและเงื่อนไขการสรุปผล](docs/04_data_and_claim_gates.md) |
| ตรวจ novelty, เอกสารอ้างอิง และกติกาที่ยังไม่ยืนยัน | [แหล่งข้อมูลและคำถามเปิด](docs/05_sources_and_open_questions.md) |
| แก้สไลด์วิจัยฉบับเว็บ (31 สไลด์ รวม 5 สไลด์อ้างอิง) | [ไฟล์ HTML ต้นฉบับ](public/index.html), [hash และที่มา](presentation-source/release-source.json), [ที่มาสินทรัพย์ภาพ](presentation-source/theme-provenance.json) |
| เตรียมนำเสนอ EN049992-2 | [Handoff สัมมนา](deliverables/EN049992-2/HANDOFF.md): PowerPoint ไทย/อังกฤษ แยกไฟล์ ฉบับละ 3 สไลด์ พร้อมโน้ตและตรา มข. ไม่ใช้โลโก้ กฟผ. ในชุดนี้ ยังไม่ได้ส่งงานหรือยืนยันกำหนดส่ง |
| ตรวจที่มาของเอกสารเดิมและประวัติการเผยแพร่ | [Source manifest](source_manifest.json), [บันทึกช่วงเริ่มโครงการ](VERIFICATION.md), [บันทึกตรวจ release](RELEASE_CHECKS.md) |

ข้อเสนอ Markdown, เว็บ 31 สไลด์ และสไลด์สัมมนาเป็นคนละชุด เว็บมีบริบทบรรณานุกรมที่ปรับเพิ่มภายหลัง ส่วนสไลด์สัมมนาย่อวิธีเพื่อการนำเสนอ ใช้ protocol ใน `docs/03_experiments_and_metrics.md` เป็นแหล่งหลักสำหรับชื่อการทดลองและเงื่อนไข ไม่คัดตัวอักษร A/B/C จากสไลด์สั้นไปตั้งชื่อผลทดลองตรง ๆ

## หลักที่ต้องรักษาหากทำวิจัยต่อ

1. **ขอบเขต 19 อาคาร ไม่ใช่ 19 มิเตอร์ที่ยืนยันแล้ว** แยกอาคารออกจากจุดคิดค่าไฟและมิเตอร์ย่อย หากหลายอาคารแชร์จุดคิดค่าไฟ ให้ตรวจบิลที่จุดนั้นก่อนจัดสรรรายอาคาร ห้ามหักกลบค่าไฟหรือสมมติส่งพลังงานข้ามมิเตอร์โดยไม่มีหลักฐาน จุดวัดเดียวใช้เริ่มทดสอบ workflow ได้ แต่ไม่ใช่เงื่อนไขบังคับและไม่ใช่ขอบเขตสุดท้าย
2. **ตัดสินใจลงทุนแยกจากการเดินระบบ** มีฐานระบบเดิม/ไม่ลงทุนและ PV-only เทียบกับ BESS, การจัดเวลาชาร์จ EV แบบทางเดียว และโหลดที่เลื่อนได้ตามสิทธิ์ ขนาดศูนย์เป็นคำตอบที่ยอมรับได้ ไม่ตั้งสมมติฐานว่าทุกอาคารต้องติดทุกระบบ
3. **เปรียบเทียบอย่างเป็นธรรม** ใช้ขอบเขต ระบบเดิม ระดับบริการ และข้อมูลที่วิธีแต่ละแบบรู้ได้เท่ากัน แยกคุณค่าจากการประสานการเดินระบบ (Dsep/D1) การเลือกขนาดร่วมเทียบแยก (Psep/P0) และการวางแผนรับความไม่แน่นอน (P0/P1) กันข้อมูลหรือสถานการณ์ไว้ทดสอบโดยไม่รั่วเป็นข้อมูลฝึก และแยกกรณีรู้อนาคตออกเป็นเพียงขอบบน ถ้ามี EV ให้เทียบฐานชาร์จจากกริดที่ให้บริการระดับเดียวกัน และตรวจทั้งการครองช่องชาร์จกับกำลังไฟรวม
4. **ตรวจบิลก่อนอ้างผลประหยัด** ยืนยัน meter topology, รอบบิล, อัตราและช่วงคิด demand จากบัญชีจริง ตรวจพลังงาน กำลังไฟสูงสุด ต้นทุน/NPV ความเสี่ยง ผลต่อความสบายและบริการ EV บันทึกสมมติฐานและหน่วยให้ทำซ้ำได้ ข้อมูลขาดเป็น unknown ไม่ใช่ศูนย์
5. **สิทธิ์ก่อนนับผล** ค่าเริ่มต้นคือไม่ส่งออกจนมีหลักฐานแยกทั้งสิทธิ์ส่งและสิทธิ์รับเงิน ไม่เดาอัตราค่าไฟหรือรายได้ EV แยก Scope 2 ออกจาก avoided emissions และไม่อ้าง Net Zero หรือหักการส่งออกออกจาก Scope 2 โดยอัตโนมัติ

## งานถัดไปตามลำดับข้อมูล

| ลำดับ | ผลงานที่ควรได้ | เงื่อนไขก่อนขยับต่อ |
| --- | --- | --- |
| 1. ยืนยันโจทย์และช่องว่างงานวิจัย | ตารางเทียบงานวิจัยจากฉบับเต็ม แยกสิ่งที่ทราบ สมมติฐาน และคำถามที่ต้องหารืออาจารย์ | ยังไม่ถือว่า novelty หรือหัวข้อได้รับอนุมัติ |
| 2. ทำบัญชีความพร้อมข้อมูล | แผนผังอาคาร–จุดคิดค่าไฟ–มิเตอร์ย่อย พร้อมเจ้าของข้อมูล สิทธิ์ใช้ บิล ข้อมูลตามช่วงเวลา และรายการที่ขาด | ใช้ข้อมูลจริงเฉพาะที่ได้รับอนุญาต เก็บข้อมูลดิบแยก ไม่ commit บิลจริงหรือข้อมูลผู้ใช้ EV โดยปริยาย |
| 3. ทำฐานขั้นต่ำที่ตรวจได้ | สัญญา schema และ fixture ที่ระบุว่า synthetic สำหรับเทสต์สมดุลพลังงาน SOC และการคำนวณบิล จากนั้นเทียบบิลจริงเมื่อได้ข้อมูล | ถ้ายังเทียบบิลจริงไม่ได้ ให้รายงานว่าเป็นการทดสอบวิธี ไม่ใช่ผลประหยัด |
| 4. พัฒนาการทดลอง | เทียบฐานระบบเดิมและ PV-only ก่อน แล้วเพิ่ม BESS/EV/flex ตามความพร้อม บันทึก baseline, ข้อจำกัด และชุดทดสอบให้ทำซ้ำได้ | ยังไม่เสนอแผนลงทุนจนผ่านเงื่อนไขข้อมูล บริการ สิทธิ์ และความไม่แน่นอนสำหรับกรณีนั้น |

ถ้าได้รับงานให้รับช่วงแต่ยังไม่ได้ระบุสิ่งที่ต้องแก้ ให้ส่งสรุปสั้น ๆ ว่า repo มีอะไรแล้ว จุดตัดสินใจถัดไปคืออะไร และข้อมูลใดขาด ไม่สร้างตัวเลขหรือเปลี่ยนทิศวิจัยเอง

## แก้เว็บและตรวจงาน

เว็บเป็น HTML/CSS/JavaScript แบบ static และใช้งาน offline ได้ ไม่ใช่แอป simulation แก้ `public/index.html` โดยตรงเฉพาะเมื่อโจทย์คือเว็บ เก็บฟอนต์ Kanit และใบอนุญาต ไม่ใช้ Python generator เก่าทับ HTML ที่ปรับแล้ว ถ้าแก้ HTML โดยตั้งใจจึงอัปเดต SHA-256 และประวัติใน `presentation-source/release-source.json` ตรวจสไลด์ที่กระทบจริง

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory public
```

ทดสอบจาก checkout ด้วย Node.js 24 ขึ้นไป:

```sh
npm ci
npm test
npm run test:browser
```

Browser check ใช้ Playwright 1.64.1 กับ Chrome ที่ติดตั้งแล้ว หรือ Chromium รุ่นที่ตรงกัน รองรับ `BASE_URL` และ `PLAYWRIGHT_MODULE` ตาม [สคริปต์](scripts/check-browser.mjs) ตรวจ navigation/notes/dialogs/deep links และ desktop/mobile แยกจากการตรวจข้อสรุปทางวิจัย หน้าเว็บและชุดสัมมนาต้องตรวจแสดงผลคนละแบบ

## ประวัติการเผยแพร่และขอบเขตสิทธิ์

- Vercel project `kku-integrated-energy-research` ให้บริการจาก `public/` เท่านั้น ไม่วาง Markdown, บันทึกส่งต่อ หรือข้อมูลภาคสนามไว้ในโฟลเดอร์นี้ เว็บที่เคยเผยแพร่: [KKU research deck](https://kku-integrated-energy-research.vercel.app/)
- การเผยแพร่แรกจาก commit `3ee136a68e62a64e0f4c9b3fe5b4ebb08468d013` ตรวจไว้ใน `RELEASE_CHECKS.md` รวมการตรวจ hash และสิทธิ์เข้าถึง **ณ เวลานั้น** ไม่ใช้บันทึกเดิมยืนยันการตั้งค่าปัจจุบัน Repo แบบ private และ `noindex` ไม่ได้แปลว่าเว็บจำกัดสิทธิ์ ให้ตรวจแยกเมื่อมีงานแชร์หรือเผยแพร่ และอย่าเปลี่ยนสิทธิ์โดยพลการ
- อัปเดต handoff บน branch สัมมนานี้ ไม่แก้เว็บ ไม่แก้สไลด์ และไม่สั่ง deploy หรือ promote production การเผยแพร่ครั้งถัดไปต้องยืนยันขอบเขตสิทธิ์และ commit ที่จะเผยแพร่กับเจ้าของงาน

## ข้อความสำหรับให้ AI ตัวอื่นรับช่วง

> ทำงานใน private repo `ajbk/kku-integrated-energy-research` โดยเริ่มจาก branch `seminar/en049992-2-2026-11-21` อ่าน `AGENTS.md` และ `HANDOFF.md` ที่ราก repo ก่อน จากนั้นอ่านข้อเสนอใน `docs/01_proposal_TH.md` แผนทดลองใน `docs/03_experiments_and_metrics.md` และเงื่อนไขข้อมูลใน `docs/04_data_and_claim_gates.md` สรุปสถานะจริง จุดที่ยังต้องยืนยัน และแผนสำหรับงานที่ได้รับก่อนแก้ รักษาขอบเขต 19 อาคารและอย่าสมมติจำนวนมิเตอร์/ข้อมูล/ผลทดลอง หากเป็นงานสไลด์สัมมนา ให้ดู `deliverables/EN049992-2/HANDOFF.md` ไม่แก้ต้นฉบับเว็บเพื่ออัปเดต PowerPoint และอย่า merge, deploy หรือแชร์ข้อมูลออกนอก repo ถ้าไม่ได้รับมอบหมาย
