const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve index.html and cat.png
require('dotenv').config();
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


app.post('/send-email', (req, res) => {
  const { topic, description, angryRating, loveRating } = req.body;

 const htmlContent = `
   <div style="max-width: 640px; margin: auto; background: #fdfdfc; border-radius: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.06); padding: 24px; font-family: 'Segoe UI', sans-serif;">

  <!-- Header -->
  <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="color: #6c63ff; margin-bottom: 4px;">🌼 A Message from Your Baby Cat 🌼</h2>
    <p style="color: #777; font-size: 14px;">Gentle words wrapped in tiny paws</p>
  </div>

  <!-- Content Block -->
  <div style="background: #ffffff; border-radius: 12px; padding: 18px; border: 1px solid #e6e6e6;">
    <p style="font-size: 16px; color: #333;"><strong>📌 Topic:</strong> <span style="color: #6c63ff;">${topic}</span></p>
    <p style="margin-top: 8px;"><strong>📝 Description:</strong><br><em>${description}</em></p>

    <!-- Love Meter -->
    <div style="margin-top: 20px;">
      <label style="font-weight: bold; color: #444;">💗 Love Meter</label>
      <div style="background: #edf2f7; border-radius: 12px; height: 14px; overflow: hidden; margin-top: 5px;">
        <div style="width: ${loveRating * 10}%; background: linear-gradient(90deg, #a0c4ff, #cdb4db); height: 100%;"></div>
      </div>
      <div style="text-align: right; font-size: 12px; color: #888;">${loveRating * 10}%</div>
    </div>

    <!-- Ratings -->
    <div style="margin-top: 14px;">
      <p><strong>😠 Angry Rating:</strong> <span style="color: #ef767a;">${angryRating}/10</span></p>
      <p><strong>🐾 Meowiness Rating:</strong> <span style="color: #8eecf5;">${loveRating}/10</span></p>
    </div>
  </div>

  <!-- Image -->
  <div style="text-align: center; margin: 24px 0 12px;">
    <img src="cid:catimage" alt="Cat Pic" style="max-width: 220px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    <div style="color: #aaa; font-size: 13px; margin-top: 6px;">Your cozy cuddle buddy 🐱</div>
  </div>

  <!-- Divider -->
  <hr style="border: none; border-top: 1px solid #ddd; margin: 28px 0;">

  <!-- Cute Footer -->
  <div style="text-align: center; font-size: 22px; line-height: 1.6;">
    🐶🌙✨🐾💌🧸🍑🫶
  </div>
  <blockquote style="font-style: italic; text-align: center; color: #777; margin-top: 18px;">
    "You're the coziest corner of my heart." 🧸
  </blockquote>

  <!-- Signature -->
  <div style="text-align: right; margin-top: 26px; font-family: 'Brush Script MT', cursive; font-size: 20px; color: #6c63ff;">
    Always yours,<br>🌸 Your Calm Kitty 🌸
  </div>
</div>

`;


  const mailOptions = {
    from: 'sahil.dayanand1112@gmail.com',
    to: ['sahil.dayanand1112@gmail.com','shreyagore68@gmail.com'],
    subject: `💕 Meow scratchss: ${topic}`,
    html: htmlContent,
    attachments: [{
      filename: 'cat1.png',
      path: path.join(__dirname, 'cat1.png'),
      cid: 'catimage'
    }]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).send('Failed to send cute email 😢');
    }
    res.send('Cute email sent successfully! 🐱💌');
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
