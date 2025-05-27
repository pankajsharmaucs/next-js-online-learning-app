import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';  // Access cookies in Next.js

export async function POST() {
  try {
    // Get the cookies from the request
    const cookieStore = cookies();
    const userToken = (await cookieStore).get('userToken');

    // If the userToken doesn't exist, return a 401 error
    if (!userToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Clear the JWT token by setting maxAge to 0 (expires immediately)
    const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

    // Delete the userToken cookie (set maxAge to 0 to expire it)
    response.cookies.set('userToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure flag in production
      sameSite: 'strict',
      maxAge: 0, // This immediately expires the cookie
      path: '/' // Ensure it matches the path where the cookie is set
    });

    return response;
  } catch (error) {
    console.error('Error in logout route:', error);
    return NextResponse.json({ error: 'Server error', details: error }, { status: 500 });
  }
}
