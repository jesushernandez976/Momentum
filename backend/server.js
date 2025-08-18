require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email configuration - Uses environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
        user: process.env.EMAIL_USER, // From .env file
        pass: process.env.EMAIL_PASS  // From .env file
    }
});

// Test email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Route to handle form submission
app.post('/send-email', async (req, res) => {
    try {
        const { name, phone, email, message, marketingConsent, dataConsent } = req.body;

        // Validate required fields
        if (!name || !phone || !email || !message || !dataConsent) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields and accept the data consent.'
            });
        }

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER, // From .env file
            to: process.env.EMAIL_TO,     // From .env file
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                
                <hr>
                <h3>Consent Information:</h3>
                <p><strong>Marketing Consent:</strong> ${marketingConsent ? 'Yes' : 'No'}</p>
                <p><strong>Data Processing Consent:</strong> ${dataConsent ? 'Yes' : 'No'}</p>
                <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

// Simple test route
app.get('/test', (req, res) => {
    res.json({ message: 'Backend server is running!' });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});