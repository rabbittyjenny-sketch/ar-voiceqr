// Simple Mock Server for Testing AR VoiceQR
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Mock data for zodiac signs
const mockData = {
  libra: {
    zodiac_name: "ราศีตุลย์",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    stone_image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop&crop=center",
    message: "คุณเป็นคนที่รักความยุติธรรมและสมดุล มักจะเป็นคนที่คิดมากและชั่งใจนาน แต่เมื่อตัดสินใจแล้วจะทำอย่างมั่นใจ",
    qr_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/index.html?sign=libra"
  },
  aries: {
    zodiac_name: "ราศีเมษ",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    stone_image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center",
    message: "คุณเป็นคนกล้าหาญและมีความมุ่งมั่นสูง ชอบเป็นผู้นำและไม่กลัวความท้าทาย",
    qr_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/index.html?sign=aries"
  }
};

// Mock API endpoint
app.get('/exec', (req, res) => {
  const sign = req.query.sign;
  
  if (!sign) {
    return res.json({ error: "กรุณาระบุราศี" });
  }
  
  const data = mockData[sign.toLowerCase()];
  
  if (!data) {
    return res.json({ error: `ไม่พบข้อมูลราศี ${sign}` });
  }
  
  // Simulate API delay
  setTimeout(() => {
    res.json(data);
  }, 500);
});

app.listen(port, () => {
  console.log(`🌟 Mock AR VoiceQR API running at http://localhost:${port}`);
  console.log('📝 Available endpoints:');
  console.log(`   GET /exec?sign=libra`);
  console.log(`   GET /exec?sign=aries`);
});