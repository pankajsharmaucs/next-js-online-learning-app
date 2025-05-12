import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import SoldChapter from '@/lib/models/user/SoldChapter';
import User from '@/lib/models/user/User';

export async function POST(req: NextRequest) {
  try {
    const {
      chapter_id,
      subject_id,
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

    // Token and email validation
    const user = await User.findOne({ email, token, role: user_type });
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token for user' }, { status: 403 });
    }

    const existing = await SoldChapter.findOne({ chapter_id, user_id });

    if (existing) {
      if (task_type === 'update') {
        existing.purchase_date = purchase_date;
        existing.validity = validity;
        existing.update_date = purchase_date;
        existing.activeStatus = 1;
        await existing.save();

        return NextResponse.json({ message: 'Chapter validity Updated' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Chapter Already purchased' }, { status: 400 });
      }
    } else {
      const newSoldChapter = new SoldChapter({
        chapter_id,
        subject_id,
        user_id,
        purchase_date,
        validity,
        update_date: purchase_date,
        activeStatus: 1,
      });

      await newSoldChapter.save();

      return NextResponse.json({ message: 'Chapter Added successfully' }, { status: 201 });
    }
  } catch (error: any) {
    console.error('Error creating chapter:', error);
    return NextResponse.json(
      { error: 'Failed to Add chapter', details: error.message },
      { status: 500 }
    );
  }
}
