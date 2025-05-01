import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { hashPassword } from '@/lib/crypto';
import crypto from 'crypto';


// GET all users
export async function GET(req: NextRequest) {
  try {
    const db = await connectDB();

    const [users]: any = await db.query(
      'SELECT user_id, email, role, created_by, created_at FROM users'
    );

    return NextResponse.json({
      message: 'Users fetched successfully',
      users
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users', details: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, role = 'user', token, superadmin_email } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const db = await connectDB();

    let createdBy: string | null = null;

    // If token and superadmin_email are provided, verify both
    if (token && superadmin_email) {
      const [adminToken]: any = await db.query(
        'SELECT user_id FROM users WHERE token = ? AND role = ?',
        [token, 'super_admin']
      );

      if (adminToken.length === 0) {
        return NextResponse.json({ error: 'Invalid or expired token for superadmin' }, { status: 403 });
      }

      const [superAdmin]: any = await db.query(
        'SELECT user_id FROM users WHERE email = ? AND role = ?',
        [superadmin_email, 'super_admin']
      );

      if (superAdmin.length === 0) {
        return NextResponse.json({ error: 'Invalid superadmin_email' }, { status: 403 });
      }

    }

    createdBy = superadmin_email;

    // Check if the user already exists
    const [existing]: any = await db.query(
      'SELECT user_id FROM users WHERE email = ? and role = ?', [email, role]
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
      [email, hashedPassword, role, newUserToken, createdBy]
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
