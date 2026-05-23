const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Is se frontend se request aane par error nahi aayega
app.use(express.json()); // JSON data read karne ke liye

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Tumhara Gmail
        pass: process.env.EMAIL_PASS  // Tumhara Gmail App Password
    }
});

// Contact Route
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Email Layout
    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL, // Jahaan tum mail receive karna chahte ho
        subject: `💼 New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // Sending Email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Email not sent!" });
        }
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});