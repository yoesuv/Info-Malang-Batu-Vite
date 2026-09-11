import type { PlaceRegion } from '@/types'

/** Display options for region filters (label + endpoint key). */
export const regions: ReadonlyArray<{ value: PlaceRegion; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'kab-malang', label: 'Kab. Malang' },
  { value: 'kota-malang', label: 'Kota Malang' },
  { value: 'kota-batu', label: 'Kota Batu' },
]
