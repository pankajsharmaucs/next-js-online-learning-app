import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import User from '@/lib/models/user/User';  // MongoDB User model
import SoldClass from '@/lib/models/buy/SoldClass';  // MongoDB SoldClass model

export async function POST(req: NextRequest) {
  try {
    const { class_id, user_id, token, email } = await req.json();

    if (!token || !email) {
      return NextResponse.json({ error: 'Token and email are required' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectDB();

    // Verify user token and email
    const user = await User.findOne({ email, token });
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token for user' }, { status: 403 });
    }

    // Check if the user already has the class
    const existingClass = await SoldClass.findOne({ class_id, user_id });
    if (existingClass) {
      return NextResponse.json({ message: 'Success', data: existingClass }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'New class purchase required' }, { status: 404 });
    }

  } catch (error) {
    console.error('Error getting class:', error);
    return NextResponse.json({ error: 'Failed to get class', details: error }, { status: 500 });
  }
}
