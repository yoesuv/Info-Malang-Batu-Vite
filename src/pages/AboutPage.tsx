import {
  Badge,
  Box,
  Card,
  Container,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { LuRocket } from 'react-icons/lu'

import { ReleaseEntry } from '@/components/ReleaseEntry'
import { changelog, libraries } from '@/data/about'
import { APP_VERSION, APP_VERSION_TAG } from '@/version'
import type { ChangelogStatus, Library, LibraryCategory } from '@/types'

/** Order and copy for the grouped Libraries tab. */
const LIBRARY_GROUPS: { category: LibraryCategory; label: string }[] = [
  { category: 'framework', label: 'App & routing' },
  { category: 'ui', label: 'Interface & theming' },
  { category: 'data', label: 'Data & maps' },
  { category: 'tooling', label: 'Tooling & language' },
]

function LibraryCard({ lib }: { lib: Library }) {
  return (
    <Link
      href={lib.url}
      target="_blank"
      rel="noopener noreferrer"
      display="block"
      h="full"
      _hover={{ textDecoration: 'none' }}
    >
      <Card.Root
        variant="outline"
        h="full"
        transition="border-color 0.2s"
        _hover={{ borderColor: `${lib.colorPalette}.solid` }}
      >
        <Card.Body gap="2" p="5">
          <HStack justify="space-between" align="center">
            <Text fontWeight="semibold">{lib.name}</Text>
            <Badge
              colorPalette={lib.colorPalette}
              variant="subtle"
              size="sm"
            >
              v{lib.version}
            </Badge>
          </HStack>
          <Text fontSize="sm" color="fg.muted">
            {lib.description}
          </Text>
        </Card.Body>
      </Card.Root>
    </Link>
  )
}

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
                  <HStack gap="3" pt="2" flexWrap="wrap">
                    <Badge colorPalette="teal" variant="subtle">
                      v{APP_VERSION}
                    </Badge>
                    <Badge colorPalette="purple" variant="surface">
                      <Icon as={LuRocket} boxSize="3.5" />
                      {APP_VERSION_TAG}
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
            <VStack gap="6" align="stretch">
              <Text color="fg.muted" maxW="2xl">
                What is new in Info Malang Batu, most recent version first. The
                short version: bigger numbers mean bigger changes.
              </Text>

              {changelog.map((entry, entryIndex) => {
                // First entry is the shipped version; later ones default to
                // `released`, so `status` is only written when it deviates.
                const status: ChangelogStatus =
                  entry.status ??
                  (entryIndex === 0 ? 'current' : 'released')

                return (
                  <ReleaseEntry
                    key={entry.version}
                    entry={entry}
                    status={status}
                    isLast={entryIndex === changelog.length - 1}
                  />
                )
              })}
            </VStack>
          </Tabs.Content>

          {/* Libraries Tab */}
          <Tabs.Content value="libraries">
            <VStack gap="8" align="stretch">
              <Text color="fg.muted" maxW="2xl">
                The open-source building blocks behind Info Malang Batu.
              </Text>

              {LIBRARY_GROUPS.map((group) => {
                const items = libraries.filter(
                  (lib) => lib.category === group.category,
                )
                if (items.length === 0) return null

                return (
                  <Box key={group.category}>
                    <Heading size="md" mb="3">
                      {group.label}
                    </Heading>
                    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="4">
                      {items.map((lib) => (
                        <LibraryCard key={lib.name} lib={lib} />
                      ))}
                    </SimpleGrid>
                  </Box>
                )
              })}
            </VStack>
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </Box>
  )
}
