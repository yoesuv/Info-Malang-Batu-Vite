import { Box, Flex, Icon, Image, Skeleton } from '@chakra-ui/react'
import { useState } from 'react'
import { LuMapPin } from 'react-icons/lu'

import type { PlaceImageProps } from '@/types'

export function PlaceImage({
  src,
  alt,
  ratio = '4/3',
  icon,
  colorPalette,
}: PlaceImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading',
  )

  const fallbackIcon = icon ?? LuMapPin
  const color = colorPalette ?? 'teal'

  const fallback = (
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
  )

  return (
    <Box w="full" overflow="hidden" css={{ aspectRatio: ratio }}>
      {!src || status === 'error' ? (
        fallback
      ) : (
        <Box position="relative" w="full" h="full">
          <Skeleton
            position="absolute"
            inset="0"
            loading={status === 'loading'}
          />
          <Image
            src={src}
            alt={alt}
            w="full"
            h="full"
            css={{ objectFit: 'cover' }}
            opacity={status === 'loaded' ? 1 : 0}
            transition="opacity 0.3s ease-in-out"
            loading="lazy"
            decoding="async"
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
          />
        </Box>
      )}
    </Box>
  )
}
