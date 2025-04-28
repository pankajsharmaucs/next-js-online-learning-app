import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';  // To access cookies in Next.js
import { connectDB } from '@/lib/db';  // Ensure your database connection is set up

export async function POST() {
  try {
    // Get the cookies from the request
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('adminToken');
    const adminEmail = cookieStore.get('adminEmail');

    // Check if the adminToken or adminEmail cookies exist
    if (!adminToken || !adminEmail) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Connect to the database
    const db = await connectDB();

    // Query the database to validate the token and email
    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE token = ? AND email = ? AND role = ?',
      [adminToken.value, adminEmail.value, 'super_admin']
    );

    // If no valid user is found, respond with an error
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired token/email' }, { status: 401 });
    }

    const userId = rows[0].id; // Assuming `id` is the primary key for the user in your database

    // Update the user token in the database (null or invalid token)
    await db.query(
      'UPDATE users SET token = ? WHERE user_id = ?',
      [null, userId]  // Setting the token to null or you could use an invalid value
    );

    // Clear the authentication cookies
    cookieStore.delete('adminToken');
    cookieStore.delete('adminEmail');

    // Respond with a success message
    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error in /admin/logout route:', error);
    return NextResponse.json({ error: 'Server error', details: error }, { status: 500 });
  }
}
