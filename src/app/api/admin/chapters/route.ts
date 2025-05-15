import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import ChapterModel from '@/lib/models/api/Chapter';
import { validateSuperAdmin } from '@/lib/apiValidator';
import { mkdir, writeFile } from 'fs/promises';
import { rm } from 'fs/promises';
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

        const chapters = await ChapterModel.find({ subject_id, class_id });

        return NextResponse.json(chapters);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching chapters', details: error }, { status: 500 });
    }
}

// POST
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
        const introduction = formData.get('introduction')?.toString() || '';
        const moral = formData.get('moral')?.toString() || '';
        const video_url = formData.get('video_url')?.toString() || '';
        const video_access = formData.get('video_access')?.toString() || 'free';
        const assignment_access = formData.get('assignment_access')?.toString() || 'free';
        const pdfFile = formData.get('pdf') as File | null;

        if (!subject_id || !class_id || !chapter_name) {
            return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
        }

        const newChapter = new ChapterModel({
            subject_id,
            class_id,
            chapter_name,
            summary,
            introduction,
            moral,
            video_url,
            video_access,
            assignment_access,
            pdf: '', // placeholder
        });

        await newChapter.save();

        let pdfPath = '';

        if (pdfFile && pdfFile.size > 0) {
            const buffer = Buffer.from(await pdfFile.arrayBuffer());
            const fileName = `${pdfFile.name}`;
            const uploadDir = path.join(process.cwd(), 'public/uploads/pdfs', newChapter._id.toString());

            await mkdir(uploadDir, { recursive: true });
            const filePath = path.join(uploadDir, fileName);
            await writeFile(filePath, buffer);

            pdfPath = `/uploads/pdfs/${newChapter._id}/${fileName}`;
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

        if (!_id) return NextResponse.json({ error: 'chapter_id is required' }, { status: 400 });

        const chapter = await ChapterModel.findById(_id);
        if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });

        // Fields to update
        const chapter_name = formData.get('chapter_name')?.toString();
        const summary = formData.get('summary')?.toString();
        const introduction = formData.get('introduction')?.toString();
        const moral = formData.get('moral')?.toString();
        const video_url = formData.get('video_url')?.toString();
        const video_access = formData.get('video_access')?.toString();
        const assignment_access = formData.get('assignment_access')?.toString();
        const pdfFile = formData.get('pdf') as File | null;

        if (chapter_name) chapter.chapter_name = chapter_name;
        if (summary !== undefined) chapter.summary = summary;
        if (introduction !== undefined) chapter.introduction = introduction;
        if (moral !== undefined) chapter.moral = moral;
        if (video_url !== undefined) chapter.video_url = video_url;
        if (video_access !== undefined) chapter.video_access = video_access;
        if (assignment_access !== undefined) chapter.assignment_access = assignment_access;

        if (pdfFile && pdfFile.size > 0) {
            const buffer = Buffer.from(await pdfFile.arrayBuffer());
            const fileName = `${pdfFile.name}`;
            const uploadDir = path.join(process.cwd(), 'public/uploads/pdfs', _id);
            await mkdir(uploadDir, { recursive: true });
            const filePath = path.join(uploadDir, fileName);
            await writeFile(filePath, buffer);
            chapter.pdf = `/uploads/pdfs/${_id}/${fileName}`;
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
        if (!chapter) {
            return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
        }

        // Delete the folder if chapter has a PDF
        if (chapter.pdf) {
            const folderPath = path.join(process.cwd(), 'public/uploads/pdfs', chapter._id.toString());
            try {
                await rm(folderPath, { recursive: true, force: true });
                console.log(`Deleted folder: ${folderPath}`);
            } catch (err) {
                console.warn(`Failed to delete folder: ${folderPath}`, err);
            }
        }

        // Delete chapter document from DB
        await ChapterModel.findByIdAndDelete(_id);

        return NextResponse.json({ message: 'Chapter and PDF folder deleted successfully' });
    } catch (error) {
        console.error('DELETE error:', error);
        return NextResponse.json({ error: 'Error deleting chapter', details: error }, { status: 500 });
    }
}