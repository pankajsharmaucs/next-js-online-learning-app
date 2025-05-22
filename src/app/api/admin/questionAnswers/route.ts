import { NextRequest, NextResponse } from 'next/server';
import { validateSuperAdmin } from '@/lib/apiValidator';
import ChapterQuestionAnswerModel from '@/lib/models/api/ChapterQuestionAnswer';

// GET: Fetch questions by chapterId
export async function GET(req: NextRequest) {
    try {
        const chapterId = req.nextUrl.searchParams.get('chapterId');

        if (!chapterId) {
            return NextResponse.json({ error: 'chapterId is required' }, { status: 400 });
        }

        const questions = await ChapterQuestionAnswerModel.find({ chapterId });

        const response = questions.map((q) => ({
            _id: q._id,
            chapterId: q.chapterId,
            pageRef: q.pageRef ?? null,
            question: q.question,
            answers: Array.isArray(q.answers) ? q.answers : [],
        }));

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching questions', details: `${error}` }, { status: 500 });
    }
}

// POST: Create a new question
export async function POST(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { chapterId, pageRef, question, answers } = body;

        if (!chapterId || !pageRef || !question || !Array.isArray(answers)) {
            return NextResponse.json({ error: 'Invalid or missing fields' }, { status: 400 });
        }

        const newQuestion = new ChapterQuestionAnswerModel({
            chapterId,
            pageRef,
            question,
            answers,
        });

        await newQuestion.save();

        return NextResponse.json({ message: 'Question created', id: newQuestion._id }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating question', details: `${error}` }, { status: 500 });
    }
}

// PUT: Update existing question
export async function PUT(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { _id, chapterId, pageRef, question, answers } = body;

        if (!_id || !chapterId || !pageRef || !question || !Array.isArray(answers)) {
            return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
        }

        const updated = await ChapterQuestionAnswerModel.findByIdAndUpdate(
            _id,
            { chapterId, pageRef, question, answers },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Question updated', id: updated._id });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating question', details: `${error}` }, { status: 500 });
    }
}

// DELETE: Delete question by _id
export async function DELETE(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const id = req.nextUrl.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'id is required' }, { status: 400 });
        }

        const deleted = await ChapterQuestionAnswerModel.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Question deleted', id: deleted._id });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting question', details: `${error}` }, { status: 500 });
    }
}
