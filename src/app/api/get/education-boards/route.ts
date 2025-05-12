// src/app/api/get/education-boards/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import EducationBoard from '@/lib/models/master/EducationBoard'; // Mongoose model

export async function GET(req: NextRequest) {
  try {
    await connectDB(); // Ensures the Mongoose connection is established

    // Fetch all education boards using Mongoose
    const boards = await EducationBoard.find();

    return NextResponse.json({
      msg: 'success',
      all_cat: boards,
    });
  } catch (error: any) {
    console.error('DB Error:', error);
    return NextResponse.json(
      { msg: 'server error', error: error.message },
      { status: 500 }
    );
  }
}
