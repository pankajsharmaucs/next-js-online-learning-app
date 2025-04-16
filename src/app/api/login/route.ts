import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';

type User = {
  id: number;
  username: string;
  password: string;
  role: string;
};

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "jwt_token"
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       403:
 *         description: Access restricted to Superadmin only
 *       500:
 *         description: Server error
 */
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const db = await connectDB();

    const [rows] = await db.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE username = ?', [username]
    );

    if (rows.length === 0) {
      return NextResponse.json({ msg: 'User not found' }, { status: 404 });
    }

    const user = rows[0] as User;
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ msg: 'Invalid credentials' }, { status: 401 });
    }

    if (user.role !== 'superadmin') {
      return NextResponse.json({ msg: 'Access restricted to Superadmin only' }, { status: 403 });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    return NextResponse.json({ msg: 'Login successful', token });
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json({ msg: 'Server error', error: error.message }, { status: 500 });
  }
}
