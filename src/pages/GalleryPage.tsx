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
import { useState } from 'react'
import { LuImageOff, LuTriangleAlert } from 'react-icons/lu'

import { useGalleryQuery } from '@/api/gallery'
import type { GalleryImageProps } from '@/types'

const FADE_TRANSITION = 'opacity 0.3s ease-in-out'

/**
 * Image with a skeleton placeholder underneath.
 * Fades in once loaded; shows a fallback on error.
 */
function GalleryImage({ src, alt, lazy = true }: GalleryImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading',
  )

  if (status === 'error') {
    return (
      <VStack
        w="full"
        h="full"
        justify="center"
        gap="2"
        color="fg.muted"
        bg="bg.muted"
      >
        <LuImageOff size={24} />
        <Text fontSize="sm">Image unavailable</Text>
      </VStack>
    )
  }

  return (
    <Box position="relative" w="full" h="full">
      <Skeleton position="absolute" inset="0" loading={status === 'loading'} />
      <Image
        src={src}
        alt={alt}
        w="full"
        h="full"
        css={{ objectFit: 'cover' }}
        opacity={status === 'loaded' ? 1 : 0}
        transition={FADE_TRANSITION}
        loading={lazy ? 'lazy' : 'eager'}
        decoding={lazy ? 'async' : 'auto'}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </Box>
  )
}

export default function GalleryPage() {
  const { data, isPending, isError, error } = useGalleryQuery()
  const galleryItems = data ?? []

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
                <GalleryImage src={item.image} alt={item.caption} />
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
                <GalleryImage
                  key={selectedItem.id}
                  src={selectedItem.image}
                  alt={selectedItem.caption}
                  lazy={false}
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
