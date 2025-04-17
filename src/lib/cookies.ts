// /lib/cookies.ts

import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

// --- Constants ---
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 60 * 60 * 24, // 1 day
};

// --- List of valid tokens ---
type TokenType = 'SUPERADMIN_TOKEN' | 'SUBADMIN_TOKEN' | 'USER_TOKEN';

// === MIDDLEWARE / APP ROUTE METHODS (NextRequest / NextResponse) ===

// Get token from request (middleware or app routes)
export const getToken = (req: NextRequest, type: TokenType): string | undefined => {
  return req.cookies.get(type)?.value;
};

// Set token in response (middleware or app routes)
export const setToken = (res: NextResponse, type: TokenType, token: string): void => {
  res.cookies.set(type, token, COOKIE_OPTIONS);
};

// Clear token in response (middleware or app routes)
export const clearToken = (res: NextResponse, type: TokenType): void => {
  res.cookies.set(type, '', { ...COOKIE_OPTIONS, maxAge: 0 });
};

// === API ROUTE METHODS (NextApiRequest / NextApiResponse) ===

// Get token from request (API route)
export const getTokenFromApi = (req: NextApiRequest, type: TokenType): string | undefined => {
  const cookies = cookie.parse(req.headers.cookie || '');
  return cookies[type];
};

// Set token in response (API route)
export const setTokenInApi = (res: NextApiResponse, type: TokenType, token: string): void => {
  res.setHeader('Set-Cookie', cookie.serialize(type, token, COOKIE_OPTIONS));
};

// Clear token in response (API route)
export const clearTokenInApi = (res: NextApiResponse, type: TokenType): void => {
  res.setHeader('Set-Cookie', cookie.serialize(type, '', { ...COOKIE_OPTIONS, maxAge: 0 }));
};
