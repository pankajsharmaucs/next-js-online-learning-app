import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import SoldClass from '@/lib/models/buy/SoldClass';
import User from '@/lib/models/user/User'; // Optional, for token validation

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email, token, class_id } = await req.json();

    if (!email || !token || !class_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Optionally validate token here if you're storing it
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid user' }, { status: 401 });
    }

    const soldClass = await SoldClass.findOne({ user_id:email, class_id });

    if (!soldClass) {
      return NextResponse.json({ hasAccess: false }, { status: 404 });
    }

    return NextResponse.json({ hasAccess: true }, { status: 200 });

  } catch (err) {
    console.error('Error checking class access:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
