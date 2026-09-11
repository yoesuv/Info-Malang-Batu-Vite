import { useQuery } from '@tanstack/react-query'

import { api } from '@/api/client'
import type { GalleryItem, GalleryPayload } from '@/types'

// ---------------------------------------------------------------------------
// Endpoint
// ---------------------------------------------------------------------------

const GALLERY_ENDPOINT = '/Gallery_Malang_Batu.json'

// ---------------------------------------------------------------------------
// Mapping: DTO -> domain model
// ---------------------------------------------------------------------------

/** Deterministic id so lightbox state stays stable across reloads. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function toGalleryItem(payload: GalleryPayload, index: number): GalleryItem {
  return {
    id: slugify(payload.caption) || `gallery-${index}`,
    caption: payload.caption,
    image: payload.image ?? '',
    thumbnail: payload.thumbnail ?? '',
  }
}

// ---------------------------------------------------------------------------
// Query keys + hook
// ---------------------------------------------------------------------------

export const galleryKeys = {
  all: () => ['gallery'] as const,
}

const STALE_TIME = 10 * 60 * 1000 // 10 minutes — static JSON dataset

export function useGalleryQuery() {
  return useQuery({
    queryKey: galleryKeys.all(),
    queryFn: async () => {
      const { data } = await api.get<GalleryPayload[]>(GALLERY_ENDPOINT)
      return data.map(toGalleryItem)
    },
    staleTime: STALE_TIME,
  })
}
