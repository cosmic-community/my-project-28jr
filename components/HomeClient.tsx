'use client';

import { useState, useMemo } from 'react';
import { Profile } from '@/types';
import UserSelector from './UserSelector';
import SwipeDeck from './SwipeDeck';

interface HomeClientProps {
  profiles: Profile[];
  swipedIds: Record<string, string[]>;
}

export default function HomeClient({ profiles, swipedIds }: HomeClientProps) {
  const [currentUserId, setCurrentUserId] = useState<string>('');

  const availableProfiles = useMemo(() => {
    if (!currentUserId) return [];
    const alreadySwiped = swipedIds[currentUserId] || [];
    return profiles.filter(
      (p) => p.id !== currentUserId && !alreadySwiped.includes(p.id)
    );
  }, [currentUserId, profiles, swipedIds]);

  return (
    <div className="max-w-md mx-auto">
      <UserSelector profiles={profiles} onSelect={setCurrentUserId} />

      {!currentUserId ? (
        <div className="bg-white rounded-3xl p-12 card-shadow text-center">
          <span className="text-6xl mb-4 block">👋</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
          <p className="text-gray-600">
            Select your profile above to start swiping.
          </p>
        </div>
      ) : availableProfiles.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 card-shadow text-center">
          <span className="text-6xl mb-4 block">🎉</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">All done!</h2>
          <p className="text-gray-600">
            You've swiped through everyone. Check back later!
          </p>
        </div>
      ) : (
        <SwipeDeck profiles={availableProfiles} currentUserId={currentUserId} />
      )}
    </div>
  );
}