# แผนการทดลองและตัวชี้วัด

ทุกแถวต่อไปนี้เป็น protocol ที่เสนอ ยังไม่ได้รัน simulation และไม่มีผลทดลอง มข.

## 1 กำหนดการเปรียบเทียบก่อนสร้างตัวเลข

แยกชั้นบริการ N0 ไม่มีบริการ EV และ N1 มี EV service demand เดียวกัน ใน N1 ต้องมี grid-only charging comparator พร้อม charger CAPEX/OPEX ที่สอดคล้องกัน กรณีเพิ่มเครื่องชาร์จ/รับ session มากขึ้นเป็น business expansion comparison ต่างหาก โดยรายงานบริการเพิ่มและความไม่แน่นอน demand ไม่อ้างว่าเป็นผลของ energy efficiency

ทุก comparison ใช้ boundary, data version, tariff, capital constraints, carbon cap, service constraints, financial horizon และ information set เดียวกัน เว้นแต่ปัจจัยนั้นเป็น treatment ที่ประกาศไว้

## 2 Technology configurations

| ID | ชุดที่เสนอ | สิ่งที่ตอบ |
|---|---|---|
| C0 | ระบบเดิม ไม่ลงทุนเพิ่ม | baseline ที่รวม assets เดิมจริง |
| C1 | efficiency/flexible load ที่อนุญาต | คุณค่าฝั่งความต้องการก่อนเพิ่มการผลิต |
| C2 | PV | มูลค่าฐาน solar โดยไม่พึ่ง BESS |
| C3 | PV+BESS | คุณค่า storage หลังคิด loss/degradation |
| C4 | PV+EV smart charging | คุณค่าความยืดหยุ่นจากเวลาชาร์จ |
| C5 | PV+BESS+EV | การเสริมหรือทดแทนกันของ storage กับ EV timing |
| C6 | integrated PV/BESS/EV/flex | มูลค่าเพิ่มของการประสานทั้งหมดที่เป็นไปได้ |

C0–C3 ใน N1 ต้องคง EV demand และเครื่องชาร์จที่จำเป็นเป็นบริการฐาน เปลี่ยนเพียง smart control/assets ที่กำลังทดสอบ ทุกชุดเลือกขนาดศูนย์ได้ถ้าเป็นทางเลือก feasible เช่น C6 ไม่จำเป็นต้องติดตั้ง BESS

## 3 Operating and planning comparators

| ID | วิธี | ข้อจำกัดการกล่าวอ้าง |
|---|---|---|
| D0 | กติกาแยกส่วนที่ตรวจสอบได้ | practical baseline ไม่ใช้แยก coordination จาก optimizer quality โดยลำพัง |
| Dsep | decoupled optimization ภายใต้ resource allocations ที่ล็อกไว้ | ใช้ solver class/horizon/forecast/objective/service constraints/stop criteria เท่า D1 และ global reconciliation ที่ประกาศก่อน test |
| D1 | joint coordinated optimization ภายใต้ข้อมูลที่มีจริง | ต่างจาก Dsep ที่อนุญาต coordinated resource allocation ต้องรวม service/degradation และไม่รู้อนาคตจริง |
| Psep | separate/sequential deterministic planning | ประกาศลำดับการเลือกและ shared-budget/network reconciliation ก่อน test ไม่มีประโยชน์ซ้ำ |
| P0 | joint point-estimate planning | เทียบ Psep ใน feasible universe/data/budget/service/carbon และ computational criteria ที่เทียบได้ |
| P1 | joint scenario/risk-aware planning | เทียบ P0 เพื่อแยก uncertainty treatment ประกาศ weights/robust criterion ก่อน test |
| O1 | perfect-foresight หรือ hindsight reference | optimistic bound แยกจาก implementable performance |

