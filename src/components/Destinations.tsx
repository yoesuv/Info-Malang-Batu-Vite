import {
  Badge,
  Box,
  Card,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import {
  LuCar,
  LuFerrisWheel,
  LuFlower2,
  LuMountain,
  LuPalette,
  LuWaves,
} from 'react-icons/lu'

interface Destination {
  name: string
  location: string
  description: string
  icon: IconType
  colorPalette: string
  tag: string
}

const destinations: Destination[] = [
  {
    name: 'Mount Bromo',
    location: 'Bromo Tengger Semeru NP',
    description:
      'Catch the legendary sunrise over an active volcanic crater in the Sea of Sand.',
    icon: LuMountain,
    colorPalette: 'orange',
    tag: 'Nature',
  },
  {
    name: 'Jatim Park 3',
    location: 'Batu',
    description:
      'A family-favorite theme park featuring Dino Park, infinity pools, and fun rides.',
    icon: LuFerrisWheel,
    colorPalette: 'pink',
    tag: 'Theme Park',
  },
  {
    name: 'Coban Rondo',
    location: 'Pujon, Malang',
    description:
      'An 84-meter waterfall surrounded by lush pine forests and a hedge maze.',
    icon: LuWaves,
    colorPalette: 'cyan',
    tag: 'Waterfall',
  },
  {
    name: 'Museum Angkut',
    location: 'Batu',
    description:
      'Southeast Asia\u2019s first transportation museum with 300+ vintage vehicle collections.',
    icon: LuCar,
    colorPalette: 'purple',
    tag: 'Museum',
  },
  {
    name: 'Selecta',
    location: 'Batu',
    description:
      'A historic flower garden and recreation park dating back to the Dutch colonial era.',
    icon: LuFlower2,
    colorPalette: 'green',
    tag: 'Garden',
  },
  {
    name: 'Kampung Warna-Warni',
    location: 'Jodipan, Malang',
    description:
      'A riverside village transformed into a colorful mural-filled photo hotspot.',
    icon: LuPalette,
    colorPalette: 'yellow',
    tag: 'Culture',
  },
]

export function Destinations() {
  return (
    <Box as="section" id="destinations" py={{ base: '12', md: '20' }}>
      <Container maxW="6xl">
        <VStack gap="3" textAlign="center" mb="10">
          <Heading as="h2" size={{ base: '2xl', md: '3xl' }} letterSpacing="tight">
            Popular destinations
          </Heading>
          <Text color="fg.muted" maxW="xl">
            Hand-picked spots across Malang and Batu for every kind of traveler.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {destinations.map((destination) => (
            <Card.Root
              key={destination.name}
              variant="outline"
              transition="all 0.2s"
              _hover={{
                transform: 'translateY(-4px)',
                shadow: 'lg',
                borderColor: `${destination.colorPalette}.300`,
              }}
            >
              <Card.Body gap="4">
                <HStack justify="space-between">
                  <Icon
                    as={destination.icon}
                    boxSize="8"
                    color={`${destination.colorPalette}.500`}
                  />
                  <Badge colorPalette={destination.colorPalette} variant="subtle">
                    {destination.tag}
                  </Badge>
                </HStack>
                <Box>
                  <Card.Title mb="1">{destination.name}</Card.Title>
                  <Text fontSize="sm" color="fg.subtle" mb="2">
                    {destination.location}
                  </Text>
                  <Card.Description>{destination.description}</Card.Description>
                </Box>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
