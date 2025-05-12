// lib/mailer.ts
import nodemailer from 'nodemailer';

export async function sendOtpEmail(to: string, otp: number) {
  // Setup Nodemailer transport using HostGator SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // HostGator SMTP host
    port: 465, // SMTP port, HostGator uses 587 for TLS
    secure: false, // Use TLS
    auth: {
      user: process.env.SMTP_USERNAME, // Your SMTP username (email address)
      pass: process.env.SMTP_PASSWORD, // Your SMTP password (from HostGator)
    },
  });

  // Prepare email details
  const mailOptions = {
    from: process.env.SMTP_USERNAME, // From email address
    to, // Recipient email
    subject: 'Your OTP Code',
    text: `Your OTP verification code is: ${otp}. This code is valid for 10 minutes.`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
