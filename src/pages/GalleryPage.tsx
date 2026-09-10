import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

import { galleryItems } from '@/data/gallery'

export default function GalleryPage() {
  const [selected, setSelected] = useState<string | null>(null)

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

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="4">
          {galleryItems.map((item) => (
            <Box
              key={item.id}
              aspectRatio="4/3"
              bgGradient="to-br"
              gradientFrom={`${item.colorPalette}.500/20`}
              gradientTo={`${item.colorPalette}.500/5`}
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ transform: 'scale(1.02)', shadow: 'lg' }}
              onClick={() => setSelected(item.id)}
            >
              <Flex
                direction="column"
                align="center"
                justify="center"
                h="full"
                p="4"
                gap="2"
              >
                <Icon
                  as={item.icon}
                  boxSize="12"
                  color={`${item.colorPalette}.500`}
                />
                <VStack gap="0" textAlign="center">
                  <Text fontWeight="semibold" fontSize="sm">
                    {item.title}
                  </Text>
                  <Text fontSize="xs" color="fg.muted">
                    {item.caption}
                  </Text>
                </VStack>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>

        {/* Lightbox — replace with Image component when real photos added */}
        {selected && (
          <Box
            position="fixed"
            inset="0"
            zIndex="overlay"
            bg="blackAlpha.700"
            onClick={() => setSelected(null)}
          >
            <Flex h="full" align="center" justify="center" p="4">
              {(() => {
                const item = galleryItems.find((g) => g.id === selected)
                if (!item) return null
                return (
                  <Box
                    bg={`${item.colorPalette}.500/10`}
                    borderRadius="lg"
                    p="12"
                    textAlign="center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon
                      as={item.icon}
                      boxSize="24"
                      color={`${item.colorPalette}.500`}
                    />
                    <Heading size="lg" mt="4">
                      {item.title}
                    </Heading>
                    <Text color="fg.muted" mt="1">
                      {item.caption}
                    </Text>
                  </Box>
                )
              })()}
            </Flex>
          </Box>
        )}
      </Container>
    </Box>
  )
}
