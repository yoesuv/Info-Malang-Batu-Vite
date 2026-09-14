import { Badge, Box, Card, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router'

import { PlaceImage } from '@/components/PlaceImage'
import type { PlaceCardProps } from '@/types'

export function PlaceCard({ place, lineClamp = true }: PlaceCardProps) {
  return (
    <Link
      to={`/places/${place.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card.Root
        variant="outline"
        overflow="hidden"
        h="full"
        transition="all 0.2s"
        _hover={{
          transform: 'translateY(-4px)',
          shadow: 'lg',
          borderColor: 'teal.300',
        }}
      >
        <PlaceImage
          src={place.gambar || undefined}
          thumbnailSrc={place.thumbnail || undefined}
          alt={place.nama}
        />
        <Card.Body gap="3">
          <HStack justify="space-between" align="start">
            <Box>
              <Card.Title mb="1">{place.nama}</Card.Title>
              <Text fontSize="sm" color="fg.subtle" mb="2">
                {place.lokasi}
              </Text>
            </Box>
            {place.tag && (
              <Badge
                colorPalette={place.colorPalette ?? 'gray'}
                variant="subtle"
                flexShrink="0"
              >
                {place.tag}
              </Badge>
            )}
          </HStack>
          <Card.Description lineClamp={lineClamp ? 2 : undefined}>
            {place.deskripsi}
          </Card.Description>
        </Card.Body>
      </Card.Root>
    </Link>
  )
}
