import { NextResponse } from 'next/server';
import { performInference } from '@/lib/groq';

export const runtime = 'edge';

export async function POST(request: Request) {
  const { image } = await request.json();

  if (!image) {
    return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
  }

  try {
    const inferenceResult = await performInference(image);
    return NextResponse.json(inferenceResult);
  } catch (error) {
    console.error('Error during inference:', error);
    return NextResponse.json({ error: 'Failed to perform inference' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Inference API is running' });
}
