import express from 'express';
import nodemailer from 'nodemailer';
import { scheduleJob } from 'node-schedule';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Store subscribers
const subscribers: string[] = [];

// Email template
const createEmailContent = () => {
    return `
        <h1>Your Daily Jewelry Update</h1>
        <p>Here's your daily dose of jewelry inspiration!</p>
        <p>Check out our latest collection and exclusive offers.</p>
        <p>Visit our website to explore more.</p>
    `;
};

// Schedule daily email job
scheduleJob('0 0 * * *', async () => {
    const emailContent = createEmailContent();
    
    for (const email of subscribers) {
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your Daily Jewelry Update',
                html: emailContent
            });
            console.log(`Email sent to ${email}`);
        } catch (error) {
            console.error(`Failed to send email to ${email}:`, error);
        }
    }
});

// Subscribe endpoint
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    if (subscribers.includes(email)) {
        return res.status(400).json({ error: 'Email already subscribed' });
    }

    subscribers.push(email);
    console.log(`New subscriber: ${email}`);
    
    // Send welcome email
    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Jewelry Updates!',
        html: `
            <h1>Welcome to Our Jewelry Updates!</h1>
            <p>Thank you for subscribing to our daily jewelry updates.</p>
            <p>You'll receive your first update tomorrow.</p>
        `
    }).catch(error => {
        console.error('Failed to send welcome email:', error);
    });

    res.json({ message: 'Successfully subscribed' });
});

// Unsubscribe endpoint
app.post('/unsubscribe', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const index = subscribers.indexOf(email);
    if (index === -1) {
        return res.status(400).json({ error: 'Email not found' });
    }

    subscribers.splice(index, 1);
    console.log(`Unsubscribed: ${email}`);
    
    res.json({ message: 'Successfully unsubscribed' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
