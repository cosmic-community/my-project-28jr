import { createBucketClient } from '@cosmicjs/sdk';
import { Profile, Swipe, Match, hasStatus } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

export async function getProfiles(): Promise<Profile[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'profiles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Profile[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch profiles');
  }
}

export async function getProfile(slug: string): Promise<Profile | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'profiles', slug })
      .depth(1);
    return response.object as Profile;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch profile');
  }
}

export async function getSwipes(): Promise<Swipe[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'swipes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Swipe[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch swipes');
  }
}

export async function getMatches(): Promise<Match[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'matches' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Match[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch matches');
  }
}

export async function createSwipe(swiperId: string, swipedId: string, action: 'like' | 'pass') {
  try {
    const response = await cosmic.objects.insertOne({
      title: `Swipe ${Date.now()}`,
      type: 'swipes',
      metadata: {
        swiper: swiperId,
        swiped: swipedId,
        action: action,
      },
    });
    return response.object;
  } catch (error) {
    throw new Error('Failed to create swipe');
  }
}

export async function createMatch(profile1Id: string, profile2Id: string) {
  try {
    const response = await cosmic.objects.insertOne({
      title: `Match ${Date.now()}`,
      type: 'matches',
      metadata: {
        profile_1: profile1Id,
        profile_2: profile2Id,
      },
    });
    return response.object;
  } catch (error) {
    throw new Error('Failed to create match');
  }
}

export async function checkForMatch(swiperId: string, swipedId: string): Promise<boolean> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'swipes',
        'metadata.swiper': swipedId,
        'metadata.swiped': swiperId,
      })
      .props(['id', 'metadata']);

    const swipes = response.objects as Swipe[];
    return swipes.some((swipe) => {
      const action = swipe.metadata?.action;
      const actionValue = typeof action === 'string' ? action : (action as any)?.value || (action as any)?.key;
      return actionValue === 'like' || actionValue === 'Like';
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return false;
    }
    return false;
  }
}