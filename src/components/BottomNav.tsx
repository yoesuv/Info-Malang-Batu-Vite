import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router'
import { navItems } from '@/nav'

export function BottomNav() {
  return (
    <Box
      as="nav"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="sticky"
      display={{ base: 'block', md: 'none' }}
      borderTopWidth="1px"
      borderColor="border"
      bg="bg"
      px="2"
      pb="env(safe-area-inset-bottom)"
    >
      <Flex justify="space-around">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            style={{ flex: 1, maxWidth: '100px', textDecoration: 'none' }}
          >
            {({ isActive }) => (
              <Flex
                direction="column"
                align="center"
                gap="1"
                py="2"
                color={isActive ? 'teal.500' : 'fg.muted'}
                transition="colors 0.15s"
              >
                <Icon as={item.icon} boxSize="5" />
                <Text fontSize="xs" fontWeight={isActive ? 'semibold' : 'normal'}>
                  {item.label}
                </Text>
              </Flex>
            )}
          </NavLink>
        ))}
      </Flex>
    </Box>
  )
}
