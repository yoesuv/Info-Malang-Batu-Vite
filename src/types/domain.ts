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
// Map markers
// ---------------------------------------------------------------------------

export interface MapMarker {
  /** Stable id derived from `name` (slug). */
  id: string
  name: string
  /** Region code from the API (numeric). */
  lokasi: number
  position: {
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

/** Keep-a-Changelog style categories, rendered as colored badges. */
export type ChangelogChangeType =
  | 'added'
  | 'changed'
  | 'improved'
  | 'fixed'
  | 'removed'

export interface ChangelogChange {
  type: ChangelogChangeType
  description: string
}

export type ChangelogStatus = 'current' | 'released' | 'prerelease'

export interface ChangelogEntry {
  version: string
  /** ISO date (`YYYY-MM-DD`) of the release. */
  date: string
  /** One-line summary shown under the version heading. */
  summary?: string
  /** Optional; defaults to `released`. Use `prerelease` for unreleased work. */
  status?: ChangelogStatus
  changes: ChangelogChange[]
}

/** Buckets used to group the Libraries tab into readable sections. */
export type LibraryCategory = 'framework' | 'ui' | 'data' | 'tooling'

export interface Library {
  name: string
  url: string
  description: string
  /** Installed version, kept in sync with `package-lock.json`. */
  version: string
  category: LibraryCategory
  /** Chakra palette token used for the tile accent. */
  colorPalette: string
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string
  href: string
  icon: IconType
}
