import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import SoldSubject from '@/lib/models/buy/SoldSubject';
import User from '@/lib/models/user/User';

export async function POST(req: NextRequest) {
  try {
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

    await connectDB();

    const user = await User.findOne({ token, role: user_type });
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token for superadmin' }, { status: 403 });
    }

    const existing = await SoldSubject.findOne({ subject_id, user_id });

    if (existing) {
      if (task_type === 'remove') {
        existing.activeStatus = 0;
        await existing.save();
        return NextResponse.json({ message: 'Subject Deactivated' }, { status: 200 });
      }

      existing.purchase_date = purchase_date;
      existing.validity = validity;
      existing.update_date = purchase_date;
      await existing.save();

      return NextResponse.json({ message: 'User subject purchased validity Updated' }, { status: 200 });
    } else {
      const newSubject = new SoldSubject({
        subject_id,
        class_id,
        user_id,
        purchase_date,
        validity,
        update_date: purchase_date,
        activeStatus: 1,
        create_date: new Date().toISOString(),
      });

      await newSubject.save();
      return NextResponse.json({ message: 'Subject Added successfully' }, { status: 200 });
    }
  } catch (error) {
    console.error('Error creating subject:', error);
    return NextResponse.json({ error: 'Failed to Add subject', details: (error as Error).message }, { status: 500 });
  }
}
