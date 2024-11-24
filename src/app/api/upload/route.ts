import { NextRequest, NextResponse } from 'next/server';
import { getAkashClient } from '@/lib/akash';
import { scales } from '@/data/scales';

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
      // Get Akash client
      const client = await getAkashClient();
      const imageUrl = await client.uploadImage(buffer);

      return NextResponse.json({
        success: true,
        imageUrl,
        scales: scales
      });
    } catch (akashError) {
      console.error('Akash error:', akashError);
      // Fall back to default scales if Akash upload fails
      return NextResponse.json({
        success: true,
        imageUrl: null,
        scales: scales,
        message: "Unable to upload to Akash Network. Using default analysis."
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






