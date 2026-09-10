import { createBrowserRouter, RouterProvider } from 'react-router'

import { Layout } from '@/components/Layout'
import AboutPage from '@/pages/AboutPage'
import GalleryPage from '@/pages/GalleryPage'
import HomePage from '@/pages/HomePage'
import MapsPage from '@/pages/MapsPage'
import PlaceDetailPage from '@/pages/PlaceDetailPage'
import PlacesPage from '@/pages/PlacesPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'places', Component: PlacesPage },
      { path: 'places/:id', Component: PlaceDetailPage },
      { path: 'gallery', Component: GalleryPage },
      { path: 'maps', Component: MapsPage },
      { path: 'about', Component: AboutPage },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
