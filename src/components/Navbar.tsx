import { Box, Container, Flex, HStack, Heading, Link } from '@chakra-ui/react'
import { LuMapPin } from 'react-icons/lu'
import { ColorModeButton } from '@/components/ui/color-mode'

const links = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Highlights', href: '#highlights' },
]

export function Navbar() {
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      borderBottomWidth="1px"
      borderColor="border"
      bg="bg/80"
      backdropFilter="blur(12px)"
    >
      <Container maxW="6xl">
        <Flex h="16" align="center" justify="space-between">
          <HStack gap="2">
            <LuMapPin size={22} color="var(--chakra-colors-teal-500)" />
            <Heading as="h1" size="md" letterSpacing="tight">
              Info Malang Batu
            </Heading>
          </HStack>

          <HStack gap="6">
            <HStack gap="6" display={{ base: 'none', md: 'flex' }}>
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  color="fg.muted"
                  fontWeight="medium"
                  _hover={{ color: 'fg', textDecoration: 'none' }}
                >
                  {link.label}
                </Link>
              ))}
            </HStack>
            <ColorModeButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
