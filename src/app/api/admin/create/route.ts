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
      'SELECT * FROM users'
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

// UPDATE user
export async function PUT(req: NextRequest) {
  try {
    const { user_id, email, password, role, token, superadmin_email,active_status } = await req.json();

    if (!user_id || !email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
 
    const db = await connectDB();

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

    // Fetch the existing user
    const [existingUser]: any = await db.query('SELECT * FROM users WHERE user_id = ?', [user_id]);

    if (existingUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let updateFields: string[] = [];
    let updateValues: any[] = [];

    if (email) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }

    if (password) {
      const hashedPassword = await hashPassword(password);
      updateFields.push('password = ?');
      updateValues.push(hashedPassword);
    }

    if (role) {
      updateFields.push('role = ?');
      updateValues.push(role);
    }

    if (active_status) {
      updateFields.push('active_status = ?');
      updateValues.push(active_status);
    }

    if (updateFields.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    updateValues.push(user_id); // for WHERE clause

    const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE user_id = ?`;

    await db.query(updateQuery, updateValues);

    return NextResponse.json({ message: 'User updated successfully' });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user', details: error }, { status: 500 });
  }
}