import { Box, Image, Skeleton } from '@chakra-ui/react'
import { useState } from 'react'

import type { ProgressiveImageProps } from '@/types'

type LoadStatus = 'loading' | 'loaded' | 'error'

/**
 * Progressive image loading in 3 stages:
 * 1. Skeleton while nothing is ready
 * 2. Low-res thumbnail as soon as it arrives
 * 3. Full image crossfading in on top of the thumbnail
 *
 * If the full image fails but the thumbnail loaded, the thumbnail stays
 * visible. Renders `fallback` only when every available source has failed.
 */
export function ProgressiveImage({
  src,
  thumbnailSrc,
  alt,
  lazy = true,
  fallback,
}: ProgressiveImageProps) {
  const [fullStatus, setFullStatus] = useState<LoadStatus>('loading')
  const [thumbStatus, setThumbStatus] = useState<LoadStatus>('loading')

  const hasFull = Boolean(src)
  const hasThumb = Boolean(thumbnailSrc)

  // Only give up when every available source has failed (or is missing).
  const failed =
    (!hasFull || fullStatus === 'error') &&
    (!hasThumb || thumbStatus === 'error')

  if (failed) {
    return <>{fallback}</>
  }

  // Stage 1: skeleton until at least one source is ready.
  const showSkeleton = fullStatus !== 'loaded' && thumbStatus !== 'loaded'

  return (
    <Box position="relative" w="full" h="full">
      <Skeleton position="absolute" inset="0" loading={showSkeleton} />
      {/* Stage 2: thumbnail (decorative — full image carries the alt) */}
      {hasThumb && (
        <Image
          src={thumbnailSrc}
          alt=""
          aria-hidden="true"
          position="absolute"
          inset="0"
          w="full"
          h="full"
          css={{ objectFit: 'cover' }}
          opacity={thumbStatus === 'loaded' ? 1 : 0}
          transition="opacity 0.3s ease-in-out"
          loading={lazy ? 'lazy' : 'eager'}
          decoding={lazy ? 'async' : 'auto'}
          onLoad={() => setThumbStatus('loaded')}
          onError={() => setThumbStatus('error')}
        />
      )}
      {/* Stage 3: full image crossfades in over the thumbnail */}
      {hasFull && (
        <Image
          src={src}
          alt={alt}
          position="absolute"
          inset="0"
          w="full"
          h="full"
          css={{ objectFit: 'cover' }}
          opacity={fullStatus === 'loaded' ? 1 : 0}
          transition="opacity 0.3s ease-in-out"
          loading={lazy ? 'lazy' : 'eager'}
          decoding={lazy ? 'async' : 'auto'}
          onLoad={() => setFullStatus('loaded')}
          onError={() => setFullStatus('error')}
        />
      )}
    </Box>
  )
}
