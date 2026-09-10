import { Box, Flex, Icon, Image } from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { LuMapPin } from 'react-icons/lu'

interface PlaceImageProps {
  src?: string
  alt: string
  /** CSS aspect-ratio value, e.g. '4/3' (default) or '16/9' */
  ratio?: string
  /** Icon used in the placeholder fallback when src is empty */
  icon?: IconType
  /** Color palette used for the placeholder fallback */
  colorPalette?: string
}

export function PlaceImage({
  src,
  alt,
  ratio = '4/3',
  icon,
  colorPalette,
}: PlaceImageProps) {
  const fallbackIcon = icon ?? LuMapPin
  const color = colorPalette ?? 'teal'

  return (
    <Box w="full" overflow="hidden" css={{ aspectRatio: ratio }}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          w="full"
          h="full"
          css={{ objectFit: 'cover' }}
        />
      ) : (
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
      )}
    </Box>
  )
}
