import React, { useState, useCallback } from 'react';
import { Camera, Upload, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  onImageSelect: (imageData: string) => void;
  className?: string;
}

interface FileEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

interface DragEvent extends React.DragEvent<HTMLDivElement> {
  dataTransfer: DataTransfer;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, className = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const validateImage = (file: File): boolean => {
    setError('');

    if (!file) {
      setError('Please select an image file.');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Image size must be less than 5MB.');
      return false;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Please upload a JPG, PNG, or GIF file.');
      return false;
    }

    return true;
  };

  const processImage = useCallback((file: File) => {
    if (!validateImage(file)) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        onImageSelect(result);
        toast({
          title: "Success",
          description: "Image uploaded successfully!",
          duration: 3000,
        });
      }
    };
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };
    reader.readAsDataURL(file);
  }, [onImageSelect, toast]);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processImage(file);
  }, [processImage]);

  const handleFileChange = useCallback((event: FileEvent) => {
    const file = event.target.files?.[0];
    if (file) processImage(file);
  }, [processImage]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="block sm:hidden">
        <Button
          type="button"
          onClick={() => document.getElementById('mobile-image-upload')?.click()}
          className="flex items-center justify-center w-full bg-blue-600 text-white hover:bg-blue-700 text-lg py-4"
        >
          <Camera className="mr-2 h-6 w-6" />
          Capture Image
        </Button>
        <Input
          id="mobile-image-upload"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div 
        className={`hidden sm:block border-2 border-dashed rounded-lg p-6 
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${error ? 'border-red-500' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label
              htmlFor="desktop-image-upload"
              className="cursor-pointer text-blue-600 hover:text-blue-500"
            >
              Click to upload
            </label>
            <span className="text-gray-500"> or drag and drop</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            JPG, PNG, or GIF up to 5MB
          </p>
        </div>
        <Input
          id="desktop-image-upload"
          type="file"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;