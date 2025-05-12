'use client';

import React, { useState } from 'react';

interface NewsCardProps {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  sourceUrl: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  sourceUrl,
}) => {
  const [imgError, setImgError] = useState(false);

  const handleClick = () => {
    window.open(sourceUrl, '_blank'); // Opens the article in a new tab
  };

  const showImage = imageUrl && !imgError;

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-gray-800 text-white shadow-lg rounded-lg p-4 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out transform"
      role="button"
      tabIndex={0}
    >
      {showImage ? (
        <div className="relative w-full h-56 rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-56 bg-gray-600 text-gray-200 font-semibold">
          No Image Available
        </div>
      )}
      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-sm text-gray-400 mt-2">
          {description || 'No description available.'}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
