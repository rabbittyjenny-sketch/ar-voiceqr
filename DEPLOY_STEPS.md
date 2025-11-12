# 🚀 ขั้นตอน Deploy AR VoiceQR ไป GitHub Pages

## 📋 ที่เตรียมไว้แล้ว
✅ Git repository initialized  
✅ ไฟล์ทั้งหมด committed แล้ว  
✅ พร้อม push ขึ้น GitHub  

---

## 🌟 ขั้นตอนต่อไป (ทำบนเว็บ GitHub)

### 1. สร้าง GitHub Repository
1. เข้า [github.com](https://github.com)
2. คลิก **"New repository"** (ปุ่มสีเขียว)
3. ตั้งชื่อ repository เช่น: **`ar-voiceqr`** 
4. เลือก **Public** (เพื่อใช้ GitHub Pages ฟรี)
5. **อย่าติก** "Initialize with README" (เรามี README แล้ว)
6. คลิก **"Create repository"**

### 2. Connect กับ Repository ที่สร้าง
คัดลอกคำสั่งจากหน้า GitHub ที่เพิ่งสร้าง:

```bash
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
git push -u origin main
```

**แทน USERNAME และ REPOSITORY-NAME ด้วยของจริง**

---

## 📱 ขั้นตอนการรัน Command

### ใน Terminal นี้ รันคำสั่งตามลำดับ:

```bash
# 1. เปลี่ยน branch เป็น main
git branch -M main

# 2. เชื่อมต่อกับ GitHub (แทน URL ด้วยของจริง)
git remote add origin https://github.com/your-username/your-repo-name.git

# 3. Push ขึ้น GitHub
git push -u origin main
```

---

## 🌐 เปิด GitHub Pages

หลังจาก push เสร็จ:

1. ไปที่ repository บน GitHub
2. คลิก **Settings** (แท็บด้านบน)
3. เลื่อนลงไปหา **Pages** (เมนูซ้าย)
4. ที่ **Source** เลือก **"Deploy from a branch"**
5. เลือก **Branch: main**
6. เลือก **Folder: / (root)**  
7. คลิก **Save**
8. รอ 2-5 นาที → GitHub จะให้ URL เป็น:
   ```
   https://your-username.github.io/your-repo-name
   ```

---

## ✅ หลังได้ URL แล้ว

### 📱 สร้าง QR Code ใหม่สำหรับราศีตุลย์:
```
https://your-username.github.io/your-repo-name/index.html?sign=libra
```

### 🔗 ลิงก์สำคัญ:
- **หน้าเลือกราศี**: `/select-zodiac.html`
- **วิธีใช้งาน**: `/how-to-use.html`  
- **ราศีตุลย์**: `/index.html?sign=libra`

---

## 🎯 เสร็จแล้วจะได้:

✅ **เว็บไซต์จริงที่เข้าถึงได้จากทุกที่**  
✅ **QR Code ที่ใช้งานได้จริง**  
✅ **ระบบ AR VoiceQR พร้อมใช้งาน**  
✅ **Update ข้อมูลผ่าน Google Sheets อัตโนมัติ**

---

## 🚀 พร้อมรันคำสั่งไหมคะ?

บอกเมื่อสร้าง GitHub repository เสร็จแล้ว จะช่วยรันคำสั่งให้เลย! 🌟