import { places } from './places'

export interface GalleryItem {
  id: string
  title: string
  caption: string
  icon: (typeof places)[number]['icon']
  colorPalette: string
}

// Gallery reuses place imagery placeholders — replace with real photo URLs later
export const galleryItems: GalleryItem[] = places.map((place) => ({
  id: place.id,
  title: place.name,
  caption: place.tag,
  icon: place.icon,
  colorPalette: place.colorPalette,
}))
