import { colors } from "@/styles/global";
import { Image } from "expo-image";

import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { BackgroundImage } from "../components/backgroundImage";
import { DashboardHeader } from "../components/dashboardHeader";
import ServiceCard from "../components/servicesCard";

interface AddressData {
  street?: string;
  streetNumber?: string;
  city?: string;
  region?: string;
  formattedAddress?: string;
}

export default function LocationScreen() {
  const [location, setLocation] = useState<Region | null>(null);
  const [address, setAddress] = useState<AddressData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const resources = {
    locationText:
      "Indique-nos a sua localização para lhe indicarmos os serviços mais próximos de si.",
    myLocationText: "Esta é a sua localização:",
    buttonText: "Continuar",
  };

  useEffect(() => {
    async function getCurrentLocation() {
      // 1. Request foreground location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // 2. Fetch current GPS position
      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const currentCoords = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };

      // 3. Format into a MapView Region
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01, // Zoom level (smaller = closer)
        longitudeDelta: 0.01,
      });

      let geocode = await Location.reverseGeocodeAsync(currentCoords);

      if (geocode.length > 0) {
        const firstResult = geocode[0];
        setAddress({
          street: firstResult.street ?? "",
          streetNumber: firstResult.streetNumber ?? "",
          city: firstResult.city ?? firstResult.subregion ?? "",
          region: firstResult.region ?? "",
          formattedAddress: `${firstResult.streetNumber ? firstResult.streetNumber + " " : ""}${firstResult.street || ""}, ${firstResult.city || ""}`,
        });
      }
    }

    getCurrentLocation();
  }, []);

  if (!location) {
    return (
      <View style={styles.centered}>
        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <DashboardHeader />
      <BackgroundImage />
      <View
        style={{
          paddingTop: 100,
          paddingBottom: 150,
        }}
      >
        <View
          style={{
            paddingTop: 50,
            paddingLeft: 20,
            gap: 24,
          }}
        >
          <TouchableOpacity style={styles.profileButton} activeOpacity={0.85}>
            <Image
              source={require("../../../assets/images/navBackIcon.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={{
              paddingLeft: 20,
              paddingBottom: 100,
              gap: 24,
            }}
          >
            <ServiceCard category="RESTAURANTE" />
            <Text style={{ fontSize: 14.5, fontWeight: 700, width: 240 }}>
              {resources.locationText}
            </Text>
            <View style={styles.mapCard}>
              <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={location}
                showsUserLocation={true}
              >
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                />
              </MapView>
            </View>
            <View style={styles.location}>
              <Text
                style={{
                  fontSize: 14.5,
                  fontWeight: 700,
                  width: 240,
                  marginTop: -10,
                }}
              >
                {resources.myLocationText}
              </Text>

              <Text style={{ fontSize: 12, marginTop: 5 }}>
                {address?.formattedAddress}
              </Text>
            </View>
            <View>
              <Image
                source={require("../../../assets/images/Subtract.svg")}
                style={{ width: 310, height: 78 }}
              />
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: isSubmitting ? colors.orange : colors.main,
                }}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={colors.orange} size={"large"} />
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 900,
                      color: colors.white,
                    }}
                  >
                    {resources.buttonText}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  mapCard: {
    borderRadius: 40,
    overflow: "hidden",
    width: 320,
    height: 157,
    shadowColor: colors.gray,
    elevation: 5,
  },
  map: {
    width: 320,
    height: 157,
  },
  profileButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: colors.gray,
    marginTop: -20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  location: {
    flex: 1,
    borderRadius: 50,
    width: 320,
    height: 68,
    backgroundColor: colors.gray,
    paddingLeft: 34,
    gap: 10,
  },
  button: {
    top: 10,
    left: 165,
    position: "absolute",
    borderRadius: 50,
    elevation: 3,
    width: 130,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
