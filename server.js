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
    <div style="background-color: #ffe4ec; padding: 30px; font-family: 'Comic Sans MS', cursive; border-radius: 12px;">
      <table style="width: 100%; max-width: 600px; margin: auto; background-color: #fffafc; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <tr>
          <td style="width: 50%; text-align: center; padding: 20px;">
            <img src="cid:catimage" alt="Cute Cat" style="width: 100%; max-width: 250px; border-radius: 10px;">
          </td>
          <td style="width: 50%; padding: 20px; vertical-align: top;">
            <div style="font-size: 18px; color: #e91e63; font-weight: bold; margin-bottom: 8px;">💕 Meow Message Alert 💕</div>
            <div><strong>📌 Topic:</strong> <span style="color: #ff4081;">${topic}</span></div>
            <div style="margin-top: 10px;"><strong>📝 Description:</strong><br><em>${description}</em></div>
            <div style="margin-top: 15px;">
              <strong>😠 Angry Rating:</strong> <span style="color: #f44336;">${angryRating}/10</span><br>
              <strong>😍 Meowieess Rating:</strong> <span style="color: #9c27b0;">${loveRating}/10</span>
            </div>
            <div style="margin-top: 25px; text-align: right; font-size: 16px; color: #555;">💌 From your Secret Admirer</div>
          </td>
        </tr>
      </table>
    </div>
  `;

  const mailOptions = {
    from: 'sahil.dayanand1112@gmail.com',
    to: ['sahil.dayanand1112@gmail.com','shreyagore68@gmail.com'],
    subject: `💕 Meow scratchss: ${topic}`,
    html: htmlContent,
    attachments: [{
      filename: 'cat.png',
      path: path.join(__dirname, 'cat.png'),
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
