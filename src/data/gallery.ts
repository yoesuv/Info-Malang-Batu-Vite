import type { Place } from './places'

export interface GalleryItem {
  id: string
  caption: string
  thumbnail: string
  image: string
}

/**
 * Derive gallery items from places that actually have an image.
 * (The API returns many places with empty `thumbnail`/`gambar`.)
 */
export function toGalleryItems(places: Place[]): GalleryItem[] {
  return places
    .filter((place) => place.thumbnail || place.gambar)
    .map((place) => ({
      id: place.id,
      caption: place.nama,
      thumbnail: place.thumbnail || place.gambar,
      image: place.gambar || place.thumbnail,
    }))
}
