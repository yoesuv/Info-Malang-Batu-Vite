import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { LuArrowRight, LuCompass } from 'react-icons/lu'
import { Link } from 'react-router'

export function Hero() {
  return (
    <Box
      as="section"
      bgGradient="to-b"
      gradientFrom="teal.500/10"
      gradientTo="transparent"
      py={{ base: '10', md: '16' }}
    >
      <Container maxW="6xl">
        <VStack gap="4" textAlign="center">
          <Badge colorPalette="teal" size="md" variant="subtle" px="3" py="1">
            East Java, Indonesia
          </Badge>

          <Heading
            as="h2"
            size={{ base: '2xl', md: '4xl' }}
            letterSpacing="tight"
            lineHeight="shorter"
            maxW="3xl"
          >
            Discover the beauty of{' '}
            <Text
              as="span"
              bgGradient="to-r"
              gradientFrom="teal.400"
              gradientTo="blue.500"
              bgClip="text"
            >
              Malang &amp; Batu
            </Text>
          </Heading>

          <Text fontSize={{ base: 'sm', md: 'md' }} color="fg.muted" maxW="2xl">
            From volcanic sunrises at Mount Bromo to the theme parks of Batu,
            explore cool mountain air, waterfalls, and vibrant local culture —
            all in one trip.
          </Text>

          <HStack gap="3" pt="1" flexWrap="wrap" justify="center">
            <Button asChild colorPalette="teal" size="md">
              <Link to="/places">
                Explore destinations <LuArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="md">
              <Link to="/gallery">
                <LuCompass /> View gallery
              </Link>
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}
