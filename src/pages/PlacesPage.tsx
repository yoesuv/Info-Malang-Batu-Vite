import {
  Alert,
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Input,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { LuSearch, LuTriangleAlert } from 'react-icons/lu'

import { usePlacesQuery } from '@/api/places'
import { PlaceCard } from '@/components/PlaceCard'
import { regions } from '@/data/places'
import type { PlaceRegion } from '@/types'

const GRID_COLUMNS = { base: 1, md: 2, lg: 3 } as const

function PlaceCardSkeleton() {
  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      borderRadius="md"
      overflow="hidden"
    >
      <Skeleton h="200px" />
      <Box p="4" display="grid" gap="3">
        <Skeleton h="5" w="60%" />
        <Skeleton h="4" w="35%" />
        <Skeleton h="4" w="90%" />
        <Skeleton h="4" w="70%" />
      </Box>
    </Box>
  )
}

export default function PlacesPage() {
  const [search, setSearch] = useState('')
  const [activeRegion, setActiveRegion] = useState<PlaceRegion>('all')

  const { data: places, isPending, isError, error, refetch } =
    usePlacesQuery(activeRegion)

  const filtered = useMemo(() => {
    if (!places) return []
    const keyword = search.trim().toLowerCase()
    if (keyword === '') return places
    return places.filter(
      (place) =>
        place.nama.toLowerCase().includes(keyword) ||
        place.deskripsi.toLowerCase().includes(keyword),
    )
  }, [places, search])

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

        {/* Region filter — each option hits its own API endpoint */}
        <HStack gap="2" flexWrap="wrap" justify="center" mb="8">
          <Text fontSize="sm" color="fg.muted" fontWeight="medium">
            Region:
          </Text>
          {regions.map(({ value, label }) => (
            <Badge
              key={value}
              variant={activeRegion === value ? 'solid' : 'subtle'}
              colorPalette={activeRegion === value ? 'teal' : 'gray'}
              cursor="pointer"
              px="3"
              py="1"
              borderRadius="full"
              onClick={() => setActiveRegion(value)}
            >
              {label}
            </Badge>
          ))}
        </HStack>

        {/* Results */}
        {isPending ? (
          <SimpleGrid columns={GRID_COLUMNS} gap="6">
            {Array.from({ length: 6 }, (_, i) => (
              <PlaceCardSkeleton key={i} />
            ))}
          </SimpleGrid>
        ) : isError ? (
          <Alert.Root status="error" textAlign="center" py="12">
            <Alert.Indicator>
              <LuTriangleAlert />
            </Alert.Indicator>
            <Alert.Content>
              <Alert.Title>Failed to load places</Alert.Title>
              <Alert.Description>
                {error instanceof Error
                  ? error.message
                  : 'Something went wrong while fetching the list.'}
              </Alert.Description>
              <Button
                size="sm"
                colorPalette="teal"
                mt="2"
                onClick={() => refetch()}
              >
                Try again
              </Button>
            </Alert.Content>
          </Alert.Root>
        ) : filtered.length === 0 ? (
          <Text textAlign="center" color="fg.muted" py="12">
            No places found matching your search.
          </Text>
        ) : (
          <SimpleGrid columns={GRID_COLUMNS} gap="6">
            {filtered.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}
