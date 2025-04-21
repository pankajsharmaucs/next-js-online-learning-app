import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { class_id, user_id, purchase_date, validity, token, email, user_type, task_type = null } = await req.json();

    if (!token || !email) {
      return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
    }

    const db = await connectDB();

    // If token and email are provided, verify both
    if (token && email) {
      const [userToken]: any = await db.query(
        'SELECT user_id FROM users WHERE token = ? AND role = ?', [token, user_type]
      );

      if (userToken.length === 0) {
        return NextResponse.json({ error: 'Invalid or expired token for superadmin' }, { status: 403 });
      }
    }

    // Check if the user already exists
    const [existingRows]: any = await db.query(
      'SELECT * FROM sold_class WHERE class_id = ? and user_id = ?', [class_id, user_id]
    );

    if (existingRows.length > 0) {

      const existing = existingRows[0];
      const ExistingID = existing.id;

       // ========DEACTIVATE=====
       if (task_type == "remove") {
        await db.query(
          'UPDATE sold_class SET activeStatus = ?  WHERE id = ? and class_id = ? ', [0, ExistingID, class_id]
        );
        return NextResponse.json({ error: 'Class Deactivated' }, { status: 200 });
      }

      await db.query(
        'UPDATE sold_class SET purchase_date = ?, validity = ?, update_date = ?  WHERE id = ? and class_id = ? ',
        [purchase_date, validity, purchase_date, ExistingID, class_id]
      );
      return NextResponse.json({ error: 'User Class purchased validity Updated' }, { status: 200 });

    } else {

      // Insert the user
      await db.query(
        'INSERT INTO sold_class (class_id,  user_id, purchase_date, validity, update_date) VALUES (?, ?, ?, ?, ?)',
        [class_id, user_id, purchase_date, validity, purchase_date]
      );
      return NextResponse.json({ message: 'Class Added successfully' }, { status: 409 });

    }

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to Add Class', details: error }, { status: 500 });
  }
}
