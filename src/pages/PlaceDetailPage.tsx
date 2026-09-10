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
import { Link, useParams } from 'react-router'
import { LuArrowLeft } from 'react-icons/lu'

import { PlaceImage } from '@/components/PlaceImage'
import { places } from '@/data/places'

export default function PlaceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const place = places.find((p) => p.id === id)

  if (!place) {
    return (
      <Box py={{ base: '12', md: '20' }}>
        <Container maxW="6xl">
          <VStack gap="4" textAlign="center">
            <Heading size="lg">Place not found</Heading>
            <Text color="fg.muted">
              The place you're looking for doesn't exist or has been removed.
            </Text>
            <Button asChild colorPalette="teal">
              <Link to="/places">
                <LuArrowLeft /> Back to Places
              </Link>
            </Button>
          </VStack>
        </Container>
      </Box>
    )
  }

  return (
    <Box py={{ base: '8', md: '12' }}>
      <Container maxW="6xl">
        <VStack gap="6" align="stretch">
          <Button asChild variant="ghost" size="sm" w="fit-content">
            <Link to="/places">
              <LuArrowLeft /> Back to Places
            </Link>
          </Button>

          <VStack gap="2" align="start">
            <Heading as="h2" size={{ base: '2xl', md: '3xl' }}>
              {place.nama}
            </Heading>
            <HStack gap="2">
              <Badge colorPalette="teal" variant="subtle">
                {place.lokasi}
              </Badge>
            </HStack>
          </VStack>

          <Box
            borderRadius="lg"
            overflow="hidden"
            borderWidth="1px"
            borderColor="border"
          >
            <PlaceImage
              src={place.gambar || place.thumbnail || undefined}
              alt={place.nama}
              ratio="16/9"
              icon={place.icon}
              colorPalette={place.colorPalette}
            />
          </Box>

          <Box maxW="3xl">
            <HStack gap="2" mb="3">
              {place.tag && (
                <Badge
                  colorPalette={place.colorPalette ?? 'gray'}
                  variant="subtle"
                  size="lg"
                >
                  {place.tag}
                </Badge>
              )}
            </HStack>
            <Text fontSize="lg" color="fg.muted" lineHeight="tall">
              {place.deskripsi}
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
