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

        const filter = class_id ? { class_id } : {};
        const subjects = await Subject.find(filter);

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

        // ✅ Validate inputs
        if (!class_id || !subject_name) {
            return NextResponse.json({ error: 'class_id and subject_name are required' }, { status: 400 });
        }

        // ✅ Check for duplicate subject in the same class (case-insensitive)
        const existingSubject = await Subject.findOne({
            class_id,
            subject_name: { $regex: `^${subject_name}$`, $options: 'i' },
        });

         if (existingSubject) {
            return NextResponse.json(
                { error: 'Subject name already exists under this class' },
                { status: 409 }
            );
        }


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

        const { _id, subject_name } = await req.json();
        if (!_id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await connectDB();
        const subject = await Subject.findById(_id);
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

        const { id } = await req.json();
        await connectDB();
        await Subject.findByIdAndDelete(id);

        return NextResponse.json({ message: 'subject deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting subject', details: error }, { status: 500 });
    }
}
