import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import User from '@/lib/models/user/User'; // MongoDB User model
import SoldSubject from '@/lib/models/buy/SoldSubject'; // MongoDB SoldSubject model

export async function POST(req: NextRequest) {
    try {
        const { subject_id, user_id, token, email } = await req.json();

        if (!token || !email) {
            return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
        }

        // Connect to MongoDB
        await connectDB();

        // Verify token and email by querying the User model
        const user = await User.findOne({ email, token });

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired token for user' }, { status: 403 });
        }

        // Check if the user already has this subject in the SoldSubject collection
        const existingSubject = await SoldSubject.findOne({ subject_id, user_id });

        if (existingSubject) {
            return NextResponse.json({ message: 'success', data: existingSubject }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'New' }, { status: 404 });
        }

    } catch (error) {
        console.error('Error to get Subject:', error);
        return NextResponse.json({ error: 'Failed to get Subject', details: error }, { status: 500 });
    }
}
