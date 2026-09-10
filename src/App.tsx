import { Box } from '@chakra-ui/react'
import { Destinations } from '@/components/Destinations'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Highlights } from '@/components/Highlights'
import { Navbar } from '@/components/Navbar'

function App() {
  return (
    <Box minH="100dvh">
      <Navbar />
      <main>
        <Hero />
        <Destinations />
        <Highlights />
      </main>
      <Footer />
    </Box>
  )
}

export default App
