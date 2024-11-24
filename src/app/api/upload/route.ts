import { NextRequest, NextResponse } from 'next/server';
import { getAkashClient } from '@/lib/akash';
import { scales } from '@/data/scales';
import { types } from 'cassandra-driver';
import { storeImageData, storeAnalysisResult, ImageData, AnalysisResult } from '@/lib/datastax';

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

      // For now, we'll use mock scales. In the future, this would be replaced with actual AI analysis.
      const analysisResult: AnalysisResult = {
        id: types.Uuid.random(),
        imageId: imageId,
        scales: scales.map(scale => ({
          title: scale.title,
          description: scale.description,
          rating: parseInt(scale.rating.split('/')[0]),
          explanation: scale.explanation,
        })),
        createdAt: new Date(),
      };
      await storeAnalysisResult(analysisResult);

      return NextResponse.json({
        success: true,
        imageUrl,
        imageId: imageId.toString(),
        scales: analysisResult.scales,
      });
    } catch (error) {
      console.error('Error:', error);
      // Fall back to default scales if there's an error
      return NextResponse.json({
        success: true,
        imageUrl: null,
        scales: scales,
        message: "An error occurred. Using default analysis.",
      });
    }

  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { error: 'Failed to process image upload' },
      { status: 500 }
    );
  }
}














