# ตัวอย่างข้อมูลสำหรับ Google Sheets

## โครงสร้างตาราง
ตารางใน Google Sheets ควรมีคอลัมน์ดังนี้:

| zodiac_sign | zodiac_name | video_url | stone_image | message |
|-------------|-------------|-----------|-------------|----------|
| libra | ราศีตุลย์ | https://example.com/libra-video.mp4 | https://example.com/libra-stone.jpg | คุณเป็นคนที่รักความยุติธรรมและสมดุล |

## รายละเอียดคอลัมน์

### zodiac_sign
- ชื่อราศีเป็นภาษาอังกฤษ (lowercase)
- ใช้สำหรับ matching กับ URL parameter
- ตัวอย่าง: aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces

### zodiac_name  
- ชื่อราศีเป็นภาษาไทย
- จะแสดงเป็น title บนหน้าเว็บ
- ตัวอย่าง: ราศีเมษ, ราศีพฤษภ, ราศีเมถุน, ราศีกรกฎ, ราศีสิงห์, ราศีกันย์, ราศีตุลย์, ราศีพิจิก, ราศีธนู, ราศีมกร, ราศีกุมภ์, ราศีมีน

### video_url
- URL ของไฟล์วีดีโอที่จะแสดงเป็น hologram
- รองรับไฟล์ .mp4, .webm, .ogg
- ควรเป็น URL ที่เข้าถึงได้สาธารณะ
- ตัวอย่าง: https://drive.google.com/uc?id=YOUR_FILE_ID

### stone_image
- URL ของรูปภาพหินประจำราศี
- รองรับไฟล์ .jpg, .png, .gif
- จะแสดงที่ด้านล่างของหน้าจอ
- ตัวอย่าง: https://drive.google.com/uc?id=YOUR_IMAGE_ID

### message
- ข้อความคำทำนาย/คำอธิบายสำหรับราศีนั้นๆ
- จะแสดงที่ด้านล่างของหน้าจอ
- ตัวอย่าง: "คุณเป็นคนที่รักความยุติธรรมและสมดุล มักจะเป็นคนที่คิดมากและชั่งใจนาน"

## Google Apps Script Code ตัวอย่าง

```javascript
function doGet(e) {
  try {
    const sign = e.parameter.sign;
    if (!sign) {
      return ContentService
        .createTextOutput(JSON.stringify({error: "กรุณาระบุราศี"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // หา index ของคอลัมน์ต่างๆ
    const signIndex = headers.indexOf('zodiac_sign');
    const nameIndex = headers.indexOf('zodiac_name');
    const videoIndex = headers.indexOf('video_url');
    const imageIndex = headers.indexOf('stone_image');
    const messageIndex = headers.indexOf('message');
    
    // ค้นหาข้อมูลราศีที่ต้องการ
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[signIndex] === sign.toLowerCase()) {
        const result = {
          zodiac_name: row[nameIndex] || '',
          video_url: row[videoIndex] || '',
          stone_image: row[imageIndex] || '',
          message: row[messageIndex] || ''
        };
        
        return ContentService
          .createTextOutput(JSON.stringify(result))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // ไม่พบข้อมูล
    return ContentService
      .createTextOutput(JSON.stringify({error: `ไม่พบข้อมูลราศี ${sign}`}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## การตั้งค่า Google Apps Script

1. เปิด Google Sheets ที่มีข้อมูลราศี
2. เข้าไปที่ Extensions > Apps Script
3. ลบโค้ดเดิมและใส่โค้ดด้านบน
4. บันทึกและตั้งชื่อโปรเจค
5. Deploy > New Deployment
6. เลือก Type: Web app
7. Execute as: Me
8. Who has access: Anyone
9. คัดลอก Web App URL มาใส่ในไฟล์ app.js

## วิธีทดสอบ

1. เปิด URL ของ Web App ใน browser
2. เพิ่ม ?sign=libra ท้าย URL
3. ควรจะเห็นข้อมูล JSON ส่งกลับมา

ตัวอย่าง:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?sign=libra
```