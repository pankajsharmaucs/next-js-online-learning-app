import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { hashPassword } from '@/lib/crypto';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email, password, role, } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const db = await connectDB();
    
    // Check if the user already exists
    const [existing]: any = await db.query(
      'SELECT user_id FROM users WHERE email = ?', [email]
    );

    if (existing.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate token for the new user
    const newUserToken = crypto.randomBytes(32).toString('hex');

    // Insert the user
    await db.query(
      'INSERT INTO users (email, password, role, token, created_by) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, role || 'user', newUserToken, email]
    );

    return NextResponse.json({
      message: 'User created successfully',
      token: newUserToken
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user', details: error }, { status: 500 });
  }
}
