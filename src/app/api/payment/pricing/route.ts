import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo_db';
import Price from '@/lib/models/api/Pricing';
import mongoose from 'mongoose';

interface PricingDocument {
  subject_price: string;
  class_price: string;
  monthly_price: string;
  yearly_price: string;
}

export async function GET(req: NextRequest) {
  await connectDB();

  const type = req.nextUrl.searchParams.get('type');

  const typeToFieldMap = {
    subject: 'subject_price',
    class: 'class_price',
    monthly: 'monthly_price',
    yearly: 'yearly_price',
  } as const;

  if (type && !typeToFieldMap[type as keyof typeof typeToFieldMap]) {
    return NextResponse.json({ error: 'Invalid type. Use subject, class, monthly, or yearly.' }, { status: 400 });
  }

  try {
    const pricingData = await Price.findOne().lean<PricingDocument>();

    if (!pricingData) {
      return NextResponse.json({ error: 'Pricing data not found' }, { status: 404 });
    }

    if (type) {
      const field = typeToFieldMap[type as keyof typeof typeToFieldMap];
      return NextResponse.json({ price: pricingData[field] });
    }

    return NextResponse.json({ price: pricingData });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const newPrice = await Price.create({
      _id: new mongoose.Types.ObjectId('6854df80ceefb1a229e7c649'),
      subject_price: '49',
      class_price: '299',
      monthly_price: '599',
      yearly_price: '999'
    });

    return NextResponse.json({ message: 'Pricing inserted successfully', price: newPrice });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Document already exists with this _id' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Failed to insert pricing', detail: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();

    const updated = await Price.findOneAndUpdate(
      {}, // since there's only one doc
      {
        ...(body.subject_price && { subject_price: body.subject_price }),
        ...(body.class_price && { class_price: body.class_price }),
        ...(body.monthly_price && { monthly_price: body.monthly_price }),
        ...(body.yearly_price && { yearly_price: body.yearly_price }),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'No pricing document found to update' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Pricing updated successfully', price: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update pricing', detail: error.message }, { status: 500 });
  }
}
