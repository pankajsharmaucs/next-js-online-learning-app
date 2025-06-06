import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import { comparePassword } from '@/lib/crypto';
import jwt from 'jsonwebtoken';
import User from '@/lib/models/user/User';

const JWT_SECRET = process.env.JWT_SECRET!; // Store securely in .env.local

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB(); // Connect to MongoDB

    // Find user by email and role 'super_admin'
    const admin = await User.findOne({ email, role: 'user' });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (admin.active_status !== 1) {
      return NextResponse.json({ error: 'User Inactive' }, { status: 403 });
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT payload
    const payload = {
      email: admin.email,
      role: admin.role,
      id: admin._id,
      token: admin.token,
    };

    // Sign JWT token (12 hours)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });

    // Set token in cookie
    const response = NextResponse.json({ message: 'Login successful' });

    response.cookies.set('userToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 12 * 60 * 60, // 12 hours in seconds
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed', details: error }, { status: 500 });
  }
}
