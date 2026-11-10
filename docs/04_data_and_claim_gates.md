# บัญชีข้อมูลและระดับการกล่าวอ้าง

## ข้อมูลที่ต้องขอ

| ชุดข้อมูล | รายละเอียด | ใช้ตัดสิน | สถานะในร่างนี้ |
|---|---|---|---|
| ทะเบียน 19 อาคาร | ชื่อ/ประเภท/พื้นที่/ตารางใช้งาน/เจ้าของข้อมูล | coverage และ grouping | ยังไม่ยืนยัน |
| Meter map | billing meters, submeters, connection groups, single-line diagram | aggregation และ sharing feasibility | ยังไม่ยืนยัน |
| บิล | actual periods, tariff components, import/export/demand | baseline bill reconciliation | ยังไม่ได้ใช้ข้อมูลจริง |
| Interval load | native resolution, timezone, meter multiplier, quality | timing, peak, dispatch | ยังไม่ได้ใช้ข้อมูลจริง |
| Existing assets | PV/BESS/EV/HVAC และ commissioning/operation records | baseline ไม่คิดผลเพิ่มซ้ำ | ยังไม่ยืนยัน |
| PV/roof | geometry/shading/structural limit/inverter/profiles | feasible kWp/kW AC | ยังไม่ยืนยัน |
| BESS | AC power, usable/nameplate kWh, efficiency, SoH/warranty, auxiliaries | sizing/degradation/lifecycle | ยังไม่มี parameter ที่รับรอง |
| EV service | observed sessions หรือ survey evidence, arrival/departure, energy, port occupancy/assignment, station power, reassignment rules, fees, outages | service demand และ business case | ยังไม่ยืนยัน |
| Flexible load | owner permission, schedule, comfort/deadline, rebound, control limits | feasible dispatch | ยังไม่ยืนยัน |
| Network | transformer/line/import/export limits, approved interconnection | feasible sets | ยังไม่ยืนยัน |
| Costs | dated quotes, included installation/tax/network/fees/replacement | comparable cash flow | ยังไม่ยืนยัน |
| Rights/contracts | export/interconnection/compensation/attributes/EV operator | eligible revenues/claims | ยังไม่ยืนยัน |
| Carbon | boundary, grid factor year, attributes ownership/retirement | Scope 2/other claims | ยังไม่ยืนยัน |

## ข้อกำหนดคุณภาพร่วม

เก็บ dataset owner, permission reference, source path/hash, source_type, version, units, timezone, sampling/interval semantics, missing mask, transformation history และ publication restrictions ช่องว่างเป็น unknown/null ไม่ใช่ 0 แยกข้อมูลวัดจริงและ synthetic โดย dataset ID ไม่ใช้เพียงสีในกราฟ

คง raw originals แบบ read-only และสร้าง derived version ตรวจค่าซ้ำ ช่วงเวลาขาด การ reset cumulative meter หน่วย/เครื่องหมาย และการแปลง AC/DC ห้ามดึงข้อมูลส่วนบุคคล EV เช่นทะเบียนรถหรือชื่อผู้ใช้ถ้าไม่จำเป็น ใช้ pseudonymous session ID และ aggregate เท่าที่พอตอบคำถาม

## Readiness levels

| ระดับ | มีข้อมูล | สรุปได้ | ยังสรุปไม่ได้ |
|---|---|---|---|
| D0 | synthetic fixtures | วิธีทำงานและ correctness ของซอฟต์แวร์ | ผลประโยชน์จริงของ มข. |
| D1 | bills/inventory บางส่วน | screening, seasonality, data gaps | validated BESS/EV scheduling/demand savings |
| D2 | authorized interval data + topology/rules | conditional simulation | generalized measured savings ทั้ง 19 อาคาร |
| D3 | baseline reconciled + parameters/service evidence + holdout | qualified case-specific recommendation | post-installation measured savings หากยังไม่ติดตั้ง/วัด |

readiness แยกเป็น energy, billing-demand, service, finance, carbon และ publication ไม่ใช้ status เดียวแทนทุกข้อ

## Claim gates

- **Energy gate:** balanced units/time boundaries, plausible load/PV, SOC/losses ไม่ผ่านห้ามแสดง design ranking ว่า feasible
- **Billing gate:** actual tariff และ supported billing resolution/coverage ไม่ผ่านให้แสดง energy-only ไม่อ้าง bill savings ทั้งบิล
- **EV gate:** same service baseline, attainable utilization/fees, departure constraints, port occupancy และ aggregate station power ไม่ผ่านห้ามอ้างรายได้ที่คาดว่าจะเกิดจริง
- **Flex gate:** allowed control, completion/comfort/rebound ไม่ผ่านแสดง hypothetical potential เท่านั้น
- **Export gate:** interconnection/export permission และ compensation eligibility แยกกัน ไม่ผ่านให้ zero-export base
- **Carbon gate:** boundary/factor/attribute evidence ไม่ผ่านห้ามใช้ Net Zero achieved หรือ renewable claim
- **Decision gate:** held-out performance และ uncertainty ตาม protocol ไม่ผ่านให้ screening ไม่เรียก validated investment advice
- **Publication gate:** owner consent/conditions สำหรับเผยแพร่ต้องตรวจแยกจากสิทธิ์อ่านและวิจัย

## สิ่งที่ต้องพร้อมสำหรับเริ่มงานช่วงแรก

1. ผู้รับผิดชอบที่ยืนยันรายชื่ออาคารและผังมิเตอร์
2. มิเตอร์ตัวแทนหนึ่งจุดที่เข้าถึงบิลและ interval load ได้ตามสิทธิ์
3. ข้อมูลระบบเดิมและ PV potential เบื้องต้น
4. EV sessions หรือแผนสำรวจความต้องการที่ได้รับอนุญาต
5. Flexible load หนึ่งประเภทที่เจ้าของยืนยันขอบเขตบริการ
6. ข้อตกลงกับอาจารย์เรื่องคำถามหลักและรูปแบบการอ้าง Net Zero

หากข้อ 4–5 ยังไม่พร้อม สามารถทำ PV/BESS plus hypothetical scenarios เพื่อทดสอบวิธีได้ แต่ต้องรักษาป้ายและไม่กล่าวว่าเป็นธุรกิจ EV หรือ flexible-load case ที่ตรวจแล้ว
