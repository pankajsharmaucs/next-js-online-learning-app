import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import { validateSuperAdmin } from '@/lib/apiValidator';
import Subject from '@/lib/models/api/subject';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

// POST: Add subject with image
export async function POST(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const class_id = formData.get('class_id')?.toString() || '';
        const subject_name = formData.get('subject_name')?.toString() || '';
        const overview = formData.get('overview')?.toString() || '';
        const file = formData.get('image') as File | null;

        if (!class_id || !subject_name || !overview) {
            return NextResponse.json({ error: 'class_id, subject_name, and overview are required' }, { status: 400 });
        }

        await connectDB();

        const existingSubject = await Subject.findOne({
            class_id,
            subject_name: { $regex: `^${subject_name}$`, $options: 'i' },
        });

        if (existingSubject) {
            return NextResponse.json({ error: 'Subject already exists' }, { status: 409 });
        }

        const newSubject = await Subject.create({
            class_id,
            subject_name,
            overview,
            image: '',
        });

        let imagePath = '';

        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const ext = path.extname(file.name) || '.jpg';
            const dir = path.join(process.cwd(), 'public', 'uploads', 'subjects', newSubject._id.toString());
            await mkdir(dir, { recursive: true });

            const filePath = path.join(dir, `image${ext}`);
            await writeFile(filePath, buffer);

            imagePath = `/uploads/subjects/${newSubject._id}/image${ext}`;
            newSubject.image = imagePath;
            await newSubject.save();
        }

        return NextResponse.json({ message: 'Subject added', id: newSubject._id, image: imagePath });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding subject', details: error }, { status: 500 });
    }
}

// PUT: Update subject and optionally replace image
export async function PUT(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const _id = formData.get('_id')?.toString();
        const class_id = formData.get('class_id')?.toString();
        const subject_name = formData.get('subject_name')?.toString();
        const overview = formData.get('overview')?.toString();
        const file = formData.get('image') as File | null;

        if (!_id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await connectDB();

        const subject = await Subject.findById(_id);
        if (!subject) {
            return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
        }

        if (subject_name) subject.subject_name = subject_name;
        if (overview) subject.overview = overview;

        const existingSubject = await Subject.findOne({
            class_id: class_id,
            subject_name: { $regex: `^${subject_name}$`, $options: 'i' },
            _id: { $ne: _id },
        });

        if (existingSubject) {
            return NextResponse.json({ error: 'Subject Name Already in use' }, { status: 409 });
        }

        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const ext = path.extname(file.name) || '.jpg';
            const dir = path.join(process.cwd(), 'public', 'uploads', 'subjects', _id);
            await mkdir(dir, { recursive: true });

            const filePath = path.join(dir, `image${ext}`);
            await writeFile(filePath, buffer);

            subject.image = `/uploads/subjects/${_id}/image${ext}`;
        }

        await subject.save();

        return NextResponse.json({ message: 'Subject updated successfully', image: subject.image });
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

        return NextResponse.json({ message: 'Subject deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting subject', details: error }, { status: 500 });
    }
}
