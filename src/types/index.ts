import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'

import type { Place } from './domain'

export * from './api'
export * from './domain'

export interface ProgressiveImageProps {
  /** Full-quality image — loaded last, crossfades in on top. */
  src?: string
  /** Lightweight placeholder shown after the skeleton while `src` loads. */
  thumbnailSrc?: string
  alt: string
  /** Lazy-load + async decode (default); use eager for above-the-fold/lightbox. */
  lazy?: boolean
  /** Rendered when every available source fails to load. */
  fallback?: ReactNode
}

export interface PlaceImageProps {
  /** Full-quality image (`gambar`) — loaded last, crossfades in on top. */
  src?: string
  /** Lightweight placeholder shown after the skeleton while `src` loads. */
  thumbnailSrc?: string
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
  /** Full-size image — crossfades in once loaded. May be empty. */
  src: string
  /** Lightweight placeholder shown after the skeleton while `src` loads. */
  thumbnailSrc?: string
  alt: string
  /** Grid images lazy-load + async decode; lightbox loads eagerly. */
  lazy?: boolean
  className?: string
}
