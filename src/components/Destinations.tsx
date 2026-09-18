import { useMemo } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Link } from 'react-router'
import { LuArrowRight } from 'react-icons/lu'

import { usePlacesQuery } from '@/api/places'
import { PlaceCard } from '@/components/PlaceCard'

const PREVIEW_COUNT = 6

/** Fisher–Yates shuffle, then take the first `count` items. */
function sampleRandom<T>(items: T[], count: number): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, count)
}

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
      </Box>
    </Box>
  )
}

export function Destinations() {
  const { data: places, isPending } = usePlacesQuery('all')
  // Shuffle only when data arrives, not on every re-render.
  const preview = useMemo(
    () => sampleRandom(places ?? [], PREVIEW_COUNT),
    [places],
  )

  return (
    <Box as="section" py={{ base: '8', md: '12' }}>
      <Container maxW="6xl">
        <VStack gap="2" textAlign="center" mb="6">
          <Heading
            as="h2"
            size={{ base: 'xl', md: '2xl' }}
            letterSpacing="tight"
          >
            Popular destinations
          </Heading>
          <Text color="fg.muted" maxW="xl">
            Hand-picked spots across Malang and Batu for every kind of traveler.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
          {isPending
            ? Array.from({ length: PREVIEW_COUNT }, (_, i) => (
                <PlaceCardSkeleton key={i} />
              ))
            : preview.map((place) => (
                <PlaceCard key={place.id} place={place} lineClamp />
              ))}
        </SimpleGrid>

        <VStack mt="6">
          <Button asChild colorPalette="teal" variant="subtle">
            <Link to="/places">
              View all places <LuArrowRight />
            </Link>
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}
