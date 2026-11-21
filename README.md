# KKU Integrated Energy Research

ร่างแนววิจัยใหม่สำหรับ 19 อาคารคณะวิศวกรรมศาสตร์ มหาวิทยาลัยขอนแก่น แยกจากงานวิจัยเดิม

## เริ่มอ่าน

ถ้ามารับช่วงโครงการ ให้เริ่มที่ [Project handoff](HANDOFF.md) ซึ่งระบุ branch แหล่งอ้างอิง งานถัดไป และข้อความสำหรับให้ AI ตัวอื่นเริ่มงาน

1. [ข้อเสนอหลักภาษาไทยพร้อมชื่อและ Abstract ภาษาอังกฤษ](docs/01_proposal_TH.md)
2. [เปรียบเทียบกับแนวเดิม](docs/02_scope_comparison.md)
3. [แผนทดลองและตัวชี้วัด](docs/03_experiments_and_metrics.md)
4. [ข้อมูลและระดับการกล่าวอ้าง](docs/04_data_and_claim_gates.md)
5. [ที่มาและคำถามเปิด](docs/05_sources_and_open_questions.md)
6. [ผลตรวจความแยกจากต้นฉบับ](VERIFICATION.md)

แนวใหม่พิจารณา PV, BESS, smart EV charging, flexible load, efficiency และ export ตามสิทธิ์ เพื่อเศรษฐศาสตร์และเส้นทางลดคาร์บอน เลือกไม่ลงทุนหรือไม่ติดตั้งบางระบบได้

## สถานะ

เป็นข้อเสนอสำหรับหารือ ไม่ใช่ผลทดลอง ไม่ใช่หัวข้อที่อาจารย์อนุมัติ ไม่รับรองสิทธิ์ export และไม่อ้างว่าบรรลุ Net Zero แล้ว ร่างวิจัยเดิมยังไม่มี simulation หรือผลทดลอง ส่วนการเผยแพร่หน้าเว็บเพิ่มเติมวันที่ 11 พฤศจิกายน 2026 อธิบายใน HANDOFF.md

## การแยกงาน

โฟลเดอร์วิจัยเดิมไม่ได้เป็น Git repository จึงสร้าง repo ใหม่เฉพาะแนวนี้ แล้วแยก linked Git worktree จริง ไม่ได้แยกจาก repo เว็บ portfolio หรือ tracker และไม่ได้ initialize Git ในโฟลเดอร์วิจัยเดิม

- Base repository: `/Users/ajbk/Documents/ChatGPT/PhD/kku-integrated-energy-research`
- Worktree: `/Users/ajbk/Documents/ChatGPT/PhD/kku-integrated-energy-research/.worktrees/integrated-energy-net-zero`
- Branch: `research/integrated-energy-19-buildings`
- Base branch: `main`
- GitHub repository แบบ private: https://github.com/ajbk/kku-integrated-energy-research
- Vercel project: kku-integrated-energy-research (สถานะการจำกัดสิทธิ์ต้องตรวจแยกก่อนแชร์หรือเผยแพร่)

ใช้ `git worktree list` จาก base repository เพื่อตรวจ ใช้งานต่อใน worktree เท่านั้น main เก็บเพียงฐาน/manifest ไม่มีร่างแนวใหม่ปนอยู่ใน main แหล่งงานเดิมและ hashes อยู่ใน [source_manifest.json](source_manifest.json)

วันที่จัดทำ 10 พฤศจิกายน 2026

## Website release and developer handoff

[เอกสารส่งต่องาน](HANDOFF.md) ระบุวิธีแก้ไข ทดสอบ และ deploy หน้าเว็บ 31 สไลด์ที่ `public/index.html` เผยแพร่เฉพาะ `public/` ไม่รวมเอกสารวิจัยหรือ manifest ในเว็บไซต์

ตรวจด้วย `npm test` และ `npm run test:browser` ตามคำแนะนำใน handoff ไม่มี backend หรือการติดตั้งระบบพลังงานจริง

เว็บที่เคยเผยแพร่: https://kku-integrated-energy-research.vercel.app/ ดูประวัติการตรวจสิทธิ์ที่ [RELEASE_CHECKS.md](RELEASE_CHECKS.md)
