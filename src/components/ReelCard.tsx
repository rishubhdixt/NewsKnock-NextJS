'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ReelCardProps {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  routeTo?: string;
}

const ReelCard: React.FC<ReelCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  routeTo = `/reels/${id}`,
}) => {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  const handleClick = () => router.push(routeTo);

  const showImage = imageUrl && !imgError;

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      role="button"
      tabIndex={0}
      className="relative h-full w-full flex flex-col justify-end items-center text-white overflow-hidden cursor-pointer bg-black"
    >
      {/* Background Image (only render if valid and not failed) */}
      {showImage && (
        <img
          src={imageUrl}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          onError={() => setImgError(true)}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 p-6 text-center w-full">
        <h2 className="text-2xl font-bold mb-2 drop-shadow-md">{title}</h2>
        <p className="text-sm text-gray-200 drop-shadow-sm">
          {description || 'Swipe up to read more.'}
        </p>
      </div>
    </div>
  );
};

export default ReelCard;
