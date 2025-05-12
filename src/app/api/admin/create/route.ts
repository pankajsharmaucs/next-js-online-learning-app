import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import { hashPassword } from '@/lib/crypto';
import crypto from 'crypto';
import  User  from '@/lib/models/user/User';

// GET all users
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users', details: error }, { status: 500 });
  }
}

// POST create user
export async function POST(req: NextRequest) {
  try {
    const { email, password, role = 'user', token, superadmin_email } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();

    let createdBy = null;

    if (token && superadmin_email) {
      const superAdmin = await User.findOne({ token, email: superadmin_email, role: 'super_admin' });
      if (!superAdmin) {
        return NextResponse.json({ error: 'Invalid or expired token for superadmin' }, { status: 403 });
      }
      createdBy = superAdmin.email;
    }

    const existingUser = await User.findOne({ email, role });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const newUserToken = crypto.randomBytes(32).toString('hex');

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      token: newUserToken,
      created_by: createdBy,
    });

    await newUser.save();

    return NextResponse.json({ message: 'User created successfully', token: newUserToken });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user', details: error }, { status: 500 });
  }
}

// PUT update user
export async function PUT(req: NextRequest) {
  try {
    const { user_id, email, password, role, token, superadmin_email, active_status } = await req.json();

    if (!user_id || !email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();

    if (token && superadmin_email) {
      const superAdmin = await User.findOne({ token, email: superadmin_email, role: 'super_admin' });
      if (!superAdmin) {
        return NextResponse.json({ error: 'Invalid or expired token for superadmin' }, { status: 403 });
      }
    }

    const user = await User.findById(user_id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update fields conditionally
    user.email = email || user.email;
    user.password = password ? await hashPassword(password) : user.password;
    user.role = role || user.role;
    if (active_status !== undefined) user.active_status = active_status;

    await user.save();

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user', details: error }, { status: 500 });
  }
}
