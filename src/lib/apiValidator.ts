import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

export const validateSuperAdmin = async (req: NextRequest): Promise<boolean> => {
    const token = req.cookies.get('adminToken')?.value;
    const email = req.cookies.get('adminEmail')?.value;
    const role = req.cookies.get('adminRole')?.value;

    if (!token || !email || !role) {
        return false;
    }

    try {
        const db = await connectDB();
        const [rows]: any = await db.query(
            'SELECT * FROM users WHERE email = ? AND token = ? AND role = ? LIMIT 1',
            [email, token, role]
        );

        return rows.length > 0;
    } catch (error) {
        return false;
    }
};
