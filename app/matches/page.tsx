import { getMatches } from '@/lib/cosmic';
import { Profile, Match } from '@/types';
import Header from '@/components/Header';
import MatchCard from '@/components/MatchCard';

export default async function MatchesPage() {
  const matches = await getMatches();

  // Filter only matches with valid populated profiles
  const validMatches = matches.filter((match: Match) => {
    const p1 = match.metadata?.profile_1;
    const p2 = match.metadata?.profile_2;
    return (
      p1 &&
      p2 &&
      typeof p1 === 'object' &&
      typeof p2 === 'object' &&
      'id' in p1 &&
      'id' in p2
    );
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">
            Matches 💕
          </h1>
          <p className="text-gray-600">
            {validMatches.length} {validMatches.length === 1 ? 'connection' : 'connections'} made
          </p>
        </div>

        {validMatches.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 card-shadow text-center">
            <span className="text-6xl mb-4 block">💔</span>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No matches yet</h2>
            <p className="text-gray-600">Start swiping to find your perfect match!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {validMatches.map((match) => {
              const p1 = match.metadata?.profile_1 as Profile;
              const p2 = match.metadata?.profile_2 as Profile;
              return (
                <MatchCard
                  key={match.id}
                  profile1={p1}
                  profile2={p2}
                  matchDate={match.created_at}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}