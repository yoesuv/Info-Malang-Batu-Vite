import { Box, Container, SimpleGrid, Stat } from '@chakra-ui/react'

const stats = [
  { label: 'Tourist attractions', value: '150+' },
  { label: 'Annual visitors', value: '7M+' },
  { label: 'Average temperature', value: '18°C' },
  { label: 'Elevation', value: '950m' },
]

export function Highlights() {
  return (
    <Box
      as="section"
      id="highlights"
      py={{ base: '8', md: '10' }}
      borderYWidth="1px"
      borderColor="border"
      bg="bg.subtle"
    >
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 2, md: 4 }} gap="6">
          {stats.map((stat) => (
            <Stat.Root key={stat.label} textAlign="center">
              <Stat.Label color="fg.muted">{stat.label}</Stat.Label>
              <Stat.ValueText
                fontSize={{ base: '2xl', md: '3xl' }}
                color="teal.500"
              >
                {stat.value}
              </Stat.ValueText>
            </Stat.Root>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
