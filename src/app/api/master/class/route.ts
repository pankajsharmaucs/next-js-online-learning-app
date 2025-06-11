import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import ClassMaster from '@/lib/models/master/ClassMaster';
import { connectDB } from '@/lib/mongo_db';

// GET: Fetch all classes
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const classes = await ClassMaster.find().lean();
    return NextResponse.json(classes);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching data', details: error.message }, { status: 500 });
  }
}

// POST: Add a new class
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { class_name } = await req.json();

    if (!class_name || typeof class_name !== 'string') {
      return NextResponse.json({ error: 'Class name is required' }, { status: 400 });
    }

    const formattedName = class_name.trim().toLowerCase();

    const existing = await ClassMaster.findOne({ class_name: { $regex: new RegExp(`^${formattedName}$`, 'i') } });
    if (existing) {
      return NextResponse.json({ error: 'Class already exists' }, { status: 409 });
    }

    const newClass = new ClassMaster({ class_name: formattedName });
    await newClass.save();

    return NextResponse.json({ message: 'Class added', id: newClass._id });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error adding class', details: error.message }, { status: 500 });
  }
}

// PUT: Update a class
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { _id, class_name } = await req.json();

    if (!_id || !class_name || typeof class_name !== 'string') {
      return NextResponse.json({ error: 'ID and class name required' }, { status: 400 });
    }

    const formattedName = class_name.trim().toLowerCase();

    const duplicate = await ClassMaster.findOne({
      class_name: { $regex: new RegExp(`^${formattedName}$`, 'i') },
      _id: { $ne: _id },
    });
    if (duplicate) {
      return NextResponse.json({ error: 'Class name already exists' }, { status: 409 });
    }

    const cls = await ClassMaster.findById(_id);
    if (!cls) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    cls.class_name = formattedName;
    await cls.save();

    return NextResponse.json({ message: 'Class updated' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error updating class', details: error.message }, { status: 500 });
  }
}

// DELETE: Delete a class
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Class ID is required' }, { status: 400 });
    }

    await ClassMaster.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Class deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error deleting class', details: error.message }, { status: 500 });
  }
}
