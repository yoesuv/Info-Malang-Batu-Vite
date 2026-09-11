import { useQuery } from '@tanstack/react-query'
import type { IconType } from 'react-icons'
import {
  LuCastle,
  LuChurch,
  LuDroplets,
  LuFerrisWheel,
  LuFlower2,
  LuLandmark,
  LuMountain,
  LuPalette,
  LuShoppingBag,
  LuSun,
  LuTreeDeciduous,
  LuWaves,
  LuWind,
} from 'react-icons/lu'

import { api } from '@/api/client'
import type { Place, PlaceRegion } from '@/data/places'

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
// DTO (raw API shape)
// ---------------------------------------------------------------------------

export interface PlacePayload {
  nama: string
  lokasi: string
  deskripsi: string
  thumbnail: string
  gambar: string
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

interface PlaceStyle {
  icon: IconType
  colorPalette: string
  tag: string
}

/** First matching rule wins — keep more specific keywords earlier. */
const STYLE_RULES: ReadonlyArray<{ keywords: string[]; style: PlaceStyle }> = [
  {
    keywords: ['pantai'],
    style: { icon: LuSun, colorPalette: 'sky', tag: 'Beach' },
  },
  {
    keywords: ['coban', 'air terjun'],
    style: { icon: LuWaves, colorPalette: 'cyan', tag: 'Waterfall' },
  },
  {
    keywords: ['gunung', 'bromo', 'semeru'],
    style: { icon: LuMountain, colorPalette: 'orange', tag: 'Nature' },
  },
  {
    keywords: ['museum'],
    style: { icon: LuLandmark, colorPalette: 'purple', tag: 'Museum' },
  },
  {
    keywords: ['paralayang'],
    style: { icon: LuWind, colorPalette: 'blue', tag: 'Adventure' },
  },
  {
    keywords: ['park', 'spectacular', 'wonderland'],
    style: { icon: LuFerrisWheel, colorPalette: 'pink', tag: 'Theme Park' },
  },
  {
    keywords: ['kebun', 'selecta', 'taman'],
    style: { icon: LuFlower2, colorPalette: 'green', tag: 'Garden' },
  },
  {
    keywords: ['mall', 'plaza', 'square', 'pasar', 'sarina'],
    style: { icon: LuShoppingBag, colorPalette: 'violet', tag: 'Shopping' },
  },
  {
    keywords: ['alun', 'tugu'],
    style: { icon: LuCastle, colorPalette: 'teal', tag: 'Landmark' },
  },
  {
    keywords: ['kampung'],
    style: { icon: LuPalette, colorPalette: 'yellow', tag: 'Culture' },
  },
  {
    keywords: ['desa wisata'],
    style: { icon: LuTreeDeciduous, colorPalette: 'lime', tag: 'Cultural Village' },
  },
  {
    keywords: ['waduk'],
    style: { icon: LuDroplets, colorPalette: 'cyan', tag: 'Lake' },
  },
  {
    keywords: ['masjid', 'griya'],
    style: { icon: LuChurch, colorPalette: 'indigo', tag: 'Religion' },
  },
]

function inferStyle(nama: string): PlaceStyle | undefined {
  const name = nama.toLowerCase()
  const rule = STYLE_RULES.find(({ keywords }) =>
    keywords.some((keyword) => name.includes(keyword)),
  )
  return rule?.style
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
    ...inferStyle(payload.nama),
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
