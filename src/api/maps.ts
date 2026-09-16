import { useQuery } from '@tanstack/react-query'

import { api } from '@/api/client'
import type { MapMarker, MapMarkerPayload } from '@/types'

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------

const MAPS_ENDPOINT = '/Maps_Malang_Batu.json'

// ---------------------------------------------------------------------------
// Mapping: DTO -> domain model
// ---------------------------------------------------------------------------

/** Deterministic id so markers are stable across reloads. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function toMapMarker(payload: MapMarkerPayload, index: number): MapMarker {
  return {
    id: slugify(payload.name) || `marker-${index}`,
    name: payload.name,
    lokasi: payload.lokasi,
    position: {
      lat: payload.latitude,
      lng: payload.longitude,
    },
  }
}

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------

export const mapsKeys = {
  all: () => ['maps'] as const,
  markers: () => ['maps', 'markers'] as const,
}

// ---------------------------------------------------------------------------
// Fetchers + hooks
// ---------------------------------------------------------------------------

async function fetchMarkers(): Promise<MapMarker[]> {
  const { data } = await api.get<MapMarkerPayload[]>(MAPS_ENDPOINT)
  return data.map(toMapMarker)
}

const STALE_TIME = 10 * 60 * 1000 // 10 minutes — static JSON dataset

/** List of map markers for Malang & Batu. */
export function useMapMarkersQuery() {
  return useQuery({
    queryKey: mapsKeys.markers(),
    queryFn: fetchMarkers,
    staleTime: STALE_TIME,
  })
}
