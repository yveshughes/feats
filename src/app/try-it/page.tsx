'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { ResultsCard } from '@/components/shared/ResultsCard';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { scales } from '@/data/scales';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function TryItPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
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
          <div className="block sm:hidden">
            <Button
              type="button"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="flex items-center justify-center w-full bg-blue-600 text-white hover:bg-blue-700 text-lg py-4 shadow-lg"
              aria-label="Capture Image"
            >
              <Camera className="mr-2 h-6 w-6" />
              Capture Image
            </Button>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="flex-grow border-2 border-blue-500 rounded-md"
            />
            <Button
              type="button"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="bg-blue-600 text-white hover:bg-blue-700 text-lg py-4 px-8 shadow-lg whitespace-nowrap"
              aria-label="Add Image"
            >
              Add Image
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-500 hidden sm:block">
            Supported formats: JPG, PNG, GIF (max 5MB)
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 lg:sticky lg:top-24 lg:self-start">
          <div className="relative w-full" style={{ paddingBottom: '100%' }}>
            <Image
              src={uploadedImage || "/images/treesample1.png"}
              alt={uploadedImage ? "Uploaded artwork" : "Sample artwork"}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          {isMobile ? (
            <Swiper
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {scales.map((scale) => (
                <SwiperSlide key={scale.title}>
                  <ResultsCard
                    title={scale.title}
                    description={scale.description}
                    rating={scale.rating}
                    explanation={scale.explanation}
                    imageUrl={scale.imageUrl}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="space-y-6">
              {scales.map((scale) => (
                <ResultsCard
                  key={scale.title}
                  title={scale.title}
                  description={scale.description}
                  rating={scale.rating}
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

