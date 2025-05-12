import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import { validateSuperAdmin } from '@/lib/apiValidator';
import PricingPlan from '@/lib/models/master/pricing'; // Mongoose model

// GET: Fetch all pricing plans
export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const plans = await PricingPlan.find();
        return NextResponse.json(plans);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data', details: error }, { status: 500 });
    }
}

// POST: Add a new pricing plan
export async function POST(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { plan_name, price, duration } = await req.json();
        await connectDB();

        const newPlan = await PricingPlan.create({ plan_name, price, duration });
        return NextResponse.json({ message: 'Pricing plan added', insertId: newPlan._id });
    } catch (error: any) {
        return NextResponse.json({ error: 'Error adding pricing plan', details: error.message }, { status: 500 });
    }
}

// PUT: Update a pricing plan
export async function PUT(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { pricing_id, plan_name, price, duration } = await req.json();
        await connectDB();

        const plan = await PricingPlan.findById(pricing_id);
        if (!plan) {
            return NextResponse.json({ error: 'Pricing plan not found' }, { status: 404 });
        }

        plan.plan_name = typeof plan_name === 'string' ? plan_name.trim() : plan.plan_name;
        plan.price = price ?? plan.price;
        plan.duration = duration ?? plan.duration;

        await plan.save();

        return NextResponse.json({ message: 'Pricing plan updated' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Error updating pricing plan', details: error.message }, { status: 500 });
    }
}

// DELETE: Delete a pricing plan
export async function DELETE(req: NextRequest) {
    try {
        if (!(await validateSuperAdmin(req))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { pricing_id } = await req.json();
        await connectDB();

        await PricingPlan.findByIdAndDelete(pricing_id);
        return NextResponse.json({ message: 'Pricing plan deleted' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Error deleting pricing plan', details: error.message }, { status: 500 });
    }
}
