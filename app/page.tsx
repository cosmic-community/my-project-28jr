import { getProfiles, getSwipes } from '@/lib/cosmic';
import { Swipe, Profile } from '@/types';
import Header from '@/components/Header';
import HomeClient from '@/components/HomeClient';

export default async function HomePage() {
  const profiles = await getProfiles();
  const swipes = await getSwipes();

  // Build map of swiped profile IDs per user
  const swipedIds: Record<string, string[]> = {};
  swipes.forEach((swipe: Swipe) => {
    const swiper = swipe.metadata?.swiper;
    const swiped = swipe.metadata?.swiped;
    const swiperId = typeof swiper === 'string' ? swiper : (swiper as Profile)?.id;
    const swipedId = typeof swiped === 'string' ? swiped : (swiped as Profile)?.id;

    if (swiperId && swipedId) {
      if (!swipedIds[swiperId]) {
        swipedIds[swiperId] = [];
      }
      swipedIds[swiperId].push(swipedId);
    }
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">
            Find Your Match
          </h1>
          <p className="text-gray-600">Swipe right to like, left to pass</p>
        </div>
        <HomeClient profiles={profiles} swipedIds={swipedIds} />
      </main>
    </div>
  );
}