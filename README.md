# AR VoiceQR - Zodiac Hologram Web Application

A web-based AR application that displays zodiac holograms, stone images, and messages based on URL parameters. The application integrates with Google Apps Script to retrieve zodiac data dynamically.

## Features

- **📱 QR Code Integration**: ใช้กล้องมือถือสแกน QR Code ไม่ต้องลงแอป
- **🌐 WebAR Technology**: ทำงานผ่านเว็บเบราว์เซอร์ทั่วไป (Chrome, Safari, Edge)
- **🎬 Hologram Effects**: วีดีโอลอยพร้อมเอฟเฟค drop-shadow และ animation
- **💎 Floating Elements**: หินประจำราศีและข้อความลอยได้
- **📊 Dynamic Data**: ดึงข้อมูลจาก Google Sheets แบบ Real-time
- **📱 Mobile-First**: ออกแบบสำหรับมือถือเป็นหลัก
- **🎯 User-Friendly**: ไม่ต้องติดตั้งแอป AR พิเศษ

## File Structure

```
Ar_VoiceQr/
├── index.html              # Original single-file version with inline CSS/JS
├── index-modular.html      # Modular version using separate CSS/JS files
├── select-zodiac.html      # Zodiac selection page with status indicators
├── how-to-use.html         # QR Code usage instructions and guide
├── styles.css              # Enhanced stylesheet with AR hologram effects
├── app.js                  # JavaScript module with app logic
├── README.md               # Project documentation
├── google-sheets-setup.md  # Google Sheets และ Apps Script setup guide
└── .github/
    └── copilot-instructions.md  # GitHub Copilot workspace instructions
```

## Usage

### 📱 QR Code Scanner (แนะนำ)
1. **เปิดกล้องมือถือ** - iPhone Camera หรือ Android Camera App
2. **ส่องไปที่ QR Code** - ระยะ 15-30 ซม.
3. **แตะลิงก์ที่ขึ้น** - เว็บเบราว์เซอร์จะเปิดเอง
4. **ดู AR Hologram** - วีดีโอลอย + หินประจำราศี + ข้อความ ✨

### 🖥 Web Interface
1. เปิด `select-zodiac.html` เพื่อดูรายการราศีทั้งหมด
2. ราศีที่มีข้อมูลแล้วจะแสดงเป็นสีเขียว (ปัจจุบันมีเฉพาะ **ราศีตุลย์**)
3. ราศีที่ยังไม่มีข้อมูลจะแสดงเป็นสีแดง
4. คลิกที่ราศีสีเขียวเพื่อดู AR Hologram

### 🔗 Direct URL Access
```
index.html?sign=libra
```

### Available Zodiac Signs
**ปัจจุบันพร้อมใช้งาน:**
- ✅ libra (ราศีตุลย์)

**ยังไม่พร้อมใช้งาน (ต้องเพิ่มข้อมูลใน Google Sheets):**
- ❌ aries, taurus, gemini, cancer, leo, virgo
- ❌ scorpio, sagittarius, capricorn, aquarius, pisces

### Example URLs
```
index.html?sign=leo
index.html?sign=scorpio
index.html?sign=aquarius
```

## Google Apps Script Integration

The application connects to a Google Apps Script web app to retrieve zodiac data. The script should return JSON data with the following structure:

```json
{
  "video_url": "https://example.com/zodiac-video.mp4",
  "stone_image": "https://example.com/stone-image.jpg", 
  "message": "Your personalized zodiac message"
}
```

### Current Web App URL
```
https://script.google.com/macros/s/AKfycby0QXZTg88hkRDAtIkBTu-fvfdh4B2ijlnNfLg3AMN8DQzBn2iB3Duy_sTxR16ldjFs/exec
```

## Development

### Running Locally
1. Install the Live Server VS Code extension (already included)
2. Right-click on `index.html` or `index-modular.html`
3. Select "Open with Live Server"
4. The application will open in your default browser

### File Versions
- **index.html**: Single-file version with all CSS and JavaScript inline
- **index-modular.html**: Modular version that references external CSS and JS files
- Choose the version that best fits your deployment needs

### Styling
The application uses a dark theme with cyan accents to create an AR-like atmosphere:
- Black background for immersive experience
- Cyan glowing effects for holographic appearance
- Centered video with rounded borders and shadow effects
- Responsive layout that adapts to different screen sizes

### Error Handling
The application includes comprehensive error handling for:
- Missing zodiac sign in URL
- Failed API requests to Google Apps Script
- Missing or invalid data responses
- Network connectivity issues

## Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Styling, animations, and responsive design
- **Vanilla JavaScript**: Application logic and API integration
- **Google Apps Script**: Backend data source
- **Fetch API**: HTTP requests for data retrieval

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Common Issues

1. **"ไม่พบราศีใน URL" Error**
   - Ensure the URL includes `?sign=zodiac_name`
   - Check that the zodiac name is spelled correctly

2. **"ไม่สามารถดึงข้อมูลจาก Web App ได้" Error**
   - Verify internet connection
   - Check if the Google Apps Script web app is accessible
   - Ensure CORS is properly configured in the web app

3. **Videos Not Playing**
   - Check video URL validity
   - Ensure video format is supported by the browser
   - Verify the video file is accessible

## Contributing

When contributing to this project:
1. Maintain the AR holographic visual style
2. Ensure cross-browser compatibility
3. Follow the existing code structure and commenting style
4. Test with multiple zodiac signs
5. Update documentation for any new features

## License

This project is for educational and demonstration purposes.