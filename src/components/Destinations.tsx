import {
  Badge,
  Box,
  Card,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Link } from 'react-router'

import { PlaceImage } from '@/components/PlaceImage'
import { places } from '@/data/places'

export function Destinations() {
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
          {places.map((destination) => (
            <Link
              key={destination.id}
              to={`/places/${destination.id}`}
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
                }}
              >
                <PlaceImage
                  src={destination.thumbnail || undefined}
                  alt={destination.nama}
                  icon={destination.icon}
                  colorPalette={destination.colorPalette}
                />
                <Card.Body gap="4">
                  <HStack justify="space-between" align="start">
                    <Box>
                      <Card.Title mb="1">{destination.nama}</Card.Title>
                      <Text fontSize="sm" color="fg.subtle" mb="2">
                        {destination.lokasi}
                      </Text>
                    </Box>
                    {destination.tag && (
                      <Badge
                        colorPalette={destination.colorPalette ?? 'gray'}
                        variant="subtle"
                        flexShrink="0"
                      >
                        {destination.tag}
                      </Badge>
                    )}
                  </HStack>
                  <Card.Description>{destination.deskripsi}</Card.Description>
                </Card.Body>
              </Card.Root>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
