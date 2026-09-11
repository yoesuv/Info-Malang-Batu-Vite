import {
  Alert,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { LuTriangleAlert } from 'react-icons/lu'

import { usePlacesQuery } from '@/api/places'
import { toGalleryItems } from '@/data/gallery'

export default function GalleryPage() {
  const { data: places, isPending, isError, error } = usePlacesQuery('all')

  const galleryItems = useMemo(
    () => toGalleryItems(places ?? []),
    [places],
  )

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedItem = galleryItems.find((item) => item.id === selectedId)

  return (
    <Box py={{ base: '8', md: '12' }} minH="100dvh">
      <Container maxW="6xl">
        <VStack gap="2" mb="8" textAlign="center">
          <Heading size={{ base: '2xl', md: '3xl' }} letterSpacing="tight">
            Photo Gallery
          </Heading>
          <Text color="fg.muted" maxW="lg">
            Snapshots from across Malang and Batu's most iconic spots.
          </Text>
        </VStack>

        {isPending ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="4">
            {Array.from({ length: 9 }, (_, i) => (
              <Skeleton
                key={i}
                borderRadius="lg"
                css={{ aspectRatio: '4/3' }}
              />
            ))}
          </SimpleGrid>
        ) : isError ? (
          <Alert.Root status="error" textAlign="center" py="12">
            <Alert.Indicator>
              <LuTriangleAlert />
            </Alert.Indicator>
            <Alert.Content>
              <Alert.Title>Failed to load gallery</Alert.Title>
              <Alert.Description>
                {error instanceof Error
                  ? error.message
                  : 'Something went wrong while fetching the gallery.'}
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="4">
            {galleryItems.map((item) => (
              <Box
                key={item.id}
                overflow="hidden"
                borderRadius="lg"
                cursor="pointer"
                transition="all 0.2s"
                css={{ aspectRatio: '4/3' }}
                _hover={{ transform: 'scale(1.02)', shadow: 'lg' }}
                onClick={() => setSelectedId(item.id)}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.caption}
                  w="full"
                  h="full"
                  css={{ objectFit: 'cover' }}
                />
              </Box>
            ))}
          </SimpleGrid>
        )}

        {/* Lightbox */}
        {selectedItem && (
          <Box
            position="fixed"
            inset="0"
            zIndex="overlay"
            bg="blackAlpha.700"
            onClick={() => setSelectedId(null)}
          >
            <Flex h="full" align="center" justify="center" p="4">
              <Box
                maxW="3xl"
                w="full"
                borderRadius="lg"
                overflow="hidden"
                bg="bg"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedItem.image || selectedItem.thumbnail}
                  alt={selectedItem.caption}
                />
                <VStack gap="1" p="4" textAlign="center">
                  <Text fontWeight="semibold">{selectedItem.caption}</Text>
                </VStack>
              </Box>
            </Flex>
          </Box>
        )}
      </Container>
    </Box>
  )
}
