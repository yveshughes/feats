'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ResultsCardProps extends HTMLMotionProps<'article'> {
  title: string;
  description: string;
  rating?: number;
  explanation?: string;
  imageUrl: string;
  className?: string;
}

const cardVariants = {
  initial: { y: 0 },
  hover: { y: -5 },
};

const ResultsCardComponent = ({
  title,
  description,
  rating,
  explanation,
  imageUrl,
  className = '',
  ...motionProps
}: ResultsCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/images/scales/fallback.svg';
  };

  const formatRating = (rating?: number) => {
    if (rating === undefined) return '';
    return `${rating.toString().padStart(2, '0')}/05`;
  };

  return (
    <motion.article
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-start p-4 h-full hover:shadow-lg transition-shadow ${className}`}
      role="article"
      aria-label={`Analysis results for ${title}`}
      {...motionProps}
    >
      <div className="flex items-start w-full mb-4 gap-4">
        <div className="relative flex-shrink-0 w-16 h-16">
          <Image
            src={imageUrl}
            alt={`Icon representing ${title}`}
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 64px) 100vw, 64px"
            priority={false}
            onError={handleImageError}
          />
          {rating !== undefined && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              aria-label={`Rating: ${formatRating(rating)}`}
            >
              <span className="text-black font-bold bg-white/70 rounded-full px-2 py-1 backdrop-blur-sm">
                {formatRating(rating)}
              </span>
            </div>
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        </div>
      </div>

      {(rating !== undefined || explanation) && (
        <hr className="w-full border-t border-gray-200 my-2" aria-hidden="true" />
      )}

      {rating !== undefined && (
        <p className="text-sm font-semibold text-gray-700 mb-2 w-full">
          <span className="sr-only">Rating:</span> {formatRating(rating)}
        </p>
      )}

      {explanation && (
        <p className="text-sm text-gray-600 w-full leading-relaxed">
          {explanation}
        </p>
      )}
    </motion.article>
  );
};

// Memoize the component for better performance
export const ResultsCard = memo(ResultsCardComponent);

// Export the type for use in other components
export type { ResultsCardProps };