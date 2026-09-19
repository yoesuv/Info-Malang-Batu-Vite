# Info Malang Batu

Info Malang Batu is a web application that provides information about tourist destinations in Malang and Batu, East Java, Indonesia. It lets visitors browse places of interest, view detailed information and photo galleries, and explore destinations on an interactive map. The app fetches its data from a Firebase-hosted JSON API and is built as a fast, modern single-page application with React, TypeScript, and Vite.

## Screenshot

| ![](https://i.imgur.com/0Dhfv5p.png) | ![](https://i.imgur.com/7Bih2sG.png) |
| :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/JQmNR2d.png) | ![](https://i.imgur.com/sOshjIO.png) |

## Tech Stack

- [React](https://react.dev) 19 + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) — dev server & build tool
- [Chakra UI](https://chakra-ui.com) — component library & theming
- [TanStack Query](https://tanstack.com/query) — data fetching & caching
- [React Router](https://reactrouter.com) — client-side routing
- [React Google Maps](https://visgl.github.io/react-google-maps/) — interactive maps
- [Axios](https://axios-http.com) — HTTP client
- [ESLint](https://eslint.org) — linting

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS recommended)
- A Google Maps API key (for the Maps page)

### Installation

1. Clone the repository and install dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file in the project root with your Google Maps API key (see `.env.example`):

   ```sh
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

   Optionally, set a custom API base URL if you deploy the data to a different host:

   ```sh
   VITE_API_BASE_URL=https://your-host.example.com
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

   The app is served at `http://localhost:5173`. Requests to `/api/*` are proxied to the Firebase host, so no CORS setup is needed in development.

### Other Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint over the codebase         |

## Project Structure

```
src/
├── api/         # API client & data fetching (React Query)
├── assets/      # Static assets
├── components/  # Shared UI components (Navbar, Footer, PlaceCard, ...)
├── data/        # Local/static data
├── pages/       # Route pages (Home, Places, Gallery, Maps, About)
└── types/       # TypeScript types
```
