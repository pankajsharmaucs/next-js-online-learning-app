import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export const validateSuperAdmin = async (req: NextRequest): Promise<boolean> => {
    const token = req.cookies.get('adminToken')?.value;

    if (!token) {
        return false;
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, JWT_SECRET) as { role: string };

        // Check if the role is super_admin
        return decoded.role === 'super_admin';
    } catch (error) {
        console.error('JWT verification failed:', error);
        return false;
    }
};
