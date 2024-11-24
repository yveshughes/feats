'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ResultsCard } from '@/components/shared/ResultsCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ImageUpload from '@/components/ui/image-upload';
import { useToast } from "@/components/ui/use-toast";
import { scales, Scale } from '@/data/scales';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function TryItPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<Scale[]>(scales);
  const { toast } = useToast();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleImageSelect = async (imageData: string) => {
    setUploadedImage(imageData);
    setIsLoading(true);

    try {
      // Convert base64 to blob
      const base64Response = await fetch(imageData);
      const blob = await base64Response.blob();

      // Create form data
      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');

      // Send to API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setAnalysisResults(data.scales);
      
      toast({
        title: "Analysis Complete",
        description: "Your image has been analyzed successfully.",
      });

    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze image. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="hidden sm:block text-4xl font-bold text-gray-900 mb-4">
          Try It
        </h1>
        <p className="text-lg text-gray-600 mx-auto max-w-3xl mb-8">
          Add your image and it will be analyzed and scored.
        </p>

        <div className="max-w-md mx-auto mb-4 sm:mb-12">
          <ImageUpload 
            onImageSelect={handleImageSelect}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 lg:sticky lg:top-24 lg:self-start">
          <div className="relative w-full" style={{ paddingBottom: '100%' }}>
            <Image
              src={uploadedImage || "/images/treesample1.png"}
              alt={uploadedImage ? "Uploaded artwork" : "Sample artwork"}
              fill
              className="rounded-lg object-contain"
              priority={!uploadedImage}
              loading={uploadedImage ? "lazy" : undefined}
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : isMobile ? (
            <Swiper
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {analysisResults.map((scale) => (
                <SwiperSlide key={scale.title}>
                  <ResultsCard
                    title={scale.title}
                    description={scale.description}
                    rating={parseInt(scale.rating.split('/')[0])}
                    explanation={scale.explanation}
                    imageUrl={scale.imageUrl}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="space-y-6">
              {analysisResults.map((scale) => (
                <ResultsCard
                  key={scale.title}
                  title={scale.title}
                  description={scale.description}
                  rating={parseInt(scale.rating.split('/')[0])}
                  explanation={scale.explanation}
                  imageUrl={scale.imageUrl}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

