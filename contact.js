const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // For sending emails (optional)

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Route to handle form submissions
app.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body;

  // Here you can handle saving data to a database or sending an email.
  
  // For example, sending an email using nodemailer (optional):
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: email,
    to: 'your-email@gmail.com',
    subject: 'New Contact Us Message',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email' });
    } else {
      return res.status(200).json({ message: 'Message sent successfully!' });
    }
  });

  // Respond to the frontend
  // res.json({ message: 'Message received, thank you!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
