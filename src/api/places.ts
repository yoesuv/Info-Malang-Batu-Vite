import { useQuery } from '@tanstack/react-query'
import type { IconType } from 'react-icons'
import {
  LuBuilding2,
  LuCastle,
  LuChurch,
  LuDroplets,
  LuFerrisWheel,
  LuFlower2,
  LuHouse,
  LuLandmark,
  LuLeaf,
  LuMountain,
  LuPalette,
  LuShoppingBag,
  LuShoppingBasket,
  LuSun,
  LuTag,
  LuWaves,
  LuWheat,
  LuWind,
} from 'react-icons/lu'

import { api } from '@/api/client'
import type { Place, PlacePayload, PlaceRegion } from '@/types'

type CategoryStyle = { icon: IconType; colorPalette: string }

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

/** Icon + palette keyed by the raw (lowercase) API category. */
const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  beach: { icon: LuSun, colorPalette: 'sky' },
  waterfall: { icon: LuWaves, colorPalette: 'cyan' },
  mountain: { icon: LuMountain, colorPalette: 'orange' },
  nature: { icon: LuLeaf, colorPalette: 'green' },
  museum: { icon: LuLandmark, colorPalette: 'purple' },
  'theme park': { icon: LuFerrisWheel, colorPalette: 'pink' },
  'recreation park': { icon: LuFerrisWheel, colorPalette: 'pink' },
  'water park': { icon: LuDroplets, colorPalette: 'cyan' },
  garden: { icon: LuFlower2, colorPalette: 'green' },
  plantation: { icon: LuWheat, colorPalette: 'lime' },
  mall: { icon: LuShoppingBag, colorPalette: 'violet' },
  market: { icon: LuShoppingBasket, colorPalette: 'violet' },
  'city square': { icon: LuCastle, colorPalette: 'teal' },
  'heritage street': { icon: LuBuilding2, colorPalette: 'yellow' },
  'cultural village': { icon: LuPalette, colorPalette: 'yellow' },
  village: { icon: LuHouse, colorPalette: 'lime' },
  reservoir: { icon: LuDroplets, colorPalette: 'cyan' },
  'hot spring': { icon: LuDroplets, colorPalette: 'orange' },
  religious: { icon: LuChurch, colorPalette: 'indigo' },
  'outdoor adventure': { icon: LuWind, colorPalette: 'blue' },
}

const FALLBACK_CATEGORY_STYLE: CategoryStyle = {
  icon: LuTag,
  colorPalette: 'gray',
}

/** Category from the API -> badge label + icon/palette. */
function toStyle(category: string | undefined): {
  tag: string
  icon: IconType
  colorPalette: string
} {
  if (!category) {
    return { ...FALLBACK_CATEGORY_STYLE, tag: 'Place' }
  }
  const key = category.trim().toLowerCase()
  const style = CATEGORY_STYLES[key] ?? FALLBACK_CATEGORY_STYLE
  return { ...style, tag: normalizeCategory(category) }
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
