import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';  // Use cookies from Next.js server
import { connectDB } from '@/lib/db';  // Make sure you have the database connection helper

export async function GET() {
  try {
    // Await the promise returned by cookies() to get the cookies
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('adminToken');
    const adminEmail = cookieStore.get('adminEmail');

    // Check if the adminToken or adminEmail cookie exists
    if (!adminToken || !adminEmail) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Connect to the database
    const db = await connectDB();

    // Query the database for the user with the provided token and email
    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE token = ? AND email = ? AND role = ?',[adminToken.value, adminEmail.value,'super_admin']
    );

    // Check if the user exists and if the token and email match
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired token/email' }, { status: 401 });
    }

    const admin = rows[0];

    // You could optionally check for other properties, like roles, if needed
    return NextResponse.json({ message: 'Authenticated', email: admin.email }, { status: 200 });

  } catch (error) {
    console.error('Error in /admin/check route:', error);
    return NextResponse.json({ error: 'Server error', details: error }, { status: 500 });
  }
}
