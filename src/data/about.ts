import type { ChangelogEntry, Library } from '@/types'

/**
 * Newest release first. The first entry is treated as the current version by
 * the Changelog timeline, so it must match `APP_VERSION` (see `src/version.ts`).
 *
 * Dates follow the git history; `0.0.1` is flagged `prerelease` because it was
 * only ever a local Vite scaffold, never shipped.
 */
export const changelog: ChangelogEntry[] = [
  {
    version: '1.0.0',
    date: '2026-09-17',
    status: 'current',
    summary:
      'First public release — the complete Malang & Batu travel companion, now live on Firebase Hosting.',
    changes: [
      {
        type: 'added',
        description:
          'Curated dataset shipped as static JSON: 69 places across Kota Malang (14), Kota Batu (17) and Kabupaten Malang (38), 51 gallery photos and 66 map markers',
      },
      {
        type: 'added',
        description:
          'Same-origin `/api` layer with a 10-minute client cache, so the static dataset costs zero repeat requests',
      },
      {
        type: 'added',
        description:
          'Search across place names and descriptions, combinable with the region filter',
      },
      {
        type: 'improved',
        description:
          'Loading skeleton layered over the map while markers and the Google Maps SDK initialise',
      },
      {
        type: 'improved',
        description:
          'Full loading, error, empty and retry states on every data-driven page — no silent failures',
      },
      {
        type: 'fixed',
        description:
          'API base URL now resolves to `/api` in development, preview and production, removing the CORS dependency on the data host',
      },
      {
        type: 'changed',
        description:
          'Accessibility pass: semantic landmarks and headings, keyboard-operable gallery lightbox, `aria-hidden` decorative thumbnails',
      },
      {
        type: 'changed',
        description:
          'About page rebuilt around the current release, with this changelog and a live library manifest',
      },
    ],
  },
  {
    version: '0.3.0',
    date: '2026-09-15',
    summary: 'Interactive Google Maps replaces the embedded static iframe.',
    changes: [
      {
        type: 'added',
        description:
          'Marker layer rendered from the Maps endpoint with per-place tooltips and cooperative gesture handling',
      },
      {
        type: 'changed',
        description:
          'Replaced the hard-coded map iframe with `@vis.gl/react-google-maps`, centred on the Malang–Batu midpoint',
      },
      {
        type: 'fixed',
        description:
          'Missing API key now shows an actionable setup message instead of a broken map',
      },
    ],
  },
  {
    version: '0.2.0',
    date: '2026-09-11',
    summary: 'Remote data, request caching and progressive image loading.',
    changes: [
      {
        type: 'added',
        description:
          'Places and gallery photos fetched from remote endpoints with TanStack Query and axios',
      },
      {
        type: 'added',
        description:
          'Progressive image pipeline: skeleton → low-res thumbnail → full image crossfade, with a fallback only when every source fails',
      },
      {
        type: 'added',
        description:
          'Category-driven badge colours and palettes taken from the API payload',
      },
      {
        type: 'fixed',
        description:
          'Proxy `/api` requests in `vite preview` so a production build can be checked locally',
      },
      {
        type: 'fixed',
        description: 'Prevent the lightbox image from collapsing in height',
      },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-09-10',
    summary: 'Single landing page grows into a routed multi-page app.',
    changes: [
      {
        type: 'added',
        description:
          'Client-side routing with React Router and a shared layout: Places, Gallery, Maps and About',
      },
      {
        type: 'added',
        description: 'Sticky bottom navigation on mobile, top navigation on desktop',
      },
      {
        type: 'added',
        description:
          'Place detail pages with deep-linkable slug URLs and image-backed destination cards',
      },
      {
        type: 'changed',
        description:
          'Landing page rebuilt on Chakra UI v3 primitives with dark and light colour modes',
      },
    ],
  },
  {
    version: '0.0.1',
    date: '2026-09-10',
    status: 'prerelease',
    summary: 'Local-only scaffold. Never published.',
    changes: [
      {
        type: 'added',
        description:
          'Project bootstrapped from the Vite React + TypeScript template with ESLint and strict TS setup',
      },
      {
        type: 'changed',
        description: 'Static hero and destinations sections hand-coded from mock data',
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
