import type { IconType } from 'react-icons'

/** Region keys map 1:1 with the API endpoints. */
export type PlaceRegion = 'all' | 'kab-malang' | 'kota-malang' | 'kota-batu'

/** Display options for region filters (label + endpoint key). */
export const regions: ReadonlyArray<{ value: PlaceRegion; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'kab-malang', label: 'Kab. Malang' },
  { value: 'kota-malang', label: 'Kota Malang' },
  { value: 'kota-batu', label: 'Kota Batu' },
]

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
  icon?: IconType
  colorPalette?: string
  tag?: string
  coordinates?: {
    lat: number
    lng: number
  }
}
