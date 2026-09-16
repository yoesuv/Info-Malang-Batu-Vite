// ---------------------------------------------------------------------------
// Places DTO (raw API shape)
// ---------------------------------------------------------------------------

export interface PlacePayload {
  nama: string
  lokasi: string
  /** Lowercase category from the API, e.g. 'beach', 'theme park'. */
  category?: string
  deskripsi: string
  thumbnail: string
  gambar: string
}

// ---------------------------------------------------------------------------
// Gallery DTO (raw API shape)
// ---------------------------------------------------------------------------

export interface GalleryPayload {
  caption: string
  image: string
  thumbnail: string
}

// ---------------------------------------------------------------------------
// Map markers DTO (raw API shape)
// ---------------------------------------------------------------------------

export interface MapMarkerPayload {
  name: string
  /** Region code from the API (numeric, e.g. 1 = Malang). */
  lokasi: number
  latitude: number
  longitude: number
}
