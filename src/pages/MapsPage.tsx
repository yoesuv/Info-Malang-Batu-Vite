import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'

export default function MapsPage() {
  return (
    <Box py={{ base: '8', md: '12' }}>
      <Container maxW="6xl">
        <VStack gap="2" mb="8" textAlign="center">
          <Heading size={{ base: '2xl', md: '3xl' }} letterSpacing="tight">
            Interactive Maps
          </Heading>
          <Text color="fg.muted" maxW="lg">
            Find your way around Malang and Batu with interactive maps.
          </Text>
        </VStack>

        <Box
          borderRadius="lg"
          overflow="hidden"
          borderWidth="1px"
          borderColor="border"
          aspectRatio={{ base: '4/5', md: '16/9' }}
        >
          <iframe
            title="Malang Batu Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126113.5148936683!2d112.53000!3d-7.94400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b2299b7d62e6b!2sBatu%2C%20Malang%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1756155800000!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          />
        </Box>
      </Container>
    </Box>
  )
}
