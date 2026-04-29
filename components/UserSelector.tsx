'use client';

import { useState, useEffect } from 'react';
import { Profile } from '@/types';

interface UserSelectorProps {
  profiles: Profile[];
  onSelect: (profileId: string) => void;
}

export default function UserSelector({ profiles, onSelect }: UserSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('current-user-id');
    if (stored && profiles.find((p) => p.id === stored)) {
      setSelectedId(stored);
      onSelect(stored);
    }
  }, [profiles, onSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    localStorage.setItem('current-user-id', id);
    onSelect(id);
  };

  return (
    <div className="bg-white rounded-2xl p-4 card-shadow mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Browsing as:
      </label>
      <select
        value={selectedId}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tinder-pink"
      >
        <option value="">Select your profile...</option>
        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.metadata?.name || profile.title}
            {profile.metadata?.age ? `, ${profile.metadata.age}` : ''}
          </option>
        ))}
      </select>
    </div>
  );
}