import type { IconType } from 'react-icons'

import type { Place } from '@/data/places'

export interface PlaceImageProps {
  src?: string
  alt: string
  /** CSS aspect-ratio value, e.g. '4/3' (default) or '16/9' */
  ratio?: string
  /** Icon used in the placeholder fallback when src is empty or fails */
  icon?: IconType
  /** Color palette used for the placeholder fallback */
  colorPalette?: string
}

export interface PlaceCardProps {
  place: Place
  /** Limit description to 2 lines (list views). */
  lineClamp?: boolean
}

export interface GalleryImageProps {
  src: string
  alt: string
  /** Grid images lazy-load + async decode; lightbox loads eagerly. */
  lazy?: boolean
  className?: string
}
