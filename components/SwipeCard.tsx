'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Profile, getMetafieldValue } from '@/types';

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

export default function SwipeCard({ profile, onSwipe, isTop }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const passOpacity = useTransform(x, [-100, 0], [1, 0]);

  const photos = profile.metadata?.photos || [];
  const firstPhoto = photos[0];
  const name = profile.metadata?.name || profile.title;
  const age = profile.metadata?.age;
  const location = profile.metadata?.location;
  const bio = profile.metadata?.bio;

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      className="absolute inset-0 swipe-card"
      style={{ x, rotate, opacity }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden card-shadow">
        {firstPhoto ? (
          <img
            src={`${firstPhoto.imgix_url}?w=800&h=1200&fit=crop&auto=format,compress`}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full gradient-tinder flex items-center justify-center">
            <span className="text-8xl">👤</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* LIKE indicator */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-12 left-8 border-4 border-green-500 text-green-500 text-4xl font-extrabold px-4 py-2 rounded-lg rotate-[-20deg]"
        >
          LIKE
        </motion.div>

        {/* PASS indicator */}
        <motion.div
          style={{ opacity: passOpacity }}
          className="absolute top-12 right-8 border-4 border-red-500 text-red-500 text-4xl font-extrabold px-4 py-2 rounded-lg rotate-[20deg]"
        >
          PASS
        </motion.div>

        {/* Profile info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end gap-3 mb-2">
            <h2 className="text-4xl font-bold">{name}</h2>
            {age && <span className="text-3xl font-light">{age}</span>}
          </div>
          {location && (
            <div className="flex items-center gap-1 text-white/90 mb-2">
              <span>📍</span>
              <span className="text-sm">{location}</span>
            </div>
          )}
          {bio && (
            <p className="text-white/90 text-sm line-clamp-2">{bio}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}