import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import SoldClass from '@/lib/models/buy/SoldClass';
import User from '@/lib/models/user/User';

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
      task_type = null
    } = await req.json();

    if (!token || !email) {
      return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
    }

    await connectDB();

    // Validate token and user role
    const user = await User.findOne({ token, role: user_type });
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token for superadmin' }, { status: 403 });
    }

    const existing = await SoldClass.findOne({ class_id, user_id });

    if (existing) {
      if (task_type === 'remove') {
        existing.activeStatus = 0;
        await existing.save();
        return NextResponse.json({ message: 'Class Deactivated' });
      }

      existing.purchase_date = purchase_date;
      existing.validity = validity;
      existing.update_date = purchase_date;
      await existing.save();

      return NextResponse.json({ message: 'User Class purchased validity Updated' });
    } else {
      const newClass = new SoldClass({
        class_id,
        user_id,
        purchase_date,
        validity,
        update_date: purchase_date,
        activeStatus: 1,
        create_date: new Date().toISOString(),
      });

      await newClass.save();
      return NextResponse.json({ message: 'Class Added successfully' });
    }

  } catch (error) {
    console.error('Error creating Class:', error);
    return NextResponse.json({ error: 'Failed to Add Class', details: (error as Error).message }, { status: 500 });
  }
}
