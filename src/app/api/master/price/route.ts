import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { validateSuperAdmin } from '@/lib/apiValidator';

// GET: Fetch all education boards
export async function GET(req: NextRequest) {
    try {
        const db = await connectDB();
        const [rows] = await db.query('SELECT * FROM pricing_master');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data', details: error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { plan_name, price, duration } = await req.json();
        const db = await connectDB();

        const [result]: any = await db.query(
            'INSERT INTO pricing_master (plan_name, price, duration) VALUES (?, ?, ?)',
            [plan_name, price, duration]
        );

        return NextResponse.json({ message: 'Pricing plan added', insertId: result.insertId });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error adding pricing plan', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { pricing_id, plan_name, price, duration } = await req.json();
        const db = await connectDB();

        // Fetch the existing record
        const [existingRows]: any = await db.query('SELECT * FROM pricing_master WHERE pricing_id = ?', [pricing_id]);

        if (existingRows.length === 0) {
            return NextResponse.json({ error: 'class not found' }, { status: 404 });
        }

        const existing = existingRows[0];
        const updatedplan_name = typeof plan_name === 'string' ? plan_name.trim() : existing.plan_name;
        const updatedprice = typeof price === 'string' ? price.trim() : existing.price;
        const updatedduration = typeof duration === 'string' ? duration.trim() : existing.duration;

        await db.query(
            'UPDATE pricing_master SET plan_name = ?, price = ?, duration = ? WHERE pricing_id = ?',
            [updatedplan_name, updatedprice, updatedduration, pricing_id]
        );

        return NextResponse.json({ message: 'Pricing plan updated' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error updating pricing plan', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {

        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { pricing_id } = await req.json();
        const db = await connectDB();

        await db.query('DELETE FROM pricing_master WHERE pricing_id = ?', [pricing_id]);

        return NextResponse.json({ message: 'Pricing plan deleted' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Error deleting pricing plan', details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}
