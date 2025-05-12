import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db'; // Your Mongoose connect function
import User from '@/lib/models/user/User';
import SoldSubject from '@/lib/models/user/SoldSubject';

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // Connect to MongoDB

    const {
      subject_id,
      class_id,
      user_id,
      purchase_date,
      validity,
      token,
      email,
      user_type,
      task_type = null
    } = await req.json();

    if (!token || !email) {
      return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
    }

    // Validate token and email
    const userToken = await User.findOne({
      email,
      token,
      role: user_type
    });

    if (!userToken) {
      return NextResponse.json({ error: 'Invalid or expired token for superadmin' }, { status: 403 });
    }

    // Check if the subject was already sold
    const existing = await SoldSubject.findOne({ subject_id, user_id });

    if (existing) {
      if (task_type === 'update') {
        existing.purchase_date = purchase_date;
        existing.validity = validity;
        existing.update_date = purchase_date;
        existing.activeStatus = 1;

        await existing.save();
        return NextResponse.json({ message: 'Subject validity Updated' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Subject Already purchased' }, { status: 400 });
      }
    } else {
      // Create a new record
      await SoldSubject.create({
        subject_id,
        class_id,
        user_id,
        purchase_date,
        validity,
        update_date: purchase_date
      });

      return NextResponse.json({ message: 'Subject Added successfully' }, { status: 409 });
    }

  } catch (error) {
    console.error('Error creating subject:', error);
    return NextResponse.json({ error: 'Failed to Add subject', details: error }, { status: 500 });
  }
}
