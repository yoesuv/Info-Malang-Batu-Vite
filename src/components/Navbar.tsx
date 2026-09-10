import { Box, Container, Flex, HStack, Heading } from '@chakra-ui/react'
import { LuMapPin } from 'react-icons/lu'
import { NavLink } from 'react-router'
import { ColorModeButton } from '@/components/ui/color-mode'
import { navItems } from '@/nav'

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
          <HStack gap="2" asChild>
            <NavLink to="/">
              <LuMapPin size={22} color="var(--chakra-colors-teal-500)" />
              <Heading as="h1" size="md" letterSpacing="tight">
                Info Malang Batu
              </Heading>
            </NavLink>
          </HStack>

          <HStack gap="6">
            <HStack gap="1" display={{ base: 'none', md: 'flex' }}>
              {navItems.map((item) => (
                <Box key={item.label} asChild>
                  <NavLink
                    to={item.href}
                    style={({ isActive }) => ({
                      color: isActive
                        ? 'var(--chakra-colors-fg)'
                        : 'var(--chakra-colors-fg-muted)',
                      fontWeight: isActive ? 'semibold' : 'medium',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      transition: 'all 0.15s',
                      textDecoration: 'none',
                      backgroundColor: isActive
                        ? 'var(--chakra-colors-bg-muted)'
                        : 'transparent',
                    })}
                  >
                    {item.label}
                  </NavLink>
                </Box>
              ))}
            </HStack>
            <ColorModeButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
