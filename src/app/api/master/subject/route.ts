import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import SubjectMaster from '@/lib/models/master/subjectMaster'; // Updated model import
import { validateSuperAdmin } from '@/lib/apiValidator';
import { connectDB } from '@/lib/mongo_db';

// GET: Fetch all subjects
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const subjects = await SubjectMaster.find().lean();
    return NextResponse.json(subjects);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching data', details: error.message }, { status: 500 });
  }
}

// POST: Add a new subject
export async function POST(req: NextRequest) {
  try {
    if (!(await validateSuperAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { subject_name } = await req.json();

    if (!subject_name) {
      return NextResponse.json({ error: 'Subject name is required' }, { status: 400 });
    }

    const newSubject = new SubjectMaster({ subject_name });
    await newSubject.save();

    return NextResponse.json({ message: 'Subject added', id: newSubject._id });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error adding subject', details: error.message }, { status: 500 });
  }
}

// PUT: Update a subject
export async function PUT(req: NextRequest) {
  try {
    if (!(await validateSuperAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { _id, subject_name } = await req.json();

    if (!_id) {
      return NextResponse.json({ error: 'Subject ID is required' }, { status: 400 });
    }

    const existing = await SubjectMaster.findById(_id);

    if (!existing) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }

    existing.subject_name = subject_name?.trim() || existing.subject_name;
    await existing.save();

    return NextResponse.json({ message: 'Subject updated' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error updating subject', details: error.message }, { status: 500 });
  }
}

// DELETE: Delete a subject
export async function DELETE(req: NextRequest) {
  try {
    if (!(await validateSuperAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Subject ID is required' }, { status: 400 });
    }

    await SubjectMaster.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Subject deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error deleting subject', details: error.message }, { status: 500 });
  }
}
