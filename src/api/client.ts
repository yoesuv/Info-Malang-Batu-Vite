import axios from 'axios'

/**
 * Base URL for all API requests. Reuse `api` for any future endpoints.
 *
 * - Dev:  '/api' — requests go through the Vite proxy (see vite.config.ts),
 *   so the browser stays same-origin and Firebase's missing CORS headers
 *   don't matter.
 * - Prod: '/' — the app is deployed on the same Firebase Hosting that serves
 *   the JSON files, so same-origin relative paths work with no CORS at all.
 *
 * Deploying the app to a DIFFERENT host? Set VITE_API_BASE_URL (e.g. the
 * full Firebase URL) — but that host must then send
 * `Access-Control-Allow-Origin` (add `headers` to firebase.json).
 */
const envBaseURL: string | undefined = import.meta.env.VITE_API_BASE_URL

export const API_BASE_URL: string = envBaseURL ?? (import.meta.env.DEV ? '/api' : '/')

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    Accept: 'application/json',
  },
})
