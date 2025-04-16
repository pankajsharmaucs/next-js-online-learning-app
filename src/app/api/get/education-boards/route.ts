// src/app/api/get/education-boards/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

type EducationBoard = {
  id: number;
  name: string;
  // Add your real columns
};

export async function GET(req: NextRequest) {
  try {
    const db = await connectDB();

    const [rows] = await db.execute<RowDataPacket[]>(
      'SELECT * FROM education_boards'
    );
    await db.end();

    return NextResponse.json({
      msg: 'success',
      all_cat: rows as EducationBoard[],
    });
  } catch (error: any) {
    console.error('DB Error:', error);
    return NextResponse.json(
      { msg: 'server error', error: error.message },
      { status: 500 }
    );
  }
}