Test A เปรียบเทียบ Dsep/D1 ที่ design เดียวกันเพื่อ attribution โดย D0 เป็นฐานเชิงปฏิบัติ Test B1 เปรียบเทียบ Psep/P0 เพื่อ integrated planning value และ Test B2 เปรียบเทียบ P0/P1 เพื่อ uncertainty treatment ใช้ evaluator ที่เท่าเทียมกันทุกครั้ง Test C ablation ตัดองค์ประกอบทีละตัว แยก fixed-design marginal operation value กับ reoptimized investment value

หากใช้ computational budgets หรือ solver optimality gaps ต่างกัน ต้องรายงานและทำ sensitivity ก่อนอ้างเป็น methodological gain ไม่ออกแบบ allocation ฝั่งแยกส่วนให้เสียเปรียบเกินเหตุ ใช้กติกาที่สมเหตุผลและทดสอบความไวต่อกติกานั้น ทุก baseline ต้องผ่าน service และ global physical feasibility; infeasible baseline ไม่ถูกนำมาหักเป็น savings

## ข้อจำกัดบริการชาร์จร่วมทุกวิธี

บังคับ occupied sessions ≤ available ports, station aggregate power และ upstream capacity พร้อม session–port assignment และ arrival/departure window แยกการเสียบครองช่องจากช่วงจ่ายกำลัง รถที่ได้พลังงานครบแต่ยังไม่ย้ายอาจยังใช้ port อยู่ ไม่สมมติ automatic reassignment หรือ vehicle swapping โดยไม่มีหลักฐาน หากใช้ aggregate demand ให้ตรึง charger counts/capacity และไม่สรุป queue หรือจำนวนเครื่องที่เหมาะสมจนมี session/occupancy data

## 4 Rights scenarios

| ID | การส่งออก | การให้ความหมาย |
|---|---|---|
| X0 | ไม่อนุญาต ส่งออกเป็นศูนย์ | default จนกว่าจะมีเอกสาร |
| X1 | อนุญาตทางเทคนิค/กฎหมาย แต่ไม่มีค่าตอบแทน | ตรวจว่าการเดินระบบไม่มีรายรับ export |
| X2 | อนุญาตพร้อมเงื่อนไขรับซื้อที่ยืนยัน | ใช้ rate, capacity, hours, eligibility และช่วงสัญญาจริง |
| X3 | สมมติกติกาในอนาคต | exploratory เท่านั้น ไม่ใช้แนะนำธุรกิจตามสิทธิ์ปัจจุบัน |

หาก X1 ไม่ใช่สิทธิ์ที่มีจริงให้เป็น hypothetical เช่นเดียวกับ X3 ห้ามใช้ชื่อสถานการณ์เป็นหลักฐานสิทธิ์ การส่งออกพลังงานที่ชาร์จมาจากกริดอาจมีเงื่อนไขต่างจาก PV ต้องตรวจแยกก่อนอนุญาตใน model

## 5 Uncertainty design

- Energy: load, PV/weather, seasonality และ forecast residual โดยเก็บความสัมพันธ์ตามเวลา
- Service: EV session count, arrival/departure, requested energy, charger outages และ flexibility availability
- Finance: installed costs, O&M, replacement, discount rate, tariff, charging fee, transaction fees และ utilization
- Asset: BESS efficiency/degradation, PV degradation, derating และ connection capacity
- Carbon/policy: grid-factor pathway, retained attributes และ eligible export regime

ใช้ low/base/high แบบระบุแหล่งหรือเหตุผลเป็น screening ไม่เรียกเป็น P10/P50/P90 ถ้าไม่มี distribution เมื่อมีหลักฐานพอจึงใช้ joint resampling/scenario generation พร้อม seeds และบันทึก dependencies ไม่สุ่ม extreme ทุกตัวเป็นอิสระแล้วเรียกว่า realistic future

เริ่ม sensitivity สำคัญไม่เกิน 4–6 ตัวเพื่อจัดลำดับ จากนั้นเลือก targeted scenarios ตาม protocol ก่อน test จำนวนนี้เป็นแนวจำกัด scope ไม่ใช่จำนวนที่บังคับเพื่อให้ได้ผล

## 6 Cost and carbon scenarios

