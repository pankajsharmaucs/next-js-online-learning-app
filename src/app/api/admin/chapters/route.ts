import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

// Helper to validate superadmin token
const validateSuperAdmin = (req: NextRequest) => {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1]; // Expected format: Bearer <token>
    return token === process.env.SUPERADMIN_TOKEN;
};

// GET: Fetch all chapters by Board ID
export async function GET(req: NextRequest) {
    try {

        const subject_id = req.nextUrl.searchParams.get('subject_id');

        const db = await connectDB();
        const [rows] = await db.query( 
            'SELECT * FROM chapters WHERE subject_id = ?', [subject_id]
        );
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data', details: error }, { status: 500 });
    }
}

// POST: Add a new board
export async function POST(req: NextRequest) {
    if (!validateSuperAdmin(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { subject_id, chapter_name, summary, video_url, pdf } = await req.json();
        const db = await connectDB();

        const [result] = await db.query(
            'INSERT INTO chapters (subject_id , chapter_name,summary,video_url,pdf ) VALUES (?, ?)', [subject_id, chapter_name, summary, video_url, pdf]
        );

        return NextResponse.json({ message: 'chapter added', id: (result as any).insertId });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding chapter', details: error }, { status: 500 });
    }
}

// PUT: Update a board
export async function PUT(req: NextRequest) {
    if (!validateSuperAdmin(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { chapter_id, chapter_name, summary, video_url, pdf } = await req.json();

        if (!chapter_id) {
            return NextResponse.json({ error: 'subject_id is required' }, { status: 400 });
        }

        const db = await connectDB();

        // Fetch existing record
        const [existingRows]: any = await db.query(
            'SELECT * FROM chapters WHERE chapter_id  = ?', [chapter_id]
        );

        if (existingRows.length === 0) {
            return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
        }

        const existing = existingRows[0];

        // Use existing values if fields are missing or empty
        const updatedchapter_name = chapter_name?.trim() || existing.chapter_name;
        const updatedsummary = summary?.trim() || existing.summary;
        const updatedvideo_url = video_url?.trim() || existing.video_url;
        const updatedpdf = pdf?.trim() || existing.pdf;

        await db.query(
            'UPDATE chapters SET chapter_name = ?, summary = ?, video_url = ?, pdf = ?  WHERE  chapter_id = ?',
            [updatedchapter_name, updatedsummary, updatedvideo_url, updatedpdf, chapter_id]
        );

        return NextResponse.json({ message: 'Chapter updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating Chapter', details: error }, { status: 500 });
    }
}

// DELETE: Delete a board
export async function DELETE(req: NextRequest) {
    if (!validateSuperAdmin(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { chapter_id } = await req.json();
        const db = await connectDB();

        await db.query('DELETE FROM chapters WHERE chapter_id = ?', [chapter_id]);

        return NextResponse.json({ message: 'Chapter deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting Chapter', details: error }, { status: 500 });
    }
}
