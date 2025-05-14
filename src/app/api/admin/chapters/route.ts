import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import ChapterModel from '@/lib/models/api/Chapter';
import { validateSuperAdmin } from '@/lib/apiValidator';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

// GET
export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const subject_id = searchParams.get('subject_id');
        const class_id = searchParams.get('class_id');

        if (!subject_id || !class_id) {
            return NextResponse.json(
                { error: 'subject_id and class_id are required' },
                { status: 400 }
            );
        }

        const chapters = await ChapterModel.find({
            subject_id,
            class_id,
        });

        return NextResponse.json(chapters);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching chapters', details: error },
            { status: 500 }
        );
    }
}

// POST
// POST: Add a new chapter with file
export async function POST(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();

        const subject_id = formData.get('subject_id')?.toString() || '';
        const class_id = formData.get('class_id')?.toString() || '';
        const chapter_name = formData.get('chapter_name')?.toString() || '';
        const summary = formData.get('summary')?.toString() || '';
        const video_url = formData.get('video_url')?.toString() || '';
        const pdfFile = formData.get('pdf') as File | null;

        if (!subject_id || !class_id || !chapter_name) {
            return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
        }

        // Step 1: Create Chapter (without PDF path)
        const newChapter = new ChapterModel({
            subject_id,
            class_id,
            chapter_name,
            summary,
            video_url,
            pdf: '', // placeholder
        });

        await newChapter.save(); // Now we have newChapter._id

        let pdfPath = '';

        // Step 2: Upload the PDF if available
        if (pdfFile && pdfFile.size > 0) {
            const buffer = Buffer.from(await pdfFile.arrayBuffer());
            const fileName = `${pdfFile.name}`;
            const uploadDir = path.join(process.cwd(), 'public/uploads/pdfs', newChapter._id.toString());

            // Ensure directory exists
            await mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, fileName);
            await writeFile(filePath, buffer);

            // Relative path to store in DB
            pdfPath = `/uploads/pdfs/${newChapter._id}/${fileName}`;

            // Step 3: Update chapter with PDF path
            newChapter.pdf = pdfPath;
            await newChapter.save();
        }

        return NextResponse.json({ message: 'Chapter added', id: newChapter._id });
    } catch (error) {
        console.error('Error adding chapter:', error);
        return NextResponse.json({ error: 'Error adding chapter', details: error }, { status: 500 });
    }
}

// PUT
export async function PUT(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const _id = formData.get('_id')?.toString();
        const chapter_name = formData.get('chapter_name')?.toString();
        const summary = formData.get('summary')?.toString();
        const video_url = formData.get('video_url')?.toString();
        const pdfFile = formData.get('pdf') as File | null;

        if (!_id) return NextResponse.json({ error: 'chapter_id is required' }, { status: 400 });

        const chapter = await ChapterModel.findById(_id);
        if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });

        if (chapter_name) chapter.chapter_name = chapter_name;
        if (summary) chapter.summary = summary;
        if (video_url) chapter.video_url = video_url;

        if (pdfFile && pdfFile.size > 0) {
            const buffer = Buffer.from(await pdfFile.arrayBuffer());
            const fileName = `${pdfFile.name}`;
            const filePath = path.join(process.cwd(), 'public/uploads/pdfs', fileName);
            await writeFile(filePath, buffer);
            chapter.pdf = `/uploads/pdfs/${fileName}`;
        }

        await chapter.save();
        return NextResponse.json({ message: 'Chapter updated successfully' });
    } catch (error) {
        console.error('PUT error:', error);
        return NextResponse.json({ error: 'Error updating chapter', details: error }, { status: 500 });
    }
}

// DELETE
export async function DELETE(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { _id } = await req.json();

        const chapter = await ChapterModel.findById(_id);
        if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });

        chapter.is_visible = false;
        await chapter.save();

        return NextResponse.json({ message: 'Chapter disabled' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting chapter', details: error }, { status: 500 });
    }
}
