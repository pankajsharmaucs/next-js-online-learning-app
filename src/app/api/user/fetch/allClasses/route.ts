import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import User from '@/lib/models/user/User';
import SoldClass from '@/lib/models/buy/SoldClass';

export async function POST(req: NextRequest) {
  try {
    const { email, token } = await req.json();

    if (!email || !token) {
      return NextResponse.json({ error: 'Email and token are required' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectDB();

    // Verify user
    const user = await User.findOne({ email, token });
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token for user' }, { status: 403 });
    }

    // Fetch all sold classes for the user
    const soldClasses = await SoldClass.find({ user_id: user.email });

    return NextResponse.json({ message: 'Success', data: soldClasses }, { status: 200 });

  } catch (error) {
    console.error('Error fetching sold classes:', error);
    return NextResponse.json({ error: 'Failed to fetch sold classes', details: error }, { status: 500 });
  }
}
