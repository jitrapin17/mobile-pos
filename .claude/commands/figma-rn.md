# Figma → React Native

> **Auto-trigger**: เมื่อ task มี `figma.com` URL ให้ execute command นี้ทันทีโดยไม่ต้องรอให้ user สั่ง

ก่อนลงมือทุกครั้ง ต้องดึง Figma context ของ node/frame เป้าหมายก่อนเสมอ ห้ามเดาหรือแต่งค่าเอง

---

## หลักการ

- **Figma คือ source of truth** สำหรับ colors, text styles, components, SVG icons ทั้งหมด
- ถ้า Figma data หายหรือ React Native รองรับไม่ได้ → แจ้ง user และบันทึก fallback ไว้

---

## ขั้นตอน

### 1. ดึง Figma Context
```
mcp__figma__get_design_context(fileKey, nodeId)
```
ต้องทำก่อนทุกครั้ง — ไม่ข้าม

### 2. Theme ก่อน Component
- Map Figma variables/color styles → `src/theme/colors.ts`
- Map Figma text styles → `src/theme/typography.ts`
- ห้ามใส่ hardcode ค่าใน component โดยตรง

### 3. Font
- ใช้ font family ตรงตาม Figma — weight, size, lineHeight, letterSpacing ทุกค่า
- ถ้า Figma ใช้ font ที่ยังไม่ได้ bundle → โหลดผ่าน `expo-font` ก่อน render

### 4. Component Structure
- ใช้โครงสร้าง Figma เป็นตัวตัดสินว่า component ไหนควร reuse
- Layer ชื่อ `Frame ...` ที่ไม่ได้ repeat → ไม่ต้องแยกเป็น component

### 5. Icons
- ดึง SVG path/gradient จาก Figma โดยตรง
- Render ด้วย `react-native-svg` (`<Svg>`, `<Path>`, `<LinearGradient>` ฯลฯ)
- ห้ามใช้ PNG/JPG หรือ vector icon library แทน เว้นแต่ Figma source หาย → แจ้ง user

### 6. Image Assets
- URL จาก `figma.com/api/mcp/asset/...` หมดอายุใน 7 วัน — ห้ามใช้ URL ตรงในโค้ด
- ให้ `curl` download มาเก็บใน `assets/` ก่อนเสมอ แล้วใช้ `require()` แทน
- SVG asset → download แล้วอ่าน `<path>` data ออกมา render ผ่าน `react-native-svg`
- PNG/JPG asset → download เก็บใน `assets/` แล้วใช้ `<Image source={require(...)} />`

---

## Asset Lookup Order (Icons/Images)

1. ดึง SVG จาก Figma node โดยตรง
2. ถ้าไม่มี → ใช้ asset URL จาก `get_design_context` → download → ตรวจ non-transparent pixel ด้วย Python/PIL
3. ถ้า PNG transparent (non-transparent = 0) → ใช้ `get_screenshot(nodeId, contentsOnly: true)` แทน เพราะ external sticker/image บาง node Figma ไม่มี pixel data จริง ต้อง render จาก canvas
4. ถ้าไม่มีทั้งหมด → **หยุด** แจ้ง user ทันทีว่า "ไม่พบ asset จาก Figma — ต้องการ node URL เพิ่มเติมหรือให้ใช้ fallback ไหน" ห้าม generate หรือ invent asset เองเด็ดขาด
