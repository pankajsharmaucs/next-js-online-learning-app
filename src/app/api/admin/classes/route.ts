import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import { validateSuperAdmin } from '@/lib/apiValidator';

import Class from '@/lib/models/api/Class';
import subject from '@/lib/models/api/subject';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const board_id = req.nextUrl.searchParams.get('board_id');
    const filter = board_id ? { board_id } : {};

    const classes = await Class.find(filter);
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching data', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { class_name, board_id } = await req.json();
        await connectDB();

        // ✅ Check for duplicate class
        const existingClass = await Class.findOne({
            board_id,
            class_name: { $regex: `^${class_name}$`, $options: 'i' }, // case-insensitive
        });

        if (existingClass) {
            return NextResponse.json(
                { error: 'Class name already exists under this board' },
                { status: 409 } // Conflict
            );
        }

        const newClass = await Class.create({ class_name, board_id });
        return NextResponse.json({ message: 'Class added', id: newClass._id });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding class', details: error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { _id, class_name } = await req.json();
        if (!_id) return NextResponse.json({ error: 'class_id is required' }, { status: 400 });

        await connectDB();

        const updated = await Class.findByIdAndUpdate(_id, { class_name }, { new: true });

        if (!updated) {
            return NextResponse.json({ error: 'Class not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Class updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating class', details: error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await req.json();
        await connectDB();

        // Check for existing subjects linked to this class
        const relatedSubjects = await subject.findOne({ class_id: id });
        if (relatedSubjects) {
            return NextResponse.json(
                { error: 'Cannot delete class. There are subjects associated with this class.' },
                { status: 400 }
            );
        }

        await Class.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Class deleted' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error deleting class', details: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}
