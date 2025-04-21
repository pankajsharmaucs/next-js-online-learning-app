import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { comparePassword } from '@/lib/crypto';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const db = await connectDB();

    // Get admin from DB
    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE email = ? AND role = ?', [email, role]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid User credentials' }, { status: 401 });
    }

    const admin = rows[0];

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid User credentials' }, { status: 401 });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');

    // Save token to DB
    await db.query('UPDATE users SET token = ? WHERE email = ?', [token, admin.email]);

    return NextResponse.json({ message: 'User Login successful', token });
  } catch (error) {
    return NextResponse.json({ error: 'User Login failed', details: error }, { status: 500 });
  }
  
}
