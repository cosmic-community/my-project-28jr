# SwipeMatch - Tinder Clone

![App Preview](https://imgix.cosmicjs.com/7f843440-43dd-11f1-9f85-e7af420a77a5-autopilot-photo-1518199266791-5375a83190b7-1777475403133.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern Tinder-style dating app built with Next.js and Cosmic CMS. Swipe through profiles, make matches, and discover connections.

## Features

- 🔥 Swipe-based profile discovery with smooth animations
- 💕 Automatic match detection on mutual likes
- 👤 Detailed profile browsing with photo galleries
- 📱 Mobile-first responsive design
- ⚡ Real-time data with Cosmic CMS
- 🎨 Beautiful gradient UI inspired by Tinder

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69f21f0b5d00ec9dea6ff8b9&clone_repository=69f21ff85d00ec9dea6ff8f8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Create a basic Tinder clone app with essential features only, using Cosmic for backend storage and data management, without any unnecessary features."

### Code Generation Prompt

> Create a basic Tinder clone app with essential features only, using Cosmic for backend storage and data management, without any unnecessary features.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Backend content management
- **Framer Motion** - Smooth swipe animations
- **Bun** - Fast package manager

## Getting Started

### Prerequisites

- Bun installed
- Cosmic account with content set up

### Installation

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Profiles

```typescript
const response = await cosmic.objects
  .find({ type: 'profiles' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Recording a Swipe

```typescript
await cosmic.objects.insertOne({
  title: `Swipe ${Date.now()}`,
  type: 'swipes',
  metadata: {
    swiper: swiperId,
    swiped: swipedId,
    action: 'like'
  }
});
```

### Creating a Match

```typescript
await cosmic.objects.insertOne({
  title: `Match`,
  type: 'matches',
  metadata: {
    profile_1: profile1Id,
    profile_2: profile2Id
  }
});
```

## Cosmic CMS Integration

This app uses three content types from Cosmic:
- **Profiles** - User profile data including photos, bio, and preferences
- **Swipes** - Records of like/pass actions between profiles
- **Matches** - Mutual connections when both users swipe right

Read more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

Deploy easily to Vercel or Netlify. Make sure to set environment variables:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->