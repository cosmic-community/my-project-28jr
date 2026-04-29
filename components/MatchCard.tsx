import Link from 'next/link';
import { Profile } from '@/types';

interface MatchCardProps {
  profile1: Profile;
  profile2: Profile;
  matchDate: string;
}

export default function MatchCard({ profile1, profile2, matchDate }: MatchCardProps) {
  const photo1 = profile1.metadata?.photos?.[0];
  const photo2 = profile2.metadata?.photos?.[0];
  const name1 = profile1.metadata?.name || profile1.title;
  const name2 = profile2.metadata?.name || profile2.title;

  const formattedDate = new Date(matchDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-center gap-4 mb-4">
        <Link href={`/profiles/${profile1.slug}`} className="flex flex-col items-center group">
          {photo1 ? (
            <img
              src={`${photo1.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={name1}
              className="w-20 h-20 rounded-full object-cover border-4 border-tinder-pink group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-20 h-20 rounded-full gradient-tinder flex items-center justify-center text-3xl border-4 border-tinder-pink">
              👤
            </div>
          )}
          <span className="text-sm font-semibold text-gray-800 mt-2 group-hover:text-tinder-pink">
            {name1}
          </span>
        </Link>

        <span className="text-3xl">💕</span>

        <Link href={`/profiles/${profile2.slug}`} className="flex flex-col items-center group">
          {photo2 ? (
            <img
              src={`${photo2.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={name2}
              className="w-20 h-20 rounded-full object-cover border-4 border-tinder-pink group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-20 h-20 rounded-full gradient-tinder flex items-center justify-center text-3xl border-4 border-tinder-pink">
              👤
            </div>
          )}
          <span className="text-sm font-semibold text-gray-800 mt-2 group-hover:text-tinder-pink">
            {name2}
          </span>
        </Link>
      </div>
      <p className="text-center text-xs text-gray-500">Matched on {formattedDate}</p>
    </div>
  );
}