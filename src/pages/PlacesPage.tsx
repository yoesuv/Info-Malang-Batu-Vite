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
import { LuSearch } from 'react-icons/lu'

import { places, regions, tags } from '@/data/places'

export default function PlacesPage() {
  const [search, setSearch] = useState('')
  const [activeRegion, setActiveRegion] = useState<string>('All')
  const [activeTag, setActiveTag] = useState<string>('All')

  const filtered = useMemo(() => {
    return places.filter((place) => {
      const matchesSearch =
        search === '' ||
        place.name.toLowerCase().includes(search.toLowerCase()) ||
        place.description.toLowerCase().includes(search.toLowerCase())
      const matchesRegion =
        activeRegion === 'All' || place.location.includes(activeRegion)
      const matchesTag = activeTag === 'All' || place.tag === activeTag
      return matchesSearch && matchesRegion && matchesTag
    })
  }, [search, activeRegion, activeTag])

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

        {/* Filter chips */}
        <VStack gap="3" mb="8">
          <HStack gap="2" flexWrap="wrap" justify="center">
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
          <HStack gap="2" flexWrap="wrap" justify="center">
            <Text fontSize="sm" color="fg.muted" fontWeight="medium">
              Category:
            </Text>
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={activeTag === tag ? 'solid' : 'subtle'}
                colorPalette={activeTag === tag ? 'teal' : 'gray'}
                cursor="pointer"
                px="3"
                py="1"
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </HStack>
        </VStack>

        {/* Results */}
        {filtered.length === 0 ? (
          <Text textAlign="center" color="fg.muted" py="12">
            No places found matching your filters.
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
            {filtered.map((place) => (
              <Card.Root
                key={place.id}
                variant="outline"
                transition="all 0.2s"
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: 'lg',
                  borderColor: `${place.colorPalette}.300`,
                }}
              >
                <Card.Body gap="4">
                  <HStack justify="space-between">
                    <Icon
                      as={place.icon}
                      boxSize="8"
                      color={`${place.colorPalette}.500`}
                    />
                    <Badge
                      colorPalette={place.colorPalette}
                      variant="subtle"
                    >
                      {place.tag}
                    </Badge>
                  </HStack>
                  <Box>
                    <Card.Title mb="1">{place.name}</Card.Title>
                    <Text fontSize="sm" color="fg.subtle" mb="2">
                      {place.location}
                    </Text>
                    <Card.Description>{place.description}</Card.Description>
                  </Box>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}
