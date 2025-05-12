import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import Class from '@/lib/models/api/Class';
import { validateSuperAdmin } from '@/lib/apiValidator';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const board_id = req.nextUrl.searchParams.get('board_id');
        const classes = await Class.find({ board_id });
        return NextResponse.json(classes);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data', details: error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { class_name, board_id } = await req.json();
        await connectDB();

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

        const { class_id, class_name } = await req.json();
        if (!class_id) return NextResponse.json({ error: 'class_id is required' }, { status: 400 });

        await connectDB();

        const updated = await Class.findByIdAndUpdate(
            class_id,
            { class_name },
            { new: true }
        );

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

        const { class_id } = await req.json();
        await connectDB();

        await Class.findByIdAndDelete(class_id);
        return NextResponse.json({ message: 'Class deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting class', details: error }, { status: 500 });
    }
}
