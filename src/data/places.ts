import type { IconType } from 'react-icons'
import {
  LuCar,
  LuFerrisWheel,
  LuFlower2,
  LuMountain,
  LuPalette,
  LuSparkles,
  LuWaves,
} from 'react-icons/lu'

export interface Place {
  id: string
  nama: string
  lokasi: string
  deskripsi: string
  thumbnail: string
  gambar: string
  icon?: IconType
  colorPalette?: string
  tag?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export const places: Place[] = [
  {
    id: 'alun-alun-malang',
    nama: 'Alun Alun Malang',
    lokasi: 'Kota Malang',
    deskripsi:
      'alun alun ini baru saja dipermak pada tahun 2015. yang sebelumnya terlihat semrawut sekarang menjadi lebih tertata.',
    thumbnail:
      'https://lh3.googleusercontent.com/-7To0y-nnYak/VqQYjBWAwoI/AAAAAAAACf8/r_sAJ-dgsL8/s250-Ic42/thumbnail_alun_alun_malang.jpg',
    gambar:
      'https://lh3.googleusercontent.com/-rTHiiW3vPMk/VqQXrbG5u6I/AAAAAAAACfs/buFhkMyTN98/s600-Ic42/alun_alun_malang.jpg',
    icon: LuSparkles,
    colorPalette: 'teal',
    tag: 'Landmark',
    coordinates: { lat: -7.976563, lng: 112.622655 },
  },
  {
    id: 'mount-bromo',
    nama: 'Mount Bromo',
    lokasi: 'Bromo Tengger Semeru NP',
    deskripsi:
      'Iconic active volcano famous for its legendary sunrise views over the crater in the Sea of Sand.',
    thumbnail: '',
    gambar: '',
    icon: LuMountain,
    colorPalette: 'orange',
    tag: 'Nature',
    coordinates: { lat: -7.942494, lng: 112.95335 },
  },
  {
    id: 'jatim-park-3',
    nama: 'Jatim Park 3',
    lokasi: 'Batu',
    deskripsi:
      'Family-favorite theme park featuring Dino Park, infinity pools, and fun interactive rides.',
    thumbnail: '',
    gambar: '',
    icon: LuFerrisWheel,
    colorPalette: 'pink',
    tag: 'Theme Park',
    coordinates: { lat: -7.844513, lng: 112.529713 },
  },
  {
    id: 'coban-rondo',
    nama: 'Coban Rondo',
    lokasi: 'Pujon, Malang',
    deskripsi:
      'An 84-meter waterfall surrounded by lush pine forests and a hedge maze.',
    thumbnail: '',
    gambar: '',
    icon: LuWaves,
    colorPalette: 'cyan',
    tag: 'Waterfall',
    coordinates: { lat: -7.879952, lng: 112.482361 },
  },
  {
    id: 'museum-angkut',
    nama: 'Museum Angkut',
    lokasi: 'Batu',
    deskripsi:
      "Southeast Asia's first transportation museum with 300+ vintage vehicle collections.",
    thumbnail: '',
    gambar: '',
    icon: LuCar,
    colorPalette: 'purple',
    tag: 'Museum',
    coordinates: { lat: -7.878672, lng: 112.519446 },
  },
  {
    id: 'selecta',
    nama: 'Selecta',
    lokasi: 'Batu',
    deskripsi:
      'A historic flower garden and recreation park dating back to the Dutch colonial era.',
    thumbnail: '',
    gambar: '',
    icon: LuFlower2,
    colorPalette: 'green',
    tag: 'Garden',
    coordinates: { lat: -7.814916, lng: 112.52549 },
  },
  {
    id: 'kampung-warna-warni',
    nama: 'Kampung Warna-Warni',
    lokasi: 'Jodipan, Malang',
    deskripsi:
      'A riverside village transformed into a colorful mural-filled photo hotspot.',
    thumbnail: '',
    gambar: '',
    icon: LuPalette,
    colorPalette: 'yellow',
    tag: 'Culture',
    coordinates: { lat: -7.983973, lng: 112.632499 },
  },
]

export const regions = ['All', 'Malang', 'Batu'] as const
