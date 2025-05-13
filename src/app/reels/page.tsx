'use client';

import React, { useEffect, useState, useRef } from 'react';
import ReelCard from '@/components/ReelCard';
import { fetchPaginatedNews } from '@/helpers/fetchPaginatedNews';
import { ArrowDown, ArrowUp } from 'lucide-react';

const ReelsPage = () => {
  const [reels, setReels] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false);

  const fetchMoreReels = async () => {
    if (isFetchingRef.current || !hasMore) return;
    isFetchingRef.current = true;

    const newReels = await fetchPaginatedNews('', page + 1, 5);
    if (newReels.length > 0) {
      setReels(prev => [...prev, ...newReels]);
      setPage(prev => prev + 1);
    } else {
      setHasMore(false);
    }

    isFetchingRef.current = false;
  };

  useEffect(() => {
    const loadInitialReels = async () => {
      const data = await fetchPaginatedNews('', 1, 5);
      if (data.length) {
        setReels(data);
      } else {
        setHasMore(false);
      }
    };
    loadInitialReels();
  }, []);

  useEffect(() => {
    const preventScroll = () => {
      if (window.innerWidth < 768) document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    };
    return preventScroll();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') nextReel();
      else if (e.key === 'ArrowUp') prevReel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, reels]);

  const nextReel = async () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (hasMore) {
      await fetchMoreReels();
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevReel = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const currentReel = reels[currentIndex];

  return (
    <div className="relative h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-[420px] aspect-[9/16] bg-neutral-900 rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-700 flex items-center justify-center">
        {currentReel ? (
          <ReelCard
            id={currentReel.title}
            title={currentReel.title}
            description={currentReel.description}
            imageUrl={currentReel.urlToImage}
          />
        ) : (
          <div className="text-white text-center p-4 text-lg">
            {hasMore ? 'Loading...' : '🎉 You’re all caught up!'}
          </div>
        )}

        {/* Arrows */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          <button
            onClick={prevReel}
            className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
          >
            <ArrowUp />
          </button>
          <button
            onClick={nextReel}
            className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
          >
            <ArrowDown />
          </button>
        </div>

        {/* Progress */}
        <div className="absolute bottom-3 w-full flex justify-center gap-1 z-30">
          {reels.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 w-4 rounded-full ${
                idx === currentIndex ? 'bg-white' : 'bg-white/30'
              } transition-all duration-300`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReelsPage;
