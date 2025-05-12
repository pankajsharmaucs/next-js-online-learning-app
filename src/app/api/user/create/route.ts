import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import { hashPassword } from '@/lib/crypto';
import crypto from 'crypto';
import User from '@/lib/models/user/User';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const token = crypto.randomBytes(32).toString('hex');
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Create new user (not yet verified)
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || 'user',
      token,
      created_by: email,
      otp,
      otpVerified: false,
      otpExpires
    });

    // TODO: Send OTP via email (placeholder)
    console.log(`OTP for ${email}: ${otp}`);

    return NextResponse.json({
      message: 'User created. OTP sent to email.',
      token
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user', details: error }, { status: 500 });
  }
}
