import { Box, Text, VStack } from '@chakra-ui/react'
import { LuImageOff } from 'react-icons/lu'

import { ProgressiveImage } from '@/components/ProgressiveImage'
import type { PlaceImageProps } from '@/types'

/**
 * Progressive image (skeleton → thumbnail → full) inside a fixed
 * aspect-ratio box, with a simple fallback when no source loads.
 */
export function PlaceImage({
  src,
  thumbnailSrc,
  alt,
  ratio = '4/3',
}: PlaceImageProps) {
  return (
    <Box w="full" overflow="hidden" css={{ aspectRatio: ratio }}>
      <ProgressiveImage
        src={src}
        thumbnailSrc={thumbnailSrc}
        alt={alt}
        fallback={
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
        }
      />
    </Box>
  )
}
