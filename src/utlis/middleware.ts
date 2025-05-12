import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Use cookies from Next.js server
import jwt from 'jsonwebtoken';

export async function middleware(request: Request) {
  // Await the cookies promise to get the actual cookie store
  const cookieStore = await cookies();

  // Get the token from cookies
  const token = cookieStore.get('adminToken')?.value;

  // Ensure that JWT_SECRET is set in the environment
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // If no token is found in cookies, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    // Verify the JWT token
    jwt.verify(token, jwtSecret);

    // If the token is valid, continue to the requested route
    return NextResponse.next();
  } catch (error) {
    // If the token is invalid or expired, redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

// Apply middleware to all routes under /admin
export const config = {
    matcher: ['/admin/:path*', '!/admin/login'],  // Protect all but the login page
};
