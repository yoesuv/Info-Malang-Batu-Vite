import { places } from './places'

export interface GalleryItem {
  caption: string
  thumbnail: string
  image: string
}

export const galleryItems: GalleryItem[] = places.map((place) => ({
  caption: place.nama,
  thumbnail: place.thumbnail,
  image: place.gambar || place.thumbnail,
}))