ใช้ LCC minimization ภายใต้ cap เทียบ same-service baseline ในปี/ช่วงเดียวกัน ทำ carbon caps เป็นคนละแกนจาก budget และ export rights เลือกชุดที่ computationally feasible ก่อนเริ่ม ไม่จำเป็นต้อง full factorial ทุกมิติ

หากระบบไม่มีคำตอบภายใต้ cap ให้รายงาน infeasible พร้อม bottleneck เช่น roof, service, import emissions หรือ attribute rights ห้ามลดบริการหรือหัก export โดยไม่เปิดเผยเพื่อให้ cap ผ่าน

## 7 Metrics with definitions

| Metric | นิยาม/ข้อควรระวัง |
|---|---|
| Incremental NPV | DCF ส่วนต่างจาก common same-service baseline รวม capex/replacements/residual |
| LCC | ต้นทุนสุทธิตลอดอายุ อาจลดจากรายรับภายนอกที่มีสิทธิ์ ต้องแยก cost กับ gross revenue |
| Downside risk | เช่น probability NPV<0 เมื่อ probabilities มีหลักฐาน หรือ worst-case ใน scenario set ที่ระบุ |
| CVaR | ต้นทุนเฉลี่ยส่วนหางของ distribution ที่ระบุ ต้องกำหนด alpha, sign และ weights |
| Solar self-consumption | PV-origin energy ที่ใช้ภายใน boundary หาร PV AC production โดยระบุการจัดการ battery losses/ending inventory |
| Self-sufficiency | โหลดที่รับพลังงานจากแหล่งภายในที่ระบุหาร total delivered load ไม่รวม grid-origin battery energy เป็น solar |
| EV fulfillment | delivered required energy/departure requirements และจำนวน unmet sessions แยกจากกำไร |
| Peak demand | ตาม averaging window และ bill calendar จริง ไม่ใช่ max ของข้อมูลหยาบ |
| Carbon reduction | same-service baseline minus project ใน accounting boundary/period เดียวกัน |
| Marginal abatement cost | ส่วนต่าง annualized/lifecycle cost หารส่วนต่าง emissions บน horizon เดียวกัน ระวังตัวหารศูนย์/ติดลบ |
| Regret | cost ของ fixed decision ลบ hindsight feasible optimum ใน constraints เดียวกัน เป็น ex-post benchmark |
| Feasibility | energy balance, device limits, connection, SOC, service และสิทธิ์ ผ่านก่อนจัดอันดับกำไร |

## 8 Validation and statistical reporting

1. Arithmetic fixtures สำหรับ conservation, battery loss/SOC, EV departure, flex deadlines และ tariff boundaries
2. Reconcile energy/bill กับ observed periods โดยใช้ thresholds ที่ตกลงก่อน holdout
3. Unit/time tests โดยเฉพาะ kW–kWh, DC–AC, billing date, site timezone, zero/missing และ duplicate intervals
4. Calibration/development/test split ที่กันเวลาและอาคารเมื่อเป็นไปได้ ห้าม random interval split ที่เกิด leakage
5. รายงาน uncertainty ด้วย paired evaluations และ block bootstrap หรือวิธีที่เคารพ temporal dependence หากข้อมูลพอ ไม่ทำ independent t-test กับ 15-minute records ราวกับเป็นอิสระทั้งหมด
6. รายงานทุก primary comparison รวมผลลบ/infeasible พร้อม solver gap/time limits และ exclusions
7. ตรวจว่า energy routes, export revenue, EV revenue, carbon attributes และ bills ไม่ถูกนับซ้ำ

## 9 Run manifest ขั้นต่ำ

run_id, code/version, source hashes, dataset tier, meter map version, input parameters/units, candidate set, tariff version, finance basis, carbon method/year, export evidence, service stratum, scenario seed/weights, split IDs, solver/status/gap, feasibility tests, metrics และสิ่งที่ไม่ผ่าน claim gate

ยังไม่มี run manifest ของผลจริงใน repository นี้ เพราะงานรอบนี้คือร่าง proposal ไม่ใช่ implementation หรือ simulation
