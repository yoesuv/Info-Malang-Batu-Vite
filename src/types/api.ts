import type { IconType } from 'react-icons'

// ---------------------------------------------------------------------------
// Places DTO (raw API shape)
// ---------------------------------------------------------------------------

export interface PlacePayload {
  nama: string
  lokasi: string
  deskripsi: string
  thumbnail: string
  gambar: string
}

export interface PlaceStyle {
  icon: IconType
  colorPalette: string
  tag: string
}

// ---------------------------------------------------------------------------
// Gallery DTO (raw API shape)
// ---------------------------------------------------------------------------

export interface GalleryPayload {
  caption: string
  image: string
  thumbnail: string
}
