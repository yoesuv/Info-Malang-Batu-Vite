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
import { places } from '@/data/places'

export function Destinations() {
  return (
    <Box as="section" py={{ base: '12', md: '20' }}>
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
          {places.map((destination) => (
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
