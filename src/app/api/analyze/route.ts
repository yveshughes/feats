import { NextResponse } from 'next/server';
import { handleUpload, preprocess } from '@/lib/image-processing';
import { runInference } from '@/lib/groq';
import { saveAnalysis } from '@/lib/datastax';
import type { AnalysisResult, Scale } from '@/types/analysis';

export const maxDuration = 300;
export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    if (!image.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image must be less than 5MB' },
        { status: 400 }
      );
    }

    const processedImage = await preprocess(image);
    const imageUrl = await handleUpload(processedImage);
    const inferenceResult = await runInference(imageUrl);

    const analysisResult: AnalysisResult = {
      timestamp: new Date().toISOString(),
      imageUrl,
      scales: inferenceResult.scales.map((scale: Scale) => ({
        title: scale.title,
        rating: scale.rating,
        description: scale.description,
        explanation: scale.explanation
      })),
      metadata: {
        processingTime: inferenceResult.processingTime,
        modelVersion: inferenceResult.modelVersion,
      }
    };

    await saveAnalysis(analysisResult);
    return NextResponse.json(analysisResult);

  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Error processing image analysis' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}