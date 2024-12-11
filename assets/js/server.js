const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API endpoint for form submission
app.post('/contact', (req, res) => {
  const { fullname, email, message } = req.body;

  // Send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Email from .env file
      pass: process.env.EMAIL_PASS, // Password from .env file
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to: process.env.EMAIL_USER,   // Recipient's email
    subject: 'New Contact Form Submission',
    text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Email Error:', err);
      return res.status(500).send('Email Error');
    }

    res.send('Message Sent Successfully!');
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
