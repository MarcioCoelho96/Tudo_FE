import { colors } from "@/styles/global";
import { Image } from "expo-image";

import { useUserStore } from "@/store/userStore/userStore.store";
import { AddressData } from "@/store/userStore/userStore.types";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { BackgroundImage } from "../components/backgroundImage";
import { DashboardHeader } from "../components/dashboardHeader";
import ServiceCard from "../components/servicesCard";

interface LocationData {
  location: Region | null;
  address: AddressData | null;
}

export default function LocationScreen() {
  const { back } = useRouter();
  const location = useUserStore((state) => state.location);
  const address = useUserStore((state) => state.address);

  const setLocation = useUserStore((state) => state.setLocation);
  const setAddress = useUserStore((state) => state.setAddress);

  const [selectedAddress, setSelectedAddress] = useState<LocationData | null>(
    null,
  );
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const resources = {
    locationText:
      "Indique-nos a sua localização para lhe indicarmos os serviços mais próximos de si.",
    myLocationText: "Esta é a sua localização:",
    buttonText: "Continuar",
  };

  const handleBack = () => {
    back();
  };

  const handleRegionChangeComplete = async (newRegion: Region) => {
    setLoadingAddress(true);

    try {
      // Reverse geocode the center coordinates of the map
      const geocode = await Location.reverseGeocodeAsync({
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
      });

      if (geocode.length > 0) {
        const item = geocode[0];

        setSelectedAddress({
          location: {
            latitude: newRegion.longitude,
            longitude: newRegion.latitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          address: {
            street: item.street ?? "",
            streetNumber: item.streetNumber ?? "",
            city: item.city ?? item.subregion ?? "",
            region: item.region ?? "",
            formattedAddress: `${item.streetNumber ? item.streetNumber + " " : ""}${item.street || ""}, ${item.city || ""}`,
          },
        });
      }
    } catch (error) {
      console.error("Failed to geocode location:", error);
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleContinue = () => {
    if (selectedAddress?.location && selectedAddress.address) {
      setLocation(selectedAddress?.location);
      setAddress(selectedAddress.address);
      back();
    }
  };

  if (!location) {
    return;
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
          <TouchableOpacity
            style={styles.profileButton}
            activeOpacity={0.85}
            onPress={handleBack}
          >
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
                initialRegion={location && location}
                onRegionChangeComplete={handleRegionChangeComplete}
              />

              <View style={styles.centerPinContainer} pointerEvents="none">
                <Ionicons name="location" size={40} color="#FF3B30" />
                <View style={styles.pinDot} />
              </View>
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
                {selectedAddress?.address?.formattedAddress}
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
                onPress={handleContinue}
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

  centerPinContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    // Shifts the pin up slightly so the bottom tip points to exact center
    marginTop: -20,
  },
  pinDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
    opacity: 0.3,
    marginTop: -4,
  },
});
