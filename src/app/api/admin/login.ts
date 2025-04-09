import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db";
import nodemailer from "nodemailer";

// Utility to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  // Generate OTP
  const otp = generateOTP();

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if ((rows as any[]).length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user record with the OTP and expiry (5 minutes from now)
    await pool.query(
      "UPDATE users SET otp = ?, otp_expires = DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE email = ?",
      [otp, email]
    );

    // Configure your SMTP transporter (replace with your SMTP provider details)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.example.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // Use true if port is 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email with the OTP
    await transporter.sendMail({
      from: `"Your App" <no-reply@yourapp.com>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
