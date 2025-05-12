import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import User from '@/lib/models/user/User';
import SoldClass from '@/lib/models/user/SoldClass';

export async function POST(req: NextRequest) {
  try {
    const {
      class_id,
      user_id,
      purchase_date,
      validity,
      token,
      email,
      user_type,
      task_type = null,
    } = await req.json();

    if (!token || !email) {
      return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
    }

    await connectDB();

    // Validate user with token, email, and role
    const user = await User.findOne({ email, token, role: user_type });
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
    }

    // Check if the class is already sold to the user
    const existing = await SoldClass.findOne({ class_id, user_id });

    if (existing) {
      if (task_type === 'update') {
        existing.purchase_date = purchase_date;
        existing.validity = validity;
        existing.update_date = purchase_date;
        existing.activeStatus = 1;
        await existing.save();

        return NextResponse.json({ message: 'Class validity Updated' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Class Already purchased' }, { status: 400 });
      }
    } else {
      const newSoldClass = new SoldClass({
        class_id,
        user_id,
        purchase_date,
        validity,
        update_date: purchase_date,
        activeStatus: 1,
      });

      await newSoldClass.save();

      return NextResponse.json({ message: 'Class Added successfully' }, { status: 201 });
    }
  } catch (error: any) {
    console.error('Error creating class:', error);
    return NextResponse.json(
      { error: 'Failed to Add class', details: error.message },
      { status: 500 }
    );
  }
}
