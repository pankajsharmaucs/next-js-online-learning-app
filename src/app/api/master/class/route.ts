import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import ClassMaster from '@/lib/models/master/ClassMaster'; // The model you created earlier
import { validateSuperAdmin } from '@/lib/apiValidator';
import { connectDB } from '@/lib/mongo_db'; // Assuming this connects MongoDB

// GET: Fetch all classes
export async function GET(req: NextRequest) {
  try {
    await connectDB(); // MongoDB connect

    const classes = await ClassMaster.find().lean();
    return NextResponse.json(classes);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching data', details: error.message }, { status: 500 });
  }
}

// POST: Add a new class
export async function POST(req: NextRequest) {
  try {
    if (!(await validateSuperAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { class_name } = await req.json();

    if (!class_name) {
      return NextResponse.json({ error: 'Class name is required' }, { status: 400 });
    }

    const newClass = new ClassMaster({ class_name });
    await newClass.save();

    return NextResponse.json({ message: 'Class added', id: newClass._id });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error adding class', details: error.message }, { status: 500 });
  }
}

// PUT: Update a class
export async function PUT(req: NextRequest) {
  try {
    if (!(await validateSuperAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { _id, class_name } = await req.json();

    if (!_id) {
      return NextResponse.json({ error: 'Class ID is required' }, { status: 400 });
    }

    const existing = await ClassMaster.findById(_id);

    if (!existing) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    existing.class_name = class_name?.trim() || existing.class_name;
    await existing.save();

    return NextResponse.json({ message: 'Class updated' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error updating class', details: error.message }, { status: 500 });
  }
}

// DELETE: Delete a class
export async function DELETE(req: NextRequest) {
  try {
    if (!(await validateSuperAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
