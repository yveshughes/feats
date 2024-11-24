'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ResultsCard } from '@/components/shared/ResultsCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ImageUpload from '@/components/ui/image-upload';
import { useToast } from "@/components/ui/use-toast";
import { scales, Scale } from '@/data/scales';
import { Button } from '@/components/ui/button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function TryItPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<Scale[]>(scales);
  const [loadedCards, setLoadedCards] = useState<number[]>([]);
  const [analysisMessage, setAnalysisMessage] = useState<string | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Check if wallet is connected
    const storedWallet = localStorage.getItem('akash_wallet');
    if (storedWallet) {
      setWallet(storedWallet);
    }

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && analysisResults.length > 0) {
      const timer = setTimeout(() => {
        setLoadedCards(prev => {
          if (prev.length < analysisResults.length) {
            return [...prev, prev.length];
          }
          return prev;
        });
      }, 500); // 500ms delay between each card

      return () => clearTimeout(timer);
    }
  }, [isLoading, analysisResults, loadedCards]);

  const handleImageSelect = async (imageData: string) => {
    if (!wallet) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please connect your Akash wallet first.",
      });
      return;
    }

    setUploadedImage(imageData);
    setIsLoading(true);
    setLoadedCards([]); // Reset loaded cards
    setAnalysisMessage(null); // Reset analysis message

    try {
      // Convert base64 to blob
      const base64Response = await fetch(imageData);
      const blob = await base64Response.blob();

      // Create form data
      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');

      // Send to API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'x-akash-wallet': wallet
        }
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      if (data.success) {
        setAnalysisResults(data.scales);
        setAnalysisMessage(data.message || null);
        toast({
          title: "Analysis Complete",
          description: data.message || "Your image has been analyzed successfully.",
        });
      } else {
        throw new Error(data.error || 'Analysis failed');
      }

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

  const connectWallet = async () => {
    // This is a mock function. In a real-world scenario, you'd integrate with Akash's wallet connection flow.
    const mockWallet = 'akash1234567890abcdef';
    localStorage.setItem('akash_wallet', mockWallet);
    localStorage.setItem('akash_provider', 'mock_provider');
    setWallet(mockWallet);
    toast({
      title: "Wallet Connected",
      description: `Connected with wallet ${mockWallet}`,
    });
  };

  const renderCard = (scale: Scale) => (
    <ResultsCard
      key={scale.title}
      title={scale.title}
      description={scale.description}
      rating={parseInt(scale.rating.split('/')[0])}
      explanation={scale.explanation}
      imageUrl={scale.imageUrl}
    />
  );

  return (
    <div className="w-full px-4 py-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="hidden sm:block text-4xl font-bold text-gray-900 mb-4">
          Try It
        </h1>
        <p className="text-lg text-gray-600 mx-auto max-w-3xl mb-8">
          Add your image and it will be analyzed and scored using FEATS scales.
        </p>

        {!wallet ? (
          <Button onClick={connectWallet} className="mb-4">Connect Akash Wallet</Button>
        ) : (
          <p className="text-sm text-gray-500 mb-4">Connected: {wallet}</p>
        )}

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
          ) : (
            <>
              {analysisMessage && (
                <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-md">
                  {analysisMessage}
                </div>
              )}
              {isMobile ? (
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                >
                  {analysisResults.map((scale, index) => (
                    <SwiperSlide key={scale.title}>
                      {loadedCards.includes(index) && renderCard(scale)}
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="space-y-6">
                  {analysisResults.map((scale, index) => (
                    loadedCards.includes(index) && renderCard(scale)
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}






