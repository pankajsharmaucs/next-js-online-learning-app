import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const { chapter_id, subject_id, user_id, token, email } = await req.json();

        if (!token || !email) {
            return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
        }

        const db = await connectDB();

        // If token and email are provided, verify both
        if (token && email) {
            const [userToken]: any = await db.query(
                'SELECT user_id FROM users WHERE email = ? AND  token = ?', [email, token]
            );

            if (userToken.length === 0) {
                return NextResponse.json({ error: 'Invalid or expired token for superadmin' }, { status: 403 });
            }
        }

        // Check if the user already exists
        const [existingRows]: any = await db.query(
            'SELECT * FROM sold_chapters WHERE chapter_id = ? and subject_id = ? and user_id = ?', [chapter_id, subject_id, user_id]
        );

        if (existingRows.length > 0) {

            const [chapterData]: any = await db.query(
                'SELECT * FROM chapters WHERE chapter_id = ?', [chapter_id]
            );

            // Get assessments for this chapter
            const [rows]: any[] = await db.query(
                `SELECT 
                    a.*, 
                    assesments_question_answer.* 
                 FROM assessments a
                 JOIN assesments_question_answer 
                   ON a.assessment_id = assesments_question_answer.assessment_id
                 WHERE a.chapter_id = ?`,
                [chapter_id]
            );

            // Group by assessment_id
            const assessmentMap: { [key: number]: any } = {};

            for (const row of rows) {
                const {
                    assessment_id,
                    chapter_id,
                    title,
                    question_answer_id,
                    question,
                    option_a,
                    option_b,
                    option_c,
                    option_d,
                    correct_option
                } = row;

                if (!assessmentMap[assessment_id]) {
                    assessmentMap[assessment_id] = {
                        assessment_id,
                        chapter_id,
                        title,
                        questions: []
                    };
                }

                assessmentMap[assessment_id].questions.push({
                    id: question_answer_id,
                    question,
                    option_b,
                    option_c,
                    option_d,
                    correct_option
                });
            }

            const assessmentData = Object.values(assessmentMap);

            return NextResponse.json(
                {
                    message: 'success',
                    chapterData: chapterData,
                    assessments: assessmentData || []
                },
                { status: 200 }
            );

        } else {
            return NextResponse.json({ message: 'New' }, { status: 404 });
        }

    } catch (error) {
        console.error('Error to get Chapter:', error);
        return NextResponse.json({ error: 'Failed to get Chapter', details: error }, { status: 500 });
    }
}
