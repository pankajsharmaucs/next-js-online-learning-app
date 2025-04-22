import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

 

// GET: Fetch all chapters by Board ID
export async function GET(req: NextRequest) {
    try {

        const chapter_id = req.nextUrl.searchParams.get('chapter_id ');

        const db = await connectDB();
        const [rows] = await db.query( 
            'SELECT * FROM questions_answers WHERE chapter_id = ?', [chapter_id]
        );
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data', details: error }, { status: 500 });
    }
}