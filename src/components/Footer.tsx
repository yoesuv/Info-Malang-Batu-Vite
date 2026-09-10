import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { LuMapPin } from 'react-icons/lu'

export function Footer() {
  return (
    <Box as="footer" py="8">
      <Container maxW="6xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          gap="3"
        >
          <HStack gap="2">
            <LuMapPin size={16} color="var(--chakra-colors-teal-500)" />
            <Text fontWeight="semibold" fontSize="sm">
              Info Malang Batu
            </Text>
          </HStack>
          <Text fontSize="sm" color="fg.muted">
            Built with React, Vite &amp; Chakra UI
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}
