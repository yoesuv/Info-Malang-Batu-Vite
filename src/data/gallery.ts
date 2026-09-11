export interface GalleryItem {
  /** Stable id derived from `caption` (slug). */
  id: string
  caption: string
  /** Full-size image — used for both grid and lightbox. May be empty. */
  image: string
  /** Fallback when `image` is empty. May be empty. */
  thumbnail: string
}
