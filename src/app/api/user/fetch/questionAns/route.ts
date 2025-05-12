import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import QuestionAnswer from '@/lib/models/buy/QuestionAnswer';  // MongoDB model for questions_answers

// GET: Fetch all questions by chapter_id
export async function GET(req: NextRequest) {
  try {
    const chapter_id = req.nextUrl.searchParams.get('chapter_id');

    if (!chapter_id) {
      return NextResponse.json({ error: 'chapter_id is required' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectDB();

    // Fetch questions for the given chapter_id
    const questionsAnswers = await QuestionAnswer.find({ chapter_id });

    if (questionsAnswers.length === 0) {
      return NextResponse.json({ message: 'No questions found for this chapter' }, { status: 404 });
    }

    return NextResponse.json(questionsAnswers, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data', details: error }, { status: 500 });
  }
}
