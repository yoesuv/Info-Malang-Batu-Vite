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
  const preview = (places ?? []).slice(0, PREVIEW_COUNT)

  return (
    <Box as="section" py={{ base: '12', md: '20' }}>
      <Container maxW="6xl">
        <VStack gap="3" textAlign="center" mb="10">
          <Heading
            as="h2"
            size={{ base: '2xl', md: '3xl' }}
            letterSpacing="tight"
          >
            Popular destinations
          </Heading>
          <Text color="fg.muted" maxW="xl">
            Hand-picked spots across Malang and Batu for every kind of traveler.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {isPending
            ? Array.from({ length: PREVIEW_COUNT }, (_, i) => (
                <PlaceCardSkeleton key={i} />
              ))
            : preview.map((place) => (
                <PlaceCard key={place.id} place={place} lineClamp={false} />
              ))}
        </SimpleGrid>

        <VStack mt="10">
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
