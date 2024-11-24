import { NextResponse } from 'next/server';
import { performInference } from '@/lib/groq';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image URL provided' },
        { status: 400 }
      );
    }

    const result = await performInference(imageUrl);

    return NextResponse.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Inference error:', error);
    return NextResponse.json(
      { error: 'Failed to perform inference' },
      { status: 500 }
    );
  }
}

