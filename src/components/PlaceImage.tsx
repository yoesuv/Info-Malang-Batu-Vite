import { Box, Flex, Icon } from '@chakra-ui/react'
import { LuMapPin } from 'react-icons/lu'

import { ProgressiveImage } from '@/components/ProgressiveImage'
import type { PlaceImageProps } from '@/types'

/**
 * Progressive image (skeleton → thumbnail → full) inside a fixed
 * aspect-ratio box, with an icon fallback when no source loads.
 */
export function PlaceImage({
  src,
  thumbnailSrc,
  alt,
  ratio = '4/3',
  icon,
  colorPalette,
}: PlaceImageProps) {
  const fallbackIcon = icon ?? LuMapPin
  const color = colorPalette ?? 'teal'

  return (
    <Box w="full" overflow="hidden" css={{ aspectRatio: ratio }}>
      <ProgressiveImage
        src={src}
        thumbnailSrc={thumbnailSrc}
        alt={alt}
        fallback={
          <Flex
            w="full"
            h="full"
            align="center"
            justify="center"
            bgGradient="to-br"
            gradientFrom={`${color}.500/20`}
            gradientTo={`${color}.500/5`}
          >
            <Icon as={fallbackIcon} boxSize="10" color={`${color}.400`} />
          </Flex>
        }
      />
    </Box>
  )
}
