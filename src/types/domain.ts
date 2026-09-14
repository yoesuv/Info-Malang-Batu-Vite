import type { IconType } from 'react-icons'

// ---------------------------------------------------------------------------
// Places
// ---------------------------------------------------------------------------

/** Region keys map 1:1 with the API endpoints. */
export type PlaceRegion = 'all' | 'kab-malang' | 'kota-malang' | 'kota-batu'

export interface Place {
  /** Stable id derived from `nama` (slug). Unique across the dataset. */
  id: string
  nama: string
  lokasi: string
  deskripsi: string
  /** May be an empty string when the API has no image. */
  thumbnail: string
  /** May be an empty string when the API has no image. */
  gambar: string
  /** Region derived from `lokasi` — use this for filtering. */
  region: PlaceRegion
  /** Normalized category label from the API, e.g. 'Beach', 'Theme Park'. */
  tag?: string
  colorPalette?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export interface GalleryItem {
  /** Stable id derived from `caption` (slug). */
  id: string
  caption: string
  /** Full-size image — used for both grid and lightbox. May be empty. */
  image: string
  /** Fallback when `image` is empty. May be empty. */
  thumbnail: string
}

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
}

export interface Library {
  name: string
  url: string
  description: string
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string
  href: string
  icon: IconType
}
