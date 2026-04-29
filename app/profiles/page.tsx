import { getProfiles } from '@/lib/cosmic';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';

export default async function ProfilesPage() {
  const profiles = await getProfiles();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">
            All Profiles
          </h1>
          <p className="text-gray-600">{profiles.length} amazing people</p>
        </div>

        {profiles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 card-shadow text-center">
            <span className="text-6xl mb-4 block">😢</span>
            <p className="text-gray-600">No profiles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}