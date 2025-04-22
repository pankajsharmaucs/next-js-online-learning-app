import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const {  class_id, user_id, purchase_date, validity, token, email, user_type, task_type = null } = await req.json();

        if (!token || !email) {
            return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
        }

        const db = await connectDB();

        // If token and email are provided, verify both
        if (token && email) {
            const [userToken]: any = await db.query(
                'SELECT user_id FROM users WHERE email = ? AND  token = ? AND role = ?', [email, token, user_type]
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

            if (task_type == "update") {

                const existing = existingRows[0];
                const ExistingID = existing.id;

                await db.query(
                    'UPDATE sold_class SET purchase_date = ?, validity = ?, update_date = ?, activeStatus = ?  WHERE id = ? and class_id = ? ',
                    [purchase_date, validity, purchase_date, 1, ExistingID, class_id]
                );
                return NextResponse.json({ message: 'Class validity Updated' }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Class Already purchased' }, { status: 400 });
            }

        } else {

            // Insert the user
            await db.query(
                'INSERT INTO sold_class ( class_id, user_id, purchase_date, validity, update_date) VALUES (?, ?, ?, ?, ?)',
                [ class_id, user_id, purchase_date, validity, purchase_date]
            );
            return NextResponse.json({ message: 'Class Added successfully' }, { status: 409 });

        }


    } catch (error) {
        console.error('Error creating subject:', error);
        return NextResponse.json({ error: 'Failed to Add subject', details: error }, { status: 500 });
    }
}
