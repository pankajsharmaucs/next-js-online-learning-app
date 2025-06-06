import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo_db';

import SoldClass from '@/lib/models/buy/SoldClass';
import Chapter from '@/lib/models/api/Chapter';
import ChapterQuestionAnswer from '@/lib/models/api/ChapterQuestionAnswer';
import Assessment from '@/lib/models/api/Assessment';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { user_id, class_id, chapter_id } = body;

    if (!user_id || !class_id || !chapter_id) {
      return NextResponse.json(
        { error: 'user_id, class_id, and chapter_id are required' },
        { status: 400 }
      );
    }

    // ✅ Check user class access
    const sold = await SoldClass.findOne({ user_id, class_id });
    if (!sold) {
      return NextResponse.json(
        { error: 'Access denied. User has not purchased this class.' },
        { status: 403 }
      );
    }

    // ✅ Find the chapter
    const chapter = await Chapter.findOne({ _id: chapter_id, class_id });
    if (!chapter) {
      return NextResponse.json(
        { error: 'Chapter not found or does not belong to this class.' },
        { status: 404 }
      );
    }

    const questionAnswers = await ChapterQuestionAnswer.find({ chapterId: chapter_id });
    const assessment = await Assessment.findOne({ chapterId: chapter_id });

    // ✅ Return all data
    return NextResponse.json(
      {
        message: 'Access granted.',
        chapter,
        questionAnswers,
        assessment,
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    );
  }
}
