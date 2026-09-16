import {
  Alert,
  Box,
  Button,
  Code,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { LuTriangleAlert } from "react-icons/lu";

import { useMapMarkersQuery } from "@/api/maps";

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Midpoint between Malang city and Batu
const MALANG_BATU_CENTER = { lat: -7.92, lng: 112.58 };

export default function MapsPage() {
  const { data: markers, isError, error, refetch } = useMapMarkersQuery();

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
          {!MAPS_API_KEY ? (
            <VStack justify="center" h="full" gap="2" px="6" textAlign="center">
              <Heading size="md">Google Maps API key missing</Heading>
              <Text color="fg.muted" maxW="md">
                Create a <Code>.env</Code> file and set{" "}
                <Code>VITE_GOOGLE_MAPS_API_KEY</Code>, then restart the dev
                server.
              </Text>
            </VStack>
          ) : isError ? (
            <Alert.Root status="error" textAlign="center" h="full">
              <Alert.Indicator>
                <LuTriangleAlert />
              </Alert.Indicator>
              <Alert.Content>
                <Alert.Title>Failed to load map markers</Alert.Title>
                <Alert.Description>
                  {error instanceof Error
                    ? error.message
                    : "Something went wrong while fetching the markers."}
                </Alert.Description>
                <Button
                  size="sm"
                  colorPalette="teal"
                  mt="2"
                  onClick={() => refetch()}
                >
                  Try again
                </Button>
              </Alert.Content>
            </Alert.Root>
          ) : (
            <APIProvider apiKey={MAPS_API_KEY}>
              <Map
                style={{ width: "100%", height: "100%" }}
                defaultCenter={MALANG_BATU_CENTER}
                defaultZoom={9}
                gestureHandling="cooperative"
                zoomControl={true}
              >
                {markers?.map((marker) => (
                  <Marker
                    key={marker.id}
                    position={marker.position}
                    title={marker.name}
                  />
                ))}
              </Map>
            </APIProvider>
          )}
        </Box>
      </Container>
    </Box>
  );
}
