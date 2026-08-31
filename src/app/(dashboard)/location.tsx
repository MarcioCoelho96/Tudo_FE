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

const DEFAULT_REGION: Region = {
  latitude: 41.1579,
  longitude: -8.6291,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function LocationScreen() {
  const { back } = useRouter();
  const storeLocation = useUserStore((state) => state.location);
  const storeAddress = useUserStore((state) => state.address);

  const setLocation = useUserStore((state) => state.setLocation);
  const setAddress = useUserStore((state) => state.setAddress);

  const initialRegion = storeLocation || DEFAULT_REGION;

  const [selectedAddress, setSelectedAddress] = useState<LocationData | null>({
    location: initialRegion,
    address: storeAddress || {
      street: "Rua Nova da Telha",
      streetNumber: "261",
      city: "Porto",
      region: "Porto",
      formattedAddress: "Rua Nova da Telha, nº261, Porto",
    },
  });

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
      const geocode = await Location.reverseGeocodeAsync({
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
      });

      if (geocode.length > 0) {
        const item = geocode[0];

        setSelectedAddress({
          location: {
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
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
      setLocation(selectedAddress.location);
      setAddress(selectedAddress.address);
      back();
    }
  };

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
            justifyContent: "center",
            gap: 24,
          }}
        >
          <Image
            source={require("../../../assets/images/navBackIcon.png")}
            style={{ width: 24, height: 24 }}
          />
        </View>

        <View style={styles.elementsContainer}>
          <ServiceCard category="RESTAURANTE" />

          {/* Texto alinhado à esquerda */}
          <Text style={styles.instructionText}>{resources.locationText}</Text>

          <View style={styles.mapCard}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={initialRegion}
              onRegionChangeComplete={handleRegionChangeComplete}
            />

            <View style={styles.centerPinContainer} pointerEvents="none">
              <Ionicons name="location" size={40} color="#EB6300" />
              <View style={styles.pinDot} />
            </View>
          </View>

          <View style={styles.location}>
            <Text style={styles.locationTitle}>{resources.myLocationText}</Text>

            {/* Morada sem azul e sem sublinhado */}
            <Text style={styles.locationAddress}>
              {selectedAddress?.address?.formattedAddress ||
                "A carregar localização..."}
            </Text>
          </View>

          {/* Contentor do botão com sombra */}
          <View style={styles.bottomWrapper}>
            <Image
              source={require("../../../assets/images/Subtract.svg")}
              style={styles.subtractImage}
              tintColor={colors.white}
            />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isSubmitting ? colors.orange : colors.main },
              ]}
              onPress={handleContinue}
            >
              {isSubmitting ? (
                <ActivityIndicator color={colors.white} size={"small"} />
              ) : (
                <Text style={styles.buttonText}>{resources.buttonText}</Text>
              )}
            </TouchableOpacity>
          </View>
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

  mainContent: {
    paddingTop: 110,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  elementsContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },

  instructionText: {
    fontSize: 14,
    fontWeight: "700",
    width: 320,
    textAlign: "left",
  },

  mapCard: {
    borderRadius: 35,
    overflow: "hidden",
    width: 320,
    height: 140,
    elevation: 6, // Sombra do mapa
  },

  map: {
    width: 320,
    height: 140,
  },

  profileButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: colors.gray,
    marginTop: -20,
    marginLeft: 20,
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
    borderRadius: 30,
    width: 320,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    gap: 2,
    justifyContent: "center", // <- Aqui estava o erro (tinha um ponto a mais)
  },

  locationTitle: {
    fontSize: 14,
    fontWeight: "700",
    width: 240,
  },

  locationAddress: {
    fontSize: 12,
    color: "#0d58e4",
    fontWeight: "500",
  },

  bottomWrapper: {
    marginTop: 5,
    width: 310,
    height: 70,
    elevation: 6,
  },

  subtractImage: {
    width: "100%",
    height: "100%",
  },

  button: {
    top: 10,
    left: 165,
    position: "absolute",
    borderRadius: 50,
    elevation: 3,
    width: 130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.white,
  },

  centerPinContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
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
