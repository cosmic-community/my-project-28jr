// app/profiles/[slug]/page.tsx
import { getProfile } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';
import Header from '@/components/Header';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProfileDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getProfile(slug);

  if (!profile) {
    notFound();
  }

  const photos = profile.metadata?.photos || [];
  const name = profile.metadata?.name || profile.title;
  const age = profile.metadata?.age;
  const bio = profile.metadata?.bio;
  const location = profile.metadata?.location;
  const gender = getMetafieldValue(profile.metadata?.gender);
  const interestedIn = getMetafieldValue(profile.metadata?.interested_in);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/profiles" className="inline-flex items-center gap-2 text-tinder-pink hover:text-tinder-red font-medium mb-6">
          ← Back to Profiles
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden card-shadow">
          {/* Photo Gallery */}
          {photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {photos.map((photo, idx) => (
                <div key={idx} className={idx === 0 ? 'md:col-span-2 aspect-[4/3]' : 'aspect-square'}>
                  <img
                    src={`${photo.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
                    alt={`${name} photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="aspect-[4/3] gradient-tinder flex items-center justify-center">
              <span className="text-9xl">👤</span>
            </div>
          )}

          {/* Profile Info */}
          <div className="p-6 md:p-8">
            <div className="flex items-end gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{name}</h1>
              {age && <span className="text-3xl text-gray-600 font-light">{age}</span>}
            </div>

            {location && (
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <span className="text-xl">📍</span>
                <span>{location}</span>
              </div>
            )}

            {bio && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">About</h2>
                <p className="text-gray-700 leading-relaxed">{bio}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              {gender && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Gender
                  </h3>
                  <p className="text-gray-800 capitalize">{gender}</p>
                </div>
              )}
              {interestedIn && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Interested In
                  </h3>
                  <p className="text-gray-800 capitalize">{interestedIn}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}