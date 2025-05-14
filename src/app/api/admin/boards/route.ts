import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import EducationBoardModel from '@/lib/models/master/EducationBoard'; // Import the Mongoose model
import { validateSuperAdmin } from '@/lib/apiValidator';

// GET: Fetch all education boards
export async function GET(req: NextRequest) {
    try {
        const boards = await EducationBoardModel.find({ is_visible: true }); // MongoDB query to find visible boards
        return NextResponse.json(boards);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data', details: error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { board_name, image } = await req.json();

        // Check if board already exists
        const existingBoard = await EducationBoardModel.findOne({ board_name });
        if (existingBoard) {
            return NextResponse.json({ error: 'Board Already Exist' }, { status: 409 });
        }

        // Create a new education board
        const newBoard = new EducationBoardModel({
            board_name,
            image,
        });

        await newBoard.save(); // Save the new board to MongoDB
        return NextResponse.json({ message: 'Board added', id: newBoard._id });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding board', details: error }, { status: 500 });
    }
}

// PUT: Update a board
export async function PUT(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { _id, board_name, image, linkTo } = await req.json();

        if (!_id) {
            return NextResponse.json({ error: 'board_id is required' }, { status: 400 });
        }

        // Find the existing board by ID
        const existingBoard = await EducationBoardModel.findById(_id);
        if (!existingBoard) {
            return NextResponse.json({ error: 'Board not found' }, { status: 404 });
        }

        // Update the board with the provided data, using existing values if missing
        existingBoard.board_name = board_name?.trim() || existingBoard.board_name;
        existingBoard.image = image?.trim() || existingBoard.image;
        existingBoard.linkTo = linkTo?.trim() || existingBoard.linkTo;

        await existingBoard.save(); // Save the updated board to MongoDB
        return NextResponse.json({ message: 'Board updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating board', details: error }, { status: 500 });
    }
}

// DELETE: Delete a board
export async function DELETE(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await req.json();

        const board = await EducationBoardModel.findById(id);
        if (!board) {
            return NextResponse.json({ error: 'Board not found' }, { status: 404 });
        }

        // Set the board's visibility to false
        board.is_visible = false;
        await board.save(); // Save the changes to MongoDB

        return NextResponse.json({ message: 'Board has Disabled' });
    } catch (error) {
        return NextResponse.json({ error: 'Error disabling board', details: error }, { status: 500 });
    }
}