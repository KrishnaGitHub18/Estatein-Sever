const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();

router.post('/email', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "email and password are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'donotreply12343@gmail.com',
        pass: 'jkdvfhatpycrsfja', 
      },
    });

    const info = await transporter.sendMail({
      from: '"Estatein Team" <donotreply12343@gmail.com>',
      to: email,
      subject: "Thank you for reaching out to Estatein",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #eee;
              border-radius: 8px;
              background: #fafafa;
            }
            .header {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 15px;
              color: #2c3e50;
            }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #777;
            }
            a {
              color: #2c3e50;
              font-weight: bold;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Thank you for contacting Estatein</div>
            <p>Dear ${name}</p>
            <p>We've received your inquiry regarding the bungalow in the United States. Our dedicated team is already reviewing your request and will get back to you shortly with the details you need.</p>
            <p>Meanwhile, you can explore more of our premium properties and services on our website:  
              <a href="https://estatein-six.vercel.app/" target="_blank">https://estatein-six.vercel.app/</a>
            </p>
            <p>Best regards,<br><b>The Estatein Team</b></p>
            <div class="footer">
              This is an automated message. Please do not reply directly to this email.
            </div>
          </div>
        </body>
        </html>
      `,
    });
    res.status(200).json({ message: "Email sent successfully", messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email", details: error.message });
  }
});

module.exports = router;
