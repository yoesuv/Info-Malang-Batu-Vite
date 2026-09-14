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
