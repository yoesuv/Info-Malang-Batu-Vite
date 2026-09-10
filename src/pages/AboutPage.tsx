import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { LuExternalLink, LuGitBranch, LuPackage } from 'react-icons/lu'

import { changelog, libraries } from '@/data/about'

export default function AboutPage() {
  return (
    <Box py={{ base: '8', md: '12' }}>
      <Container maxW="6xl">
        <VStack gap="2" mb="8" textAlign="center">
          <Heading size={{ base: '2xl', md: '3xl' }} letterSpacing="tight">
            About Info Malang Batu
          </Heading>
          <Text color="fg.muted" maxW="lg">
            Your companion for exploring the highlands of East Java.
          </Text>
        </VStack>

        <Tabs.Root defaultValue="info" lazyMount>
          <Tabs.List perspective="8" gap="4">
            <Tabs.Trigger value="info">Info</Tabs.Trigger>
            <Tabs.Trigger value="changelog">Changelog</Tabs.Trigger>
            <Tabs.Trigger value="libraries">Libraries</Tabs.Trigger>
          </Tabs.List>

          {/* Info Tab */}
          <Tabs.Content value="info">
            <VStack gap="6" align="stretch">
              <Card.Root variant="outline" maxW="lg" mx="auto">
                <Card.Body gap="4" p="6">
                  <Heading size="lg">Info Malang Batu</Heading>
                  <Text color="fg.muted">
                    A travel companion covering the charming cities of Malang
                    and Batu in East Java, Indonesia. From the volcanic
                    sunrises of Mount Bromo to the theme parks of Batu,
                    this app helps you discover the best destinations,
                    browse photo galleries, and navigate the region.
                  </Text>
                  <HStack gap="4" pt="2">
                    <Badge colorPalette="teal" variant="subtle">
                      v0.3.0
                    </Badge>
                    <Text fontSize="sm" color="fg.muted">
                      Built with React &amp; Chakra UI
                    </Text>
                  </HStack>
                </Card.Body>
              </Card.Root>
            </VStack>
          </Tabs.Content>

          {/* Changelog Tab */}
          <Tabs.Content value="changelog">
            <VStack gap="4" align="stretch">
              {changelog.map((entry) => (
                <Flex key={entry.version} gap="4">
                  <VStack align="center" gap="1" pt="1">
                    <Box
                      w="3"
                      h="3"
                      borderRadius="full"
                      bg="teal.500"
                      flexShrink="0"
                    />
                    {entry.version !== changelog[0].version && (
                      <Box w="px" h="full" bg="border" flex="1" />
                    )}
                  </VStack>
                  <Box flex="1" pb="6">
                    <HStack gap="3" mb="2">
                      <Heading size="md">{entry.version}</Heading>
                      <Text fontSize="sm" color="fg.muted">
                        {entry.date}
                      </Text>
                    </HStack>
                    <VStack gap="1" align="start">
                      {entry.changes.map((change) => (
                        <Flex key={change} gap="2" align="start">
                          <Icon
                            as={LuGitBranch}
                            boxSize="4"
                            mt="1"
                            color="teal.500"
                            flexShrink="0"
                          />
                          <Text color="fg.muted">{change}</Text>
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                </Flex>
              ))}
            </VStack>
          </Tabs.Content>

          {/* Libraries Tab */}
          <Tabs.Content value="libraries">
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
              {libraries.map((lib) => (
                <Link
                  key={lib.name}
                  href={lib.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Card.Root
                    variant="outline"
                    transition="all 0.2s"
                    _hover={{
                      shadow: 'md',
                      borderColor: 'teal.300/30',
                    }}
                  >
                    <Card.Body gap="2">
                      <HStack justify="space-between">
                        <HStack gap="2">
                          <Icon as={LuPackage} boxSize="5" color="teal.500" />
                          <Text fontWeight="semibold">{lib.name}</Text>
                        </HStack>
                        <Icon as={LuExternalLink} boxSize="4" color="fg.muted" />
                      </HStack>
                      <Text fontSize="sm" color="fg.muted">
                        {lib.description}
                      </Text>
                    </Card.Body>
                  </Card.Root>
                </Link>
              ))}
            </SimpleGrid>
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </Box>
  )
}
