// AR VoiceQR Zodiac Hologram JavaScript Module

class ZodiacARApp {
  constructor() {
    this.sheetWebAppUrl = "https://script.google.com/macros/s/AKfycby0QXZTg88hkRDAtIkBTu-fvfdh4B2ijlnNfLg3AMN8DQzBn2iB3Duy_sTxR16ldjFs/exec";
    this.container = null;
  }

  async init() {
    try {
      this.container = document.getElementById('ar-container');
      const zodiacSign = this.getZodiacSignFromURL();
      const zodiacData = await this.fetchZodiacData(zodiacSign);
      this.renderARContent(zodiacData);
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      this.showError(error.message);
    }
  }

  getZodiacSignFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const zodiacSign = urlParams.get('sign');
    if (!zodiacSign) {
      throw new Error("ไม่พบราศีใน URL");
    }
    return zodiacSign;
  }

  async fetchZodiacData(zodiacSign) {
    try {
      const response = await fetch(`${this.sheetWebAppUrl}?sign=${zodiacSign}`);
      if (!response.ok) {
        throw new Error(`ไม่สามารถดึงข้อมูลได้ (สถานะ: ${response.status})`);
      }

      const data = await response.json();
      
      // ตรวจสอบว่ามี error ใน response หรือไม่
      if (data.error) {
        throw new Error(data.error);
      }
      
      // ตรวจสอบข้อมูลจำเป็น
      if (!data || Object.keys(data).length === 0) {
        throw new Error(`ยังไม่มีข้อมูลสำหรับราศี "${zodiacSign}" กรุณาติดต่อผู้ดูแลระบบ`);
      }

      // ตรวจสอบว่ามีข้อมูลสำคัญหรือไม่
      if (!data.video_url && !data.stone_image && !data.message) {
        throw new Error(`ข้อมูลสำหรับราศี "${zodiacSign}" ไม่สมบูรณ์`);
      }
      
      return data;
    } catch (networkError) {
      if (networkError.name === 'TypeError') {
        throw new Error("ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้ กรุณาตรวจสอบการเชื่อมต่อ");
      }
      throw networkError;
    }
  }

  renderARContent(data) {
    // Clear container
    this.container.innerHTML = '';

    // Add zodiac title if available
    if (data.zodiac_name || data.name) {
      this.addTitleElement(data.zodiac_name || data.name);
    }

    // Add video hologram
    if (data.video_url) {
      this.addVideoElement(data.video_url);
    }

    // Add stone image overlay
    if (data.stone_image) {
      this.addImageElement(data.stone_image);
    }

    // Add message
    if (data.message) {
      this.addMessageElement(data.message);
    }

    // Add QR code if available
    if (data.qr_url) {
      this.addQRElement(data.qr_url);
    }

    // Add back to selection button
    this.addBackButton();

    // Add debug info (can be removed in production)
    console.log("🌟 AR VoiceQR Data:", data);
  }

  addTitleElement(title) {
    const titleEl = document.createElement('h1');
    titleEl.textContent = title;
    titleEl.style.cssText = `
      position: absolute;
      top: 20px;
      width: 100%;
      text-align: center;
      font-size: 2em;
      color: cyan;
      text-shadow: 0 0 20px #0ff;
      margin: 0;
      z-index: 10;
    `;
    this.container.appendChild(titleEl);
  }

  addVideoElement(videoUrl) {
    const videoEl = document.createElement('video');
    videoEl.src = videoUrl;
    videoEl.autoplay = true;
    videoEl.loop = true;
    videoEl.muted = false;
    videoEl.controls = true;
    
    // ตรวจสอบว่าเป็นวีดีโอ green screen หรือไม่
    if (this.isGreenScreenVideo(videoUrl)) {
      videoEl.classList.add('green-screen');
      console.log('🎬 Green Screen Video detected - applying special effects');
    }
    
    // เพิ่ม event listener เพื่อปรับปรุง effect เมื่อวีดีโอโหลดเสร็จ
    videoEl.addEventListener('loadeddata', () => {
      this.enhanceVideoEffects(videoEl);
    });
    
    this.container.appendChild(videoEl);
  }

  isGreenScreenVideo(videoUrl) {
    // ตรวจสอบจากชื่อไฟล์หรือ pattern ที่บ่งบอกว่าเป็น green screen
    const greenScreenIndicators = ['green', 'greenscreen', 'chroma', 'libra', 'zodiac'];
    const lowerUrl = videoUrl.toLowerCase();
    return greenScreenIndicators.some(indicator => lowerUrl.includes(indicator));
  }

  enhanceVideoEffects(videoElement) {
    // เพิ่มเอฟเฟค hologram แบบ dynamic
    let intensity = 1;
    let direction = 1;
    
    setInterval(() => {
      intensity += direction * 0.05;
      if (intensity > 1.5) direction = -1;
      if (intensity < 0.8) direction = 1;
      
      const glowIntensity = intensity * 20;
      videoElement.style.filter = `
        drop-shadow(0 0 ${glowIntensity}px cyan) 
        contrast(${intensity}) 
        brightness(${intensity * 0.9}) 
        hue-rotate(${intensity * 180}deg)
      `;
    }, 100);
  }

  addImageElement(imageUrl) {
    const imgEl = document.createElement('img');
    imgEl.src = imageUrl;
    imgEl.alt = "Zodiac Stone";
    this.container.appendChild(imgEl);
  }

  addMessageElement(message) {
    const msgEl = document.createElement('p');
    msgEl.textContent = message;
    this.container.appendChild(msgEl);
  }

  showError(message) {
    if (this.container) {
      this.container.innerHTML = `
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          padding: 30px;
          background: rgba(255, 0, 0, 0.1);
          border: 2px solid #ff6b6b;
          border-radius: 15px;
          max-width: 80%;
        ">
          <h2 style="color: #ff6b6b; margin-bottom: 20px;">⚠️ เกิดข้อผิดพลาด</h2>
          <p class="error" style="margin-bottom: 20px;">${message}</p>
          <button onclick="window.location.href='select-zodiac.html'" style="
            background: rgba(0, 255, 255, 0.2);
            border: 2px solid cyan;
            color: cyan;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
          ">🔙 กลับไปเลือกราศี</button>
        </div>
      `;
    }
  }

  addBackButton() {
    const backBtn = document.createElement('button');
    backBtn.textContent = '🔙 เลือกราศีอื่น';
    backBtn.onclick = () => window.location.href = 'select-zodiac.html';
    backBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(0, 255, 255, 0.2);
      border: 2px solid cyan;
      color: cyan;
      padding: 10px 15px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 14px;
      z-index: 20;
    `;
    this.container.appendChild(backBtn);
  }

  addQRElement(qrUrl) {
    const qrContainer = document.createElement('div');
    qrContainer.style.cssText = `
      position: absolute;
      top: 20px;
      left: 20px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(0, 255, 255, 0.5);
      border-radius: 10px;
      padding: 10px;
      backdrop-filter: blur(10px);
      z-index: 15;
    `;

    const qrImg = document.createElement('img');
    qrImg.src = qrUrl;
    qrImg.alt = 'QR Code';
    qrImg.style.cssText = `
      width: 80px;
      height: 80px;
      border-radius: 5px;
      display: block;
    `;

    const qrLabel = document.createElement('p');
    qrLabel.textContent = 'QR Code';
    qrLabel.style.cssText = `
      margin: 5px 0 0 0;
      font-size: 12px;
      text-align: center;
      color: cyan;
    `;

    qrContainer.appendChild(qrImg);
    qrContainer.appendChild(qrLabel);
    this.container.appendChild(qrContainer);
  }
}

// Initialize the app when DOM is loaded
window.onload = () => {
  const app = new ZodiacARApp();
  app.init();
};