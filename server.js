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
     <div style="max-width: 650px; margin: auto; background-color: #fff0f5; border-radius: 20px; border: 5px dotted #ff69b4; box-shadow: 0 0 18px #ffb6c1; padding: 25px; position: relative;">
    
      
      <!-- Speech Bubble -->
      <div style="background: #ffffff; border: 3px dashed #e91e63; border-radius: 20px; padding: 20px; margin-bottom: 20px; position: relative;">
        <p style="font-size: 20px; color: #d81b60; font-weight: bold;">🐱 Meow Meow from your Baby!</p>
        <p><strong>📌 Topic:</strong> <span style="color: #f50057;">${topic}</span></p>
        <p><strong>📝 Description:</strong><br><em>${description}</em></p>

        <!-- Animated Love Meter -->
        <div style="margin-top: 15px;">
          <div style="background-color: #ffe6ef; border-radius: 20px; overflow: hidden; height: 16px; box-shadow: inset 0 0 6px #f8bbd0;">
            <div style="width: ${loveRating * 10}%; background: linear-gradient(90deg, #f06292, #ec407a); height: 100%; box-shadow: 0 0 10px #f06292;"></div>
          </div>
          <div style="font-size: 14px; color: #777; text-align: right;">💕 Love Meter: ${loveRating * 10}%</div>
        </div>

        <!-- Ratings -->
        <div style="margin-top: 12px;">
          <strong>😠 Angry Rating:</strong> <span style="color: #f44336;">${angryRating}/10</span><br>
          <strong>😍 Meowieess Rating:</strong> <span style="color: #ab47bc;">${loveRating}/10</span>
        </div>
      </div>

      <!-- Cat Image -->
      <div style="text-align: center;">
        <img src="cid:catimage" alt="Cute Cat" style="max-width: 240px; border-radius: 15px; box-shadow: 0 0 10px #f48fb1;">
        <div style="font-size: 14px; color: #777; margin-top: 10px;">🐾 Your snuggle cat of love 🐾</div>
      </div>

      <!-- Divider -->
      <hr style="border: none; border-top: 2px dotted #ec407a; margin: 25px 0;">

      <!-- Floating Emoji Cloud -->
      <div style="font-size: 24px; text-align: center; line-height: 2;">
        😺💌💋🐾🌈✨😽💖😻🫶
      </div>

      <!-- Cute Quote -->
      <blockquote style="font-style: italic; text-align: center; color: #666; margin-top: 20px;">
        "You're the purr-fect part of my day." 🐾
      </blockquote>

      <!-- Signature -->
      <div style="text-align: right; margin-top: 30px; font-family: 'Brush Script MT', cursive; font-size: 22px; color: #e91e63;">
        Forever yours,<br>💘 Your Pawsome Love 💘
      </div>
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
