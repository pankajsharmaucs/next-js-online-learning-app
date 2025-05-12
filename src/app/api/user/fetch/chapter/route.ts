import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import User from '@/lib/models/user/User';
import Chapter from '@/lib/models/api/Chapter';
import Assessment from '@/lib/models/api/Assessment';  // Assuming you have a Chapter and Assessment schema

export async function POST(req: NextRequest) {
  try {
    const { chapter_id, subject_id, user_id, token, email, otp } = await req.json();

    if (!token || !email || !otp) {
      return NextResponse.json({ error: 'Token, email, and OTP are required' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectDB();

    // Verify User and OTP
    const user = await User.findOne({ email, token });
    if (!user) {
      return NextResponse.json({ error: 'Invalid user or expired token' }, { status: 403 });
    }

    // Verify OTP
    if (user.otp !== Number(otp) || !user.otpExpires || user.otpExpires < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    if (!user.otpVerified) {
      return NextResponse.json({ error: 'OTP not verified' }, { status: 400 });
    }

    // Fetch chapter and assessments
    const chapterData = await Chapter.findOne({ chapter_id, subject_id });
    if (!chapterData) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    const assessments = await Assessment.aggregate([
      { $match: { chapter_id: chapter_id } },
      {
        $lookup: {
          from: 'assesments_question_answer',  // Ensure this matches your MongoDB collection name
          localField: 'assessment_id',
          foreignField: 'assessment_id',
          as: 'questions'
        }
      }
    ]);

    return NextResponse.json({
      message: 'Success',
      chapterData,
      assessments,
    }, { status: 200 });
  } catch (error) {
    console.error('Error getting chapter:', error);
    return NextResponse.json({ error: 'Failed to get chapter', details: error }, { status: 500 });
  }
}
