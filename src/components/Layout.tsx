import { Box } from '@chakra-ui/react'
import { Outlet, ScrollRestoration } from 'react-router'

import { BottomNav } from '@/components/BottomNav'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export function Layout() {
  return (
    <Box minH="100dvh">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <ScrollRestoration />
    </Box>
  )
}
