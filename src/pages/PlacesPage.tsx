import {
  Badge,
  Box,
  Card,
  Container,
  HStack,
  Heading,
  Icon,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { LuSearch } from 'react-icons/lu'

import { PlaceImage } from '@/components/PlaceImage'
import { places, regions } from '@/data/places'

export default function PlacesPage() {
  const [search, setSearch] = useState('')
  const [activeRegion, setActiveRegion] = useState<string>('All')

  const filtered = useMemo(() => {
    return places.filter((place) => {
      const matchesSearch =
        search === '' ||
        place.nama.toLowerCase().includes(search.toLowerCase()) ||
        place.deskripsi.toLowerCase().includes(search.toLowerCase())
      const matchesRegion =
        activeRegion === 'All' || place.lokasi.includes(activeRegion)
      return matchesSearch && matchesRegion
    })
  }, [search, activeRegion])

  return (
    <Box py={{ base: '8', md: '12' }}>
      <Container maxW="6xl">
        <VStack gap="2" mb="8" textAlign="center">
          <Heading size={{ base: '2xl', md: '3xl' }} letterSpacing="tight">
            Tourist Places
          </Heading>
          <Text color="fg.muted" maxW="lg">
            Explore the best destinations across Malang and Batu.
          </Text>
        </VStack>

        {/* Search bar */}
        <Box maxW="md" mx="auto" mb="6">
          <Box position="relative">
            <Icon
              as={LuSearch}
              position="absolute"
              left="3"
              top="50%"
              transform="translateY(-50%)"
              color="fg.muted"
            />
            <Input
              placeholder="Search places..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              pl="10"
              variant="outline"
              size="lg"
            />
          </Box>
        </Box>

        {/* Region filter */}
        <HStack gap="2" flexWrap="wrap" justify="center" mb="8">
          <Text fontSize="sm" color="fg.muted" fontWeight="medium">
            Region:
          </Text>
          {regions.map((region) => (
            <Badge
              key={region}
              variant={activeRegion === region ? 'solid' : 'subtle'}
              colorPalette={activeRegion === region ? 'teal' : 'gray'}
              cursor="pointer"
              px="3"
              py="1"
              borderRadius="full"
              onClick={() => setActiveRegion(region)}
            >
              {region}
            </Badge>
          ))}
        </HStack>

        {/* Results */}
        {filtered.length === 0 ? (
          <Text textAlign="center" color="fg.muted" py="12">
            No places found matching your filters.
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
            {filtered.map((place) => (
              <Link
                key={place.id}
                to={`/places/${place.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card.Root
                  variant="outline"
                  overflow="hidden"
                  h="full"
                  transition="all 0.2s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    shadow: 'lg',
                    borderColor: 'teal.300',
                  }}
                >
                  <PlaceImage
                    src={place.thumbnail || undefined}
                    alt={place.nama}
                    icon={place.icon}
                    colorPalette={place.colorPalette}
                  />
                  <Card.Body gap="3">
                    <HStack justify="space-between" align="start">
                      <Box>
                        <Card.Title mb="1">{place.nama}</Card.Title>
                        <Text fontSize="sm" color="fg.subtle" mb="2">
                          {place.lokasi}
                        </Text>
                      </Box>
                      {place.tag && (
                        <Badge
                          colorPalette={place.colorPalette ?? 'gray'}
                          variant="subtle"
                          flexShrink="0"
                        >
                          {place.tag}
                        </Badge>
                      )}
                    </HStack>
                    <Card.Description lineClamp={2}>
                      {place.deskripsi}
                    </Card.Description>
                  </Card.Body>
                </Card.Root>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}
