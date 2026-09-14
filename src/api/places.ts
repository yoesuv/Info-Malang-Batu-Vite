import { useQuery } from '@tanstack/react-query'

import { api } from '@/api/client'
import type { Place, PlacePayload, PlaceRegion } from '@/types'

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------

const PLACES_ENDPOINTS: Record<PlaceRegion, string> = {
  all: '/List_place_malang_batu.json',
  'kab-malang': '/List_place_kab_malang.json',
  'kota-malang': '/List_place_kota_malang.json',
  'kota-batu': '/List_place_kota_batu.json',
}

// ---------------------------------------------------------------------------
// Mapping: DTO -> domain model
// ---------------------------------------------------------------------------

/** Deterministic id so routes (`/places/:id`) are stable across reloads. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

/** `lokasi` values from the API -> region key. */
function toRegion(lokasi: string): PlaceRegion {
  const value = lokasi.toLowerCase()
  if (value.includes('batu')) return 'kota-batu'
  if (value.includes('kab')) return 'kab-malang'
  if (value.includes('kota malang')) return 'kota-malang'
  return 'all'
}

/** 'theme park' -> 'Theme Park', 'beach' -> 'Beach'. */
function normalizeCategory(category: string): string {
  return category
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/** Badge palette keyed by the raw (lowercase) API category. */
const CATEGORY_COLOR_PALETTES: Record<string, string> = {
  beach: 'sky',
  waterfall: 'cyan',
  mountain: 'orange',
  nature: 'green',
  museum: 'purple',
  'theme park': 'pink',
  'recreation park': 'pink',
  'water park': 'cyan',
  garden: 'green',
  plantation: 'lime',
  mall: 'violet',
  market: 'violet',
  'city square': 'teal',
  'heritage street': 'yellow',
  'cultural village': 'yellow',
  village: 'lime',
  reservoir: 'cyan',
  'hot spring': 'orange',
  religious: 'indigo',
  'outdoor adventure': 'blue',
}

const FALLBACK_COLOR_PALETTE = 'gray'

/** Category from the API -> badge label + color palette. */
function toStyle(category: string | undefined): {
  tag: string
  colorPalette: string
} {
  if (!category) {
    return { tag: 'Place', colorPalette: FALLBACK_COLOR_PALETTE }
  }
  const key = category.trim().toLowerCase()
  return {
    tag: normalizeCategory(category),
    colorPalette: CATEGORY_COLOR_PALETTES[key] ?? FALLBACK_COLOR_PALETTE,
  }
}

export function toPlace(payload: PlacePayload, index: number): Place {
  return {
    id: slugify(payload.nama) || `place-${index}`,
    nama: payload.nama,
    lokasi: payload.lokasi,
    deskripsi: payload.deskripsi,
    thumbnail: payload.thumbnail ?? '',
    gambar: payload.gambar ?? '',
    region: toRegion(payload.lokasi),
    ...toStyle(payload.category),
  }
}

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------

export const placesKeys = {
  all: () => ['places'] as const,
  byRegion: (region: PlaceRegion) => ['places', region] as const,
}

// ---------------------------------------------------------------------------
// Fetchers + hooks
// ---------------------------------------------------------------------------

async function fetchPlaces(region: PlaceRegion): Promise<Place[]> {
  const { data } = await api.get<PlacePayload[]>(PLACES_ENDPOINTS[region])
  return data.map(toPlace)
}

const STALE_TIME = 10 * 60 * 1000 // 10 minutes — static JSON dataset

/**
 * List places, optionally scoped to a region.
 * Each region maps to its own endpoint + cache entry.
 */
export function usePlacesQuery(region: PlaceRegion = 'all') {
  return useQuery({
    queryKey: placesKeys.byRegion(region),
    queryFn: () => fetchPlaces(region),
    staleTime: STALE_TIME,
  })
}

/**
 * Single place by id — resolves against the full list (same cache as
 * `usePlacesQuery('all')`, so navigating from the list adds no extra request).
 */
export function usePlaceQuery(id: string | undefined) {
  const query = usePlacesQuery('all')
  return {
    ...query,
    place: id ? (query.data ?? []).find((p) => p.id === id) : undefined,
  }
}
