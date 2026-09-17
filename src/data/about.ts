import type { ChangelogEntry, Library } from '@/types'

/**
 * Newest release first. The first entry is treated as the current version by
 * the Changelog timeline, so it must match `APP_VERSION` (see `src/version.ts`).
 *
 * WRITING RULE: this is read by travellers, not by us. Describe what someone
 * can now do, see or feel — never a library, endpoint, bundler, cache header or
 * a11y attribute. Implementation details belong in `git log`.
 *   ✗ "Progressive image pipeline: skeleton → thumbnail → crossfade"
 *   ✓ "Photos appear as a small preview first, then sharpen"
 *
 * Dates follow the git history; `0.0.1` is flagged `prerelease` because it was
 * only ever a local scaffold that nobody outside this laptop could open.
 */
export const changelog: ChangelogEntry[] = [
  {
    version: '1.0.0',
    date: '2026-09-17',
    status: 'current',
    summary:
      'The first proper release. Everything you need to plan a trip around Malang and Batu, in one place.',
    changes: [
      {
        type: 'added',
        description:
          '69 places to visit, with photos and a description for each: 14 in Kota Malang, 17 in Kota Batu and 38 around Kabupaten Malang',
      },
      {
        type: 'added',
        description:
          'A map with 66 pins across the highlands — hover over a pin to read which place it marks',
      },
      {
        type: 'added',
        description:
          '51 photos of the region in the Gallery, viewable full screen',
      },
      {
        type: 'improved',
        description:
          'The map now shows a placeholder while it opens, so it never looks like the page has frozen',
      },
      {
        type: 'improved',
        description:
          'Scrolling the page past the map no longer zooms it by accident',
      },
      {
        type: 'improved',
        description:
          'Every page tells you what is happening — a clear loading view while things appear, and a friendly message with a Try again button if they do not',
      },
      {
        type: 'improved',
        description:
          'Smoother to use with a screen reader, and with the keyboard alone',
      },
      {
        type: 'improved',
        description:
          'Place information loads quickly and stays fresh without re-downloading on every visit',
      },
      {
        type: 'changed',
        description:
          'A fresh About page, so you can see which version you are using and what has changed',
      },
      {
        type: 'fixed',
        description:
          'Occasional cases where places, photos or pins failed to appear on some networks',
      },
    ],
  },
  {
    version: '0.3.0',
    date: '2026-09-15',
    summary: 'The map becomes a real map you can move around in.',
    changes: [
      {
        type: 'added',
        description: 'Buttons to zoom the map in and out',
      },
      {
        type: 'changed',
        description:
          'Replaced the fixed picture of a map with a live one: pan around Malang and Batu and zoom right in to street level',
      },
    ],
  },
  {
    version: '0.2.0',
    date: '2026-09-14',
    summary: 'Photos load gently, and new places can arrive without an update.',
    changes: [
      {
        type: 'added',
        description:
          'Photos appear as a small preview first and then sharpen, instead of popping in one by one',
      },
      {
        type: 'added',
        description:
          'Each place shows a coloured label for its type, so waterfalls, museums and theme parks are easy to tell apart at a glance',
      },
      {
        type: 'added',
        description:
          'The home page shows a different handful of suggestions each time you visit',
      },
      {
        type: 'changed',
        description:
          'Places and photos are read from a live list, so new spots appear without needing an update',
      },
      {
        type: 'fixed',
        description:
          'Photos that fail to load now show a tidy "Image unavailable" tile instead of a broken image',
      },
      {
        type: 'fixed',
        description:
          'Full screen gallery photos were being squashed flat on some screens',
      },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-09-10',
    summary: 'One long page becomes a proper app you can move through.',
    changes: [
      {
        type: 'added',
        description:
          'Four separate sections — Places, Gallery, Maps and About — each with its own address you can bookmark or send to a friend',
      },
      {
        type: 'added',
        description:
          'A full page for every place, with its photos, story and location',
      },
      {
        type: 'added',
        description:
          'Search places by name or description, and narrow the list down by area',
      },
      {
        type: 'added',
        description:
          'A bar along the bottom of the screen on phones, so you can switch sections with your thumb',
      },
      {
        type: 'added',
        description: 'Light and dark modes, for reading the list at 2am',
      },
    ],
  },
  {
    version: '0.0.1',
    date: '2026-09-10',
    status: 'prerelease',
    summary: 'A first sketch on a laptop. Never released to anyone.',
    changes: [
      {
        type: 'added',
        description:
          'A welcome banner and a starting list of destinations around Malang and Batu',
      },
    ],
  },
]

export const libraries: Library[] = [
  {
    name: 'React',
    url: 'https://react.dev',
    description: 'The library for web and native user interfaces',
  },
  {
    name: 'Vite',
    url: 'https://vite.dev',
    description: 'Next generation frontend tooling',
  },
  {
    name: 'Chakra UI',
    url: 'https://www.chakra-ui.com',
    description: 'Accessible component library for React',
  },
  {
    name: 'React Router',
    url: 'https://reactrouter.com',
    description: 'Declarative routing for React',
  },
  {
    name: 'React Icons',
    url: 'https://react-icons.github.io/react-icons',
    description: 'Popular icons as React components',
  },
  {
    name: 'TanStack Query',
    url: 'https://tanstack.com/query',
    description: 'Remote data caching and request state',
  },
  {
    name: 'next-themes',
    url: 'https://www.npmjs.com/package/next-themes',
    description: 'Color mode / theme management',
  },
  {
    name: 'Google Maps',
    url: 'https://github.com/visgl/react-google-maps',
    description: 'Official React components for the Maps JavaScript API',
  },
  {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org',
    description: 'Typed superset of JavaScript',
  },
]
