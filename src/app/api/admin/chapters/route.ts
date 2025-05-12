import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import ChapterModel from '@/lib/models/api/Chapter'; // MongoDB model
import { validateSuperAdmin } from '@/lib/apiValidator';

// GET: Fetch all chapters by subject_id
export async function GET(req: NextRequest) {
    try {
        const subject_id = req.nextUrl.searchParams.get('subject_id');

        if (!subject_id) {
            return NextResponse.json({ error: 'subject_id is required' }, { status: 400 });
        }

        const chapters = await ChapterModel.find({ subject_id, is_visible: true });
        return NextResponse.json(chapters);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching chapters', details: error }, { status: 500 });
    }
}

// POST: Add a new chapter
export async function POST(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { subject_id, chapter_name, summary, video_url, pdf } = await req.json();

        const newChapter = new ChapterModel({
            subject_id,
            chapter_name,
            summary,
            video_url,
            pdf,
        });

        await newChapter.save();

        return NextResponse.json({ message: 'Chapter added', id: newChapter._id });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding chapter', details: error }, { status: 500 });
    }
}

// PUT: Update a chapter
export async function PUT(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { _id, chapter_name, summary, video_url, pdf } = await req.json();

        if (!_id) {
            return NextResponse.json({ error: 'chapter_id is required' }, { status: 400 });
        }

        const chapter = await ChapterModel.findById(_id);
        if (!chapter) {
            return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
        }

        chapter.chapter_name = chapter_name?.trim() || chapter.chapter_name;
        chapter.summary = summary?.trim() || chapter.summary;
        chapter.video_url = video_url?.trim() || chapter.video_url;
        chapter.pdf = pdf?.trim() || chapter.pdf;

        await chapter.save();

        return NextResponse.json({ message: 'Chapter updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating chapter', details: error }, { status: 500 });
    }
}

// DELETE: Soft-delete a chapter (mark invisible)
export async function DELETE(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { _id } = await req.json();

        const chapter = await ChapterModel.findById(_id);
        if (!chapter) {
            return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
        }

        chapter.is_visible = false;
        await chapter.save();

        return NextResponse.json({ message: 'Chapter disabled' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting chapter', details: error }, { status: 500 });
    }
}
