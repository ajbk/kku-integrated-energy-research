# แหล่งที่มาและสิ่งที่ต้องยืนยัน

## เอกสารเดิมที่ตรวจอ่านเพื่อรักษาความต่อเนื่อง

1. Clean Energy PhD Proposal 19 Buildings v3 TH วันที่ 26 ตุลาคม 2026: แกน measurement-calibrated model transfer และความน่าเชื่อถือของการเลือกลงทุน
2. KKU PV Paper Working Draft TH วันที่ 29 ตุลาคม 2026: ร่างบทความเรื่องความละเอียดข้อมูลโหลดกับการเลือก PV โดยยังไม่มีผลทดลอง
3. PV and BESS Investment Analysis Proof of Concept developer handoff วันที่ 2 พฤศจิกายน 2026: baseline/PV/PV+BESS, representative billing meter, readiness gates, physical and billing validation

ตำแหน่งไฟล์จริงและ SHA-256 อยู่ใน [source manifest](../source_manifest.json) เพื่อพิสูจน์ว่าอ่านโดยไม่แก้ต้นฉบับ ข้อมูลเหล่านี้เป็นเอกสารวิจัยของผู้ใช้ ไม่ใช่ dataset ภาคสนามหรือการอนุมัติใหม่จากอาจารย์

## ขอบเขตคำขอที่นำมาร่าง

ผู้วิจัยขอขยายจาก PV/BESS ไปยังเทคโนโลยีอื่น รายได้ EV การส่งออกช่วงโหลดต่ำ และการใช้พลังงานให้เกิดประโยชน์สูงสุดร่วมกับ Net Zero พร้อมขอให้แยกจากงานเดิมใน worktree ใหม่ จึงจัดทำเป็นแนวทางเลือก ไม่แก้สถานะ CURRENT ของต้นฉบับ

## Literature leads จากบรรณานุกรมเดิม

รายการต่อไปนี้เป็นจุดเริ่มตรวจ novelty ไม่ใช่หลักฐานว่าแนวใหม่ไม่มีผู้ทำมาก่อน รอบนี้อ่านบริบทที่สรุปไว้ในเอกสารเดิม ยังไม่ได้ทำ systematic review หรือยืนยันรายละเอียดฉบับเต็มใหม่

- Furukakoi et al. (2025), Optimization of PV and battery systems in university campuses: A combined planning and operation approach under uncertainties, Energy and Buildings, 335, 115512. https://doi.org/10.1016/j.enbuild.2025.115512
- Langtry and Choudhary (2025), Quantifying the benefit of load uncertainty reduction for the design of district energy systems under grid constraints using the value of information, Applied Energy, 400, 126549. https://doi.org/10.1016/j.apenergy.2025.126549
- Zhang et al. (2022), Model predictive control for demand flexibility: Real-world operation of a commercial building with photovoltaic and battery systems, Advances in Applied Energy, 7, 100099. https://doi.org/10.1016/j.adapen.2022.100099
- Hu et al. (2024), Improved robust model predictive control for residential building air conditioning and photovoltaic power generation with battery energy storage system under weather forecast uncertainty, Applied Energy, 371, 123652. https://doi.org/10.1016/j.apenergy.2024.123652

## สิ่งที่ literature review ใหม่ต้องตอบ

1. มีงาน campus/district co-planning ที่รวม PV, BESS, smart EV และ demand response พร้อม uncertainty และ out-of-sample evaluation แล้วเพียงใด
2. งานใดแยก coordination value จาก sizing value และรักษา same-service baseline
3. งานใดรวม meter topology, export eligibility และ revenue/attribute accounting อย่างครบถ้วน
4. งานใดทดสอบ substitution/complementarity ของ BESS กับ smart charging/flex โดยมี degradation และ QoS
5. ความต่างที่เสนอเป็น methodological contribution หรือเพียง case-specific integration และต้องออกแบบหลักฐานอย่างไรจึงเหมาะระดับปริญญาเอก

ตาราง literature matrix ที่ต้องสร้างภายหลัง: paper/version/full-text checked, system/assets, meter topology, services, uncertainty types, control information, financial boundary, carbon boundary, baselines, validation, limitations และ exact gap ที่ยังเหลือ

## Regulatory and accounting checks

ยังไม่ได้ยืนยันอัตราค่าไฟหรือกติกาส่งออกที่ใช้กับสถานที่นี้ ต้องตรวจผู้ถือมิเตอร์ ผู้รับอนุญาต ผู้ให้บริการจำหน่าย สัญญาเชื่อมต่อ/รับซื้อ และเอกสารที่มีผล ณ วันที่วิเคราะห์ ไม่ตีความข่าวหรือโครงการนำร่องเป็นสิทธิ์ของทุกอาคาร

ก่อน claim carbon ให้ยืนยัน inventory boundary, แนวทาง Scope 2/Net Zero ที่ใช้, grid emission factors ของปีที่เกี่ยวข้อง และ ownership/retirement ของ energy attributes หากใช้ TGO, GHG Protocol หรือมาตรฐานอื่น ต้องตรวจฉบับที่ใช้จริงและระบุแหล่ง/วันเข้าถึงในฉบับทดลอง ไม่ใส่ค่า factor จากความจำ

## คำถามเปิดเรียงตามผลกระทบ

- อาจารย์เห็นชอบให้แกนหลักเปลี่ยนหรือให้เป็น extension ของ v3
- คณะมี authority ต่อการลงทุน รายได้ EV และการใช้ไฟของทุกมิเตอร์หรือไม่
- จำนวนมิเตอร์/จุดเชื่อมต่อจริงและ existing PV/BESS/EV คืออะไร
- EV demand เป็นบริการเดิมหรือโครงการใหม่ และใครรับรายได้/จ่ายค่าไฟ
- Load ใดยืดหยุ่นได้จริงโดยไม่เสียบริการ
- Export มีสิทธิ์อะไรและได้ค่าตอบแทนหรือไม่
- เป้าหมายคาร์บอนเป็น Scope 2 ของกลุ่มมิเตอร์ หรือ whole-organization Net Zero
- งบ เกณฑ์ความเสี่ยง และระยะเวลาที่ใช้ตัดสินใจคืออะไร

คำตอบที่ยังไม่ทราบไม่ถูกเติมเป็นข้อเท็จจริงใน proposal
