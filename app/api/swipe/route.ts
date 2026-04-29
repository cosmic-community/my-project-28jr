import { NextRequest, NextResponse } from 'next/server';
import { createSwipe, checkForMatch, createMatch } from '@/lib/cosmic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { swiperId, swipedId, action } = body;

    if (!swiperId || !swipedId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (action !== 'like' && action !== 'pass') {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    // Record the swipe
    await createSwipe(swiperId, swipedId, action);

    // Check for a match if it was a like
    let matched = false;
    if (action === 'like') {
      const isMatch = await checkForMatch(swiperId, swipedId);
      if (isMatch) {
        await createMatch(swiperId, swipedId);
        matched = true;
      }
    }

    return NextResponse.json({ success: true, matched });
  } catch (error) {
    console.error('Swipe error:', error);
    return NextResponse.json(
      { error: 'Failed to process swipe' },
      { status: 500 }
    );
  }
}