import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { comparePassword } from '@/lib/crypto';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const db = await connectDB();

    // Get admin from DB
    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE email = ? AND role = ?',
      [email, 'super_admin']
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const admin = rows[0];

    if (admin.active_status !== 1) {
      return NextResponse.json({ error: 'User Inactive ' }, { status: 403 });
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');

    // Save token to DB
    await db.query('UPDATE users SET token = ? WHERE email = ?', [token, admin.email]);

    // Set both token and email in cookies
    const response = NextResponse.json({ message: 'Login successful', email: admin.email });

    response.cookies.set('adminToken', token, {
      httpOnly: true,  // Ensures the cookie can't be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Set secure flag only in production
      sameSite: 'strict',  // Ensures the cookie is sent only to the same site (lowercase)
      maxAge: 3600 * 1000  // Cookie expires in 1 hour
    });

    response.cookies.set('adminEmail', admin.email, {
      httpOnly: true,  // Ensures the cookie can't be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Set secure flag only in production
      sameSite: 'strict',  // Ensures the cookie is sent only to the same site (lowercase)
      maxAge: 3600 * 1000  // Cookie expires in 1 hour
    });

    response.cookies.set('adminRole', admin.role, {
      httpOnly: true,  // Ensures the cookie can't be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Set secure flag only in production
      sameSite: 'strict',  // Ensures the cookie is sent only to the same site (lowercase)
      maxAge: 3600 * 1000  // Cookie expires in 1 hour
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Login failed', details: error }, { status: 500 });
  }
}
