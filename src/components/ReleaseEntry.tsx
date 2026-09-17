import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  LuCalendar,
  LuCircleCheck,
  LuGitBranch,
  LuPencil,
  LuSparkles,
  LuWrench,
} from 'react-icons/lu'
import type { IconType } from 'react-icons'

import type {
  ChangelogChangeType,
  ChangelogStatus,
  ReleaseEntryProps,
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

export function ReleaseEntry({ entry, status, isLast }: ReleaseEntryProps) {
  const node = NODE_STYLES[status]

  return (
    <Flex gap="4">
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
}
