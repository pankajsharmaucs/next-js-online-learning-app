import { connectToDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM classes');
    await connection.end();

    return NextResponse.json({ classes: rows });
  } catch (error: any) {
    // console.error('Database error:', error);
    // return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    console.error('Database error:', error);

    // ✅ Return dummy data on DB error
    const dummyData = [
      { class_id: 11, class_name: '7th', board_id: '33' },
      { class_id: 22, class_name: '12th', board_id: '44' },
    ];

    return NextResponse.json({
      message: 'Database connection failed. Returning dummy data.',
      classes: dummyData,
    });
  }
}
