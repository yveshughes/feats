import { NextRequest, NextResponse } from 'next/server';
import { getAkashClient } from '@/lib/akash';
import { types } from 'cassandra-driver';
import { storeImageData, storeAnalysisResult, ImageData, AnalysisResult as DatastaxAnalysisResult } from '@/lib/datastax';
import { analyzeImage, AnalysisResult as GroqAnalysisResult } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as Blob;
    const wallet = request.headers.get('x-akash-wallet');

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    if (!wallet) {
      return NextResponse.json(
        { error: 'Please connect your Akash wallet first' },
        { status: 401 }
      );
    }

    // Convert blob to buffer
    const buffer = Buffer.from(await image.arrayBuffer());

    try {
      // Get Akash client and upload image
      const client = await getAkashClient();
      const imageUrl = await client.uploadImage(buffer);

      // Store image data in Datastax
      const imageId = types.Uuid.random();
      const imageData: ImageData = {
        id: imageId,
        userId: wallet,
        imageUrl: imageUrl,
        createdAt: new Date(),
      };
      await storeImageData(imageData);

      // Analyze image using Groq
      const analysisResult: GroqAnalysisResult = await analyzeImage(imageUrl);

      // Store analysis result in Datastax
      const result: DatastaxAnalysisResult = {
        id: types.Uuid.random(),
        imageId: imageId,
        scales: analysisResult.scales,
        createdAt: new Date(),
      };
      await storeAnalysisResult(result);

      return NextResponse.json({
        success: true,
        imageUrl,
        imageId: imageId.toString(),
        scales: result.scales,
      });
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json(
        { error: 'Failed to process and analyze image' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { error: 'Failed to process image upload' },
      { status: 500 }
    );
  }
}



















