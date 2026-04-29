import Link from 'next/link';
import { Profile } from '@/types';

export default function ProfileCard({ profile }: { profile: Profile }) {
  const photos = profile.metadata?.photos || [];
  const firstPhoto = photos[0];
  const name = profile.metadata?.name || profile.title;
  const age = profile.metadata?.age;
  const location = profile.metadata?.location;

  return (
    <Link href={`/profiles/${profile.slug}`}>
      <div className="bg-white rounded-2xl overflow-hidden card-shadow hover:scale-[1.02] transition-transform cursor-pointer">
        <div className="aspect-[3/4] relative bg-gray-100">
          {firstPhoto ? (
            <img
              src={`${firstPhoto.imgix_url}?w=600&h=800&fit=crop&auto=format,compress`}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full gradient-tinder flex items-center justify-center">
              <span className="text-6xl">👤</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-end gap-2">
              <h3 className="text-xl font-bold">{name}</h3>
              {age && <span className="text-lg font-light">{age}</span>}
            </div>
            {location && (
              <p className="text-sm text-white/90 mt-1">📍 {location}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}