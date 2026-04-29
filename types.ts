export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export type Gender = 'male' | 'female' | 'non-binary' | 'other';
export type SwipeAction = 'like' | 'pass';

export interface ProfilePhoto {
  url: string;
  imgix_url: string;
}

export interface Profile extends CosmicObject {
  type: 'profiles';
  metadata: {
    name?: string;
    age?: number;
    bio?: string;
    gender?: Gender | { key: string; value: string };
    interested_in?: Gender | { key: string; value: string };
    photos?: ProfilePhoto[];
    location?: string;
  };
}

export interface Swipe extends CosmicObject {
  type: 'swipes';
  metadata: {
    swiper?: Profile | string;
    swiped?: Profile | string;
    action?: SwipeAction | { key: string; value: string };
  };
}

export interface Match extends CosmicObject {
  type: 'matches';
  metadata: {
    profile_1?: Profile | string;
    profile_2?: Profile | string;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}