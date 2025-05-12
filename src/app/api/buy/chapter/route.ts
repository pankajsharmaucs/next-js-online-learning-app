import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import SoldChapter from '@/lib/models/buy/SoldChapter';
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
      task_type = null
    } = await req.json();

    if (!token || !email) {
      return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
    }

    await connectDB();

    // Verify user by token and role
    const user = await User.findOne({ token, role: user_type });
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token for superadmin' }, { status: 403 });
    }

    const existing = await SoldChapter.findOne({ chapter_id, user_id });

    if (existing) {
      // ========DEACTIVATE=====
      if (task_type === "remove") {
        existing.activeStatus = 0;
        await existing.save();
        return NextResponse.json({ message: 'Chapter Deactivated' });
      }

      // ========UPDATE=====
      existing.purchase_date = purchase_date;
      existing.validity = validity;
      existing.update_date = purchase_date;
      existing.activeStatus = 1;
      await existing.save();

      return NextResponse.json({ message: 'User Chapter purchased validity Updated' });
    } else {
      // ========INSERT NEW=====
      const newChapter = new SoldChapter({
        chapter_id,
        subject_id,
        user_id,
        purchase_date,
        validity,
        activeStatus: 1,
        create_date: new Date().toISOString(),
      });

      await newChapter.save();
      return NextResponse.json({ message: 'Chapter Added successfully' });
    }

  } catch (error) {
    console.error('Error creating chapter:', error);
    return NextResponse.json({ error: 'Failed to Add chapter', details: (error as Error).message }, { status: 500 });
  }
}
