import type { IconType } from 'react-icons'
import {
  LuBuilding2,
  LuCar,
  LuFerrisWheel,
  LuFlower2,
  LuMountain,
  LuPalette,
  LuWaves,
} from 'react-icons/lu'

export interface Place {
  id: string
  name: string
  location: string
  description: string
  icon: IconType
  colorPalette: string
  tag: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export const places: Place[] = [
  {
    id: 'mount-bromo',
    name: 'Mount Bromo',
    location: 'Bromo Tengger Semeru NP',
    description:
      'Catch the legendary sunrise over an active volcanic crater in the Sea of Sand.',
    icon: LuMountain,
    colorPalette: 'orange',
    tag: 'Nature',
    coordinates: { lat: -7.942494, lng: 112.95335 },
  },
  {
    id: 'jatim-park-3',
    name: 'Jatim Park 3',
    location: 'Batu',
    description:
      'A family-favorite theme park featuring Dino Park, infinity pools, and fun rides.',
    icon: LuFerrisWheel,
    colorPalette: 'pink',
    tag: 'Theme Park',
    coordinates: { lat: -7.844513, lng: 112.529713 },
  },
  {
    id: 'coban-rondo',
    name: 'Coban Rondo',
    location: 'Pujon, Malang',
    description:
      'An 84-meter waterfall surrounded by lush pine forests and a hedge maze.',
    icon: LuWaves,
    colorPalette: 'cyan',
    tag: 'Waterfall',
    coordinates: { lat: -7.879952, lng: 112.482361 },
  },
  {
    id: 'museum-angkut',
    name: 'Museum Angkut',
    location: 'Batu',
    description:
      "Southeast Asia's first transportation museum with 300+ vintage vehicle collections.",
    icon: LuCar,
    colorPalette: 'purple',
    tag: 'Museum',
    coordinates: { lat: -7.878672, lng: 112.519446 },
  },
  {
    id: 'selecta',
    name: 'Selecta',
    location: 'Batu',
    description:
      'A historic flower garden and recreation park dating back to the Dutch colonial era.',
    icon: LuFlower2,
    colorPalette: 'green',
    tag: 'Garden',
    coordinates: { lat: -7.814916, lng: 112.52549 },
  },
  {
    id: 'kampung-warna-warni',
    name: 'Kampung Warna-Warni',
    location: 'Jodipan, Malang',
    description:
      'A riverside village transformed into a colorful mural-filled photo hotspot.',
    icon: LuPalette,
    colorPalette: 'yellow',
    tag: 'Culture',
    coordinates: { lat: -7.983973, lng: 112.632499 },
  },
  {
    id: 'malang-city-hall',
    name: 'Malang City Hall',
    location: 'Merdeka Square, Malang',
    description:
      'The colonial-era city hall facing Malang’s iconic central square.',
    icon: LuBuilding2,
    colorPalette: 'gray',
    tag: 'Landmark',
    coordinates: { lat: -7.976563, lng: 112.622655 },
  },
]

export const regions = ['All', 'Malang', 'Batu'] as const

export const tags = [
  'All',
  'Nature',
  'Theme Park',
  'Waterfall',
  'Museum',
  'Garden',
  'Culture',
  'Landmark',
] as const
