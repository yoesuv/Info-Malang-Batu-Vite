import { Box, Code, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Midpoint between Malang city and Batu
const MALANG_BATU_CENTER = { lat: -7.92, lng: 112.58 };

export default function MapsPage() {
  return (
    <Box py={{ base: "8", md: "12" }}>
      <Container maxW="6xl">
        <VStack gap="2" mb="8" textAlign="center">
          <Heading size={{ base: "2xl", md: "3xl" }} letterSpacing="tight">
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
          aspectRatio={{ base: "4/5", md: "16/9" }}
        >
          {MAPS_API_KEY ? (
            <APIProvider apiKey={MAPS_API_KEY}>
              <Map
                style={{ width: "100%", height: "100%" }}
                defaultCenter={MALANG_BATU_CENTER}
                defaultZoom={9}
                gestureHandling="greedy"
                zoomControl={true}
              />
            </APIProvider>
          ) : (
            <VStack justify="center" h="full" gap="2" px="6" textAlign="center">
              <Heading size="md">Google Maps API key missing</Heading>
              <Text color="fg.muted" maxW="md">
                Create a <Code>.env</Code> file and set{" "}
                <Code>VITE_GOOGLE_MAPS_API_KEY</Code>, then restart the dev
                server.
              </Text>
            </VStack>
          )}
        </Box>
      </Container>
    </Box>
  );
}
