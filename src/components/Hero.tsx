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

export function Hero() {
  return (
    <Box
      as="section"
      bgGradient="to-b"
      gradientFrom="teal.500/10"
      gradientTo="transparent"
      py={{ base: '16', md: '28' }}
    >
      <Container maxW="6xl">
        <VStack gap="6" textAlign="center">
          <Badge colorPalette="teal" size="lg" variant="subtle" px="3" py="1">
            East Java, Indonesia
          </Badge>

          <Heading
            as="h2"
            size={{ base: '3xl', md: '5xl' }}
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

          <Text fontSize={{ base: 'md', md: 'lg' }} color="fg.muted" maxW="2xl">
            From volcanic sunrises at Mount Bromo to the theme parks of Batu,
            explore cool mountain air, waterfalls, and vibrant local culture —
            all in one trip.
          </Text>

          <HStack gap="4" pt="2" flexWrap="wrap" justify="center">
            <Button asChild colorPalette="teal" size="lg">
              <a href="#destinations">
                Explore destinations <LuArrowRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#highlights">
                <LuCompass /> View highlights
              </a>
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}
