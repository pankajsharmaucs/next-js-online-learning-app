import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

// Helper to validate superadmin token
import { validateSuperAdmin } from '@/lib/apiValidator';

// GET: Fetch all subjects by Board ID
export async function GET(req: NextRequest) {
    try {

        const class_id = req.nextUrl.searchParams.get('class_id');

        const db = await connectDB();
        const [rows] = await db.query(
            'SELECT * FROM subjects WHERE class_id = ?', [class_id]
        );
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data', details: error }, { status: 500 });
    }
}

// POST: Add a new board
export async function POST(req: NextRequest) {
     try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { class_id, subject_name } = await req.json();
        const db = await connectDB();

        const [result] = await db.query(
            'INSERT INTO subjects (class_id ,subject_name ) VALUES (?, ?)', [class_id, subject_name]
        );

        return NextResponse.json({ message: 'subject added', id: (result as any).insertId });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding subject', details: error }, { status: 500 });
    }
}

// PUT: Update a board
export async function PUT(req: NextRequest) {
     try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { subject_id, subject_name  } = await req.json();

        if (!subject_id) {
            return NextResponse.json({ error: 'subject_id is required' }, { status: 400 });
        }

        const db = await connectDB();

        // Fetch existing record
        const [existingRows]: any = await db.query(
            'SELECT * FROM subjects WHERE subject_id = ?', [subject_id]
        );

        if (existingRows.length === 0) {
            return NextResponse.json({ error: 'subject not found' }, { status: 404 });
        }

        const existing = existingRows[0];

        // Use existing values if fields are missing or empty
        const updatedSubject_name = subject_name?.trim() || existing.subject_name;

        await db.query(
            'UPDATE subjects SET subject_name = ?  WHERE subject_id = ?',
            [updatedSubject_name, subject_id]
        );

        return NextResponse.json({ message: 'subject updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating subject', details: error }, { status: 500 });
    }
}

// DELETE: Delete a board
export async function DELETE(req: NextRequest) {
     try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { subject_id } = await req.json();
        const db = await connectDB();

        await db.query('DELETE FROM subjects WHERE subject_id = ?', [subject_id]);

        return NextResponse.json({ message: 'subject deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting subject', details: error }, { status: 500 });
    }
}
