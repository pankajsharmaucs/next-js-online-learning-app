import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const { subject_id, user_id, token, email } = await req.json();

        if (!token || !email) {
            return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
        }

        const db = await connectDB();

        // If token and email are provided, verify both
        if (token && email) {
            const [userToken]: any = await db.query(
                'SELECT user_id FROM users WHERE email = ? AND  token = ?', [email, token]
            );

            if (userToken.length === 0) {
                return NextResponse.json({ error: 'Invalid or expired token for superadmin' }, { status: 403 });
            }
        }

        // Check if the user already exists
        const [existingRows]: any = await db.query(
            'SELECT * FROM sold_subjects WHERE subject_id = ? and user_id = ?', [subject_id, user_id]
        );

        if (existingRows.length > 0) {
            return NextResponse.json({ message: 'success', data: existingRows }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'New' }, { status: 404 });
        }

    } catch (error) {
        console.error('Error to get Subject:', error);
        return NextResponse.json({ error: 'Failed to get Subject', details: error }, { status: 500 });
    }
}
