import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import UserAssessment from '@/lib/models/api/UserAssessment';
import mongoose from 'mongoose';

// POST - Save assessment
export async function POST(req: Request) {
  await connectDB();
  try {

    const { user_id, chapter_id, assessment_id, questions, score } = await req.json();

    if (!user_id || !chapter_id || !assessment_id || !Array.isArray(questions) || score === undefined) {
      console.log('Validation failed');
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const exists = await UserAssessment.findOne({ user_id, chapter_id, assessment_id });

    if (exists) {
      console.log('Duplicate submission');
      return NextResponse.json(
        { success: false, error: 'Assessment already submitted' },
        { status: 400 }
      );
    }

    const saved = await UserAssessment.create({
      user_id,
      chapter_id,
      assessment_id,
      questions,
      score: parseInt(score, 10), // cast just in case
    });

    console.log('Saved:', saved);
    return NextResponse.json({ success: true, data: saved });

  } catch (error) {
    console.error('POST /userAssessment error:', error);

    // 👇 Type narrowing here
    if (error instanceof mongoose.Error.ValidationError) {
      console.error('Mongoose Validation Error:');
      for (const field in error.errors) {
        console.error(`${field}:`, error.errors[field].message);
      }
    } else {
      console.error('Unexpected error:', error);
    }


    return NextResponse.json(
      { success: false, error: 'Failed to save assessment' },
      { status: 500 }
    );
  }
}


// GET - Check if already submitted
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');
  const chapter_id = searchParams.get('chapter_id');
  const assessment_id = searchParams.get('assessment_id');

  if (!user_id || !chapter_id || !assessment_id) {
    return NextResponse.json(
      { success: false, error: 'Missing query parameters' },
      { status: 400 }
    );
  }

  try {
    const result = await UserAssessment.findOne({ user_id, chapter_id, assessment_id });

    if (result) {
      return NextResponse.json({ success: true, submitted: true, data: result });
    } else {
      return NextResponse.json({ success: true, submitted: false });
    }
  } catch (error) {
    console.error('GET /userAssessment error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch assessment' },
      { status: 500 }
    );
  }
}
