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
import {
  LuCalendar,
  LuCircleCheck,
  LuGitBranch,
  LuPencil,
  LuRocket,
  LuSparkles,
  LuWrench,
} from 'react-icons/lu'
import type { IconType } from 'react-icons'

import { changelog, libraries } from '@/data/about'
import { APP_VERSION, APP_VERSION_TAG } from '@/version'
import type {
  ChangelogChangeType,
  ChangelogStatus,
  Library,
  LibraryCategory,
} from '@/types'

const CHANGE_STYLES: Record<
  ChangelogChangeType,
  { label: string; palette: string; icon: IconType }
> = {
  added: { label: 'Added', palette: 'green', icon: LuCircleCheck },
  changed: { label: 'Changed', palette: 'blue', icon: LuPencil },
  improved: { label: 'Improved', palette: 'teal', icon: LuSparkles },
  fixed: { label: 'Fixed', palette: 'orange', icon: LuWrench },
  removed: { label: 'Removed', palette: 'red', icon: LuGitBranch },
}

const NODE_STYLES: Record<ChangelogStatus, { bg: string; label?: string }> = {
  current: { bg: 'teal.500', label: 'Latest' },
  released: { bg: 'teal.500' },
  prerelease: { bg: 'border' },
}

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

/** Relative "x months ago" hint so the log reads without a calendar in hand. */
function sinceLabel(isoDate: string): string {
  const released = new Date(`${isoDate}T00:00:00Z`).getTime()
  const days = Math.max(
    0,
    Math.round((Date.now() - released) / (24 * 60 * 60 * 1000)),
  )
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.round(days / 30)
  if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'} ago`
  const years = Math.floor(months / 12)
  return `${years} ${years === 1 ? 'year' : 'years'} ago`
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
                  entry.status ?? (entryIndex === 0 ? 'current' : 'released')
                const node = NODE_STYLES[status]
                const isLast = entryIndex === changelog.length - 1

                return (
                  <Flex key={entry.version} gap="4">
                    <VStack align="center" gap="1" pt="1">
                      <Box
                        w="3"
                        h="3"
                        borderRadius="full"
                        bg={node.bg}
                        flexShrink="0"
                      />
                      {!isLast && <Box w="px" flex="1" bg="border" />}
                    </VStack>

                    <Box flex="1" pb="6">
                      <HStack gap="3" mb="1" flexWrap="wrap">
                        <Heading size="md">
                          {entry.version}
                          {status === 'prerelease' && (
                            <Text as="span" color="fg.muted" fontSize="sm">
                              {' '}
                              (not released)
                            </Text>
                          )}
                        </Heading>
                        {node.label && (
                          <Badge colorPalette="teal" variant="solid" size="sm">
                            {node.label}
                          </Badge>
                        )}
                        <HStack gap="1.5" color="fg.muted" fontSize="sm">
                          <Icon as={LuCalendar} boxSize="3.5" />
                          {entry.date}
                          <Text as="span" color="fg.subtle">
                            · {sinceLabel(entry.date)}
                          </Text>
                        </HStack>
                      </HStack>

                      {entry.summary && (
                        <Text color="fg.muted" fontStyle="italic" mb="3">
                          {entry.summary}
                        </Text>
                      )}

                      <VStack gap="2" align="start">
                        {entry.changes.map((change) => {
                          const style = CHANGE_STYLES[change.type]

                          return (
                            <Flex
                              key={`${entry.version}-${change.type}-${change.description}`}
                              gap="3"
                              align="start"
                            >
                              <Badge
                                size="sm"
                                variant="surface"
                                colorPalette={style.palette}
                                flexShrink="0"
                                minW="24"
                                justifyContent="center"
                              >
                                <Icon as={style.icon} boxSize="3" />
                                {style.label}
                              </Badge>
                              <Text color="fg.muted" maxW="3xl">
                                {change.description}
                              </Text>
                            </Flex>
                          )
                        })}
                      </VStack>
                    </Box>
                  </Flex>
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
