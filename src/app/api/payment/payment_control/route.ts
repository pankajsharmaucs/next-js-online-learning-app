// /app/api/payment_control/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongo_db';

import SoldClass from '@/lib/models/buy/SoldClass'

export async function POST(req: NextRequest) {
    await connectDB()
    const { razorpay_payment_id, class_id, user_id } = await req.json()

    if (!razorpay_payment_id || !class_id || !user_id) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    await SoldClass.create({
        razorpay_payment_id,
        class_id,
        user_id,
        purchased_at: new Date(),
    })

    return NextResponse.json({ success: true })
}
