import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import { validateSuperAdmin } from '@/lib/apiValidator';
import Subject from '@/lib/models/api/subject'; // Assuming model is defined

// GET: Fetch all subjects by class_id
export async function GET(req: NextRequest) {
    try {
        const class_id = req.nextUrl.searchParams.get('class_id');
        await connectDB();

        const subjects = await Subject.find({ class_id });
        return NextResponse.json(subjects);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data', details: error }, { status: 500 });
    }
}

// POST: Add a new subject
export async function POST(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { class_id, subject_name } = await req.json();
        await connectDB();

        const newSubject = await Subject.create({ class_id, subject_name });
        return NextResponse.json({ message: 'subject added', id: newSubject._id });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding subject', details: error }, { status: 500 });
    }
}

// PUT: Update a subject
export async function PUT(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { subject_id, subject_name } = await req.json();
        if (!subject_id) {
            return NextResponse.json({ error: 'subject_id is required' }, { status: 400 });
        }

        await connectDB();
        const subject = await Subject.findById(subject_id);
        if (!subject) {
            return NextResponse.json({ error: 'subject not found' }, { status: 404 });
        }

        subject.subject_name = subject_name?.trim() || subject.subject_name;
        await subject.save();

        return NextResponse.json({ message: 'subject updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating subject', details: error }, { status: 500 });
    }
}

// DELETE: Delete a subject
export async function DELETE(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { subject_id } = await req.json();
        await connectDB();
        await Subject.findByIdAndDelete(subject_id);

        return NextResponse.json({ message: 'subject deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting subject', details: error }, { status: 500 });
    }
}
