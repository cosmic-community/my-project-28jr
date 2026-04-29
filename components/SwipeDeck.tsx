'use client';

import { useState } from 'react';
import { Profile } from '@/types';
import SwipeCard from './SwipeCard';

interface SwipeDeckProps {
  profiles: Profile[];
  currentUserId: string;
}

export default function SwipeDeck({ profiles, currentUserId }: SwipeDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (isProcessing) return;

    const profile = profiles[currentIndex];
    if (!profile) return;

    setIsProcessing(true);
    const action = direction === 'right' ? 'like' : 'pass';

    try {
      const response = await fetch('/api/swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          swiperId: currentUserId,
          swipedId: profile.id,
          action,
        }),
      });

      const data = await response.json();

      if (data.matched && action === 'like') {
        setMatchedProfile(profile);
      }
    } catch (error) {
      console.error('Error recording swipe:', error);
    }

    setCurrentIndex((prev) => prev + 1);
    setIsProcessing(false);
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    handleSwipe(direction);
  };

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-white rounded-3xl card-shadow p-8">
        <span className="text-6xl mb-4">🎉</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">You're all caught up!</h2>
        <p className="text-gray-600 text-center">Check back later for more profiles to discover.</p>
      </div>
    );
  }

  const visibleProfiles = profiles.slice(currentIndex, currentIndex + 3);

  return (
    <>
      <div className="relative w-full max-w-md mx-auto h-[600px]">
        {visibleProfiles.map((profile, idx) => (
          <SwipeCard
            key={profile.id}
            profile={profile}
            onSwipe={handleSwipe}
            isTop={idx === 0}
          />
        )).reverse()}
      </div>

      {/* Action buttons */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={() => handleButtonSwipe('left')}
          disabled={isProcessing}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl hover:scale-110 transition-transform disabled:opacity-50"
          aria-label="Pass"
        >
          ❌
        </button>
        <button
          onClick={() => handleButtonSwipe('right')}
          disabled={isProcessing}
          className="w-20 h-20 gradient-tinder rounded-full shadow-lg flex items-center justify-center text-4xl hover:scale-110 transition-transform disabled:opacity-50"
          aria-label="Like"
        >
          💚
        </button>
      </div>

      {/* Match Modal */}
      {matchedProfile && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
            <h2 className="text-4xl font-bold gradient-text mb-2">It's a Match! 🎉</h2>
            <p className="text-gray-600 mb-6">
              You and {matchedProfile.metadata?.name || matchedProfile.title} liked each other!
            </p>
            {matchedProfile.metadata?.photos && matchedProfile.metadata.photos[0] && (
              <img
                src={`${matchedProfile.metadata.photos[0].imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                alt={matchedProfile.metadata?.name || matchedProfile.title}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-tinder-pink"
              />
            )}
            <button
              onClick={() => setMatchedProfile(null)}
              className="gradient-tinder text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
            >
              Keep Swiping
            </button>
          </div>
        </div>
      )}
    </>
  );
}