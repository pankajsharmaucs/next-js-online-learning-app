import { NextRequest, NextResponse } from 'next/server';
import { validateSuperAdmin } from '@/lib/apiValidator';
import AssessmentModel from '@/lib/models/api/Assessment';


export async function GET(req: NextRequest) {
    try {
        const chapterId = req.nextUrl.searchParams.get('chapterId');

        if (!chapterId) {
            return NextResponse.json({ error: 'chapterId is required' }, { status: 400 });
        }

        const existing = await AssessmentModel.findOne({ chapterId });
        if (!existing) {
            return NextResponse.json({}, { status: 200 }); // No assessment yet
        }

        return NextResponse.json(existing);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching assessment', details: error }, { status: 500 });
    }
}

// POST: Create new assessment
export async function POST(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        const { chapterId, title, description, questions } = body;

        if (!chapterId || !title || !questions || !Array.isArray(questions)) {
            return NextResponse.json({ error: 'Required fields missing or invalid' }, { status: 400 });
        }

        // Validation: Each question must have 4 options and answer as 'a', 'b', 'c', or 'd'
        for (const q of questions) {
            if (
                !q.question ||
                !Array.isArray(q.options) ||
                q.options.length !== 4 ||
                !['a', 'b', 'c', 'd'].includes(q.answer)
            ) {
                return NextResponse.json({ error: 'Invalid question format' }, { status: 400 });
            }
        }

        const newAssessment = new AssessmentModel({
            chapterId,
            title,
            description,
            questions,
        });

        await newAssessment.save();

        return NextResponse.json({ message: 'Assessment created', id: newAssessment._id }, { status: 201 });
    } catch (error) {
        console.error('Error creating assessment:', error);
        return NextResponse.json({ error: 'Server error', details: error }, { status: 500 });
    }
}

// ======PUT ====Update==
export async function PUT(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { _id, chapterId, title, description, questions } = body;

        if (!_id || !chapterId || !title || !questions) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const updated = await AssessmentModel.findByIdAndUpdate(
            _id,
            { chapterId, title, description, questions },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Assessment updated', id: updated._id });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating assessment', details: error }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const assessmentId = req.nextUrl.searchParams.get('assessmentId');
        const questionId = req.nextUrl.searchParams.get('questionId');

        if (!assessmentId || !questionId) {
            return NextResponse.json({ error: 'Missing assessmentId or questionId' }, { status: 400 });
        }

        const updated = await AssessmentModel.findByIdAndUpdate(
            assessmentId,
            { $pull: { questions: { _id: questionId } } },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: 'Assessment not found or update failed' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Question removed successfully' });
    } catch (error) {
        console.error('Error deleting question:', error);
        return NextResponse.json({ error: 'Error deleting question', details: error }, { status: 500 });
    }
}