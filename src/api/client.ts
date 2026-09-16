import axios from 'axios'

/**
 * Base URL for all API requests. Reuse `api` for any future endpoints.
 *
 * Always '/api' (unless VITE_API_BASE_URL is set):
 *
 * - Dev & `vite preview`: the Vite proxy (see vite.config.ts) forwards
 *   /api/* to Firebase, so the browser stays same-origin and Firebase's
 *   missing CORS headers don't matter.
 * - Prod (deployed on Firebase Hosting): a rewrite in firebase.json strips
 *   the /api prefix, so /api/List_place_....json is served from the root
 *   JSON files — still same-origin, no CORS needed.
 *
 * Deploying the app to a DIFFERENT host? Set VITE_API_BASE_URL (e.g. the
 * full Firebase URL) — but that host must then send
 * `Access-Control-Allow-Origin` (add `headers` to firebase.json).
 */
const envBaseURL: string | undefined = import.meta.env.VITE_API_BASE_URL

export const API_BASE_URL: string = envBaseURL ?? '/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    Accept: 'application/json',
  },
})
