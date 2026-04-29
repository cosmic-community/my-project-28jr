import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl">💕</span>
          <h1 className="text-2xl font-bold gradient-text">SwipeMatch</h1>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-6">
          <Link href="/" className="text-gray-700 hover:text-tinder-pink font-medium transition-colors text-sm sm:text-base">
            Discover
          </Link>
          <Link href="/profiles" className="text-gray-700 hover:text-tinder-pink font-medium transition-colors text-sm sm:text-base">
            Profiles
          </Link>
          <Link href="/matches" className="text-gray-700 hover:text-tinder-pink font-medium transition-colors text-sm sm:text-base">
            Matches
          </Link>
        </nav>
      </div>
    </header>
  );
}