import { connectToDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM classes');
    await connection.end();

    return NextResponse.json({ classes: rows });
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
