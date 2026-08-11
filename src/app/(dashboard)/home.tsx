import { Paths } from "@/const/global";
import { useAuth } from "@/context/authContext";
import { useCategories } from "@/hooks/useCategories";
import { useEstablishmentsNearby } from "@/hooks/useEstablishmentsNearby";
import { useUserStore } from "@/store/userStore/userStore.store";
import { colors } from "@/styles/global";
import { Image } from "expo-image";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackgroundImage } from "../components/backgroundImage";
import { DashboardHeader } from "../components/dashboardHeader";
import SearchBar from "../components/searchBar";
import ServiceCard from "../components/servicesCard";

export default function HomeScreen() {
  const router = useRouter();
  const { categories } = useCategories();
  const { logout } = useAuth();

  const setLocation = useUserStore((state) => state.setLocation);
  const setAddress = useUserStore((state) => state.setAddress);

  const address = useUserStore((state) => state.address);

  const { establishments, fetchEstablishmentsNearby } =
    useEstablishmentsNearby();

  console.log("here", establishments);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        latitudeDelta: 0.01, // Zoom level (smaller = closer)
        longitudeDelta: 0.01,
      };

      // 3. Format into a MapView Region
      setLocation(currentCoords);

      let geocode = await Location.reverseGeocodeAsync(currentCoords);

      if (geocode.length > 0) {
        const firstResult = geocode[0];
        const address = {
          street: firstResult.street ?? "",
          streetNumber: firstResult.streetNumber ?? "",
          city: firstResult.city ?? firstResult.subregion ?? "",
          region: firstResult.region ?? "",
          formattedAddress: `${firstResult.streetNumber ? firstResult.streetNumber + " " : ""}${firstResult.street || ""}, ${firstResult.city || ""}`,
        };
        setAddress(address);
        fetchEstablishmentsNearby(address, currentCoords);
      }
    }

    getCurrentLocation();
  }, []);

  const handleChangeAddress = () => {
    router.push(Paths.location);
  };

  if (!location) {
    return (
      <View style={styles.centered}>
        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : (
          <ActivityIndicator size="large" color={colors.main} />
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
          paddingLeft: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={handleChangeAddress}
          >
            <Image
              source={require("../../../assets/images/locationIcon.png")}
              style={{ width: 36, height: 36 }}
              contentFit="fill"
            />
            <Text
              style={{
                paddingLeft: 9,
                paddingRight: 9,
                fontWeight: 900,
                fontSize: 14,
                width: 170,
                color: colors.gray,
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {address?.formattedAddress}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: 122,
              height: 68,
              borderRadius: 50,
              backgroundColor: colors.lightBlue,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 5,
                height: 5,
                backgroundColor: colors.orange,
                borderRadius: 100,
                marginRight: 5,
                marginBottom: 5,
              }}
            ></View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: colors.white,
              }}
            >
              34,30 €
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingTop: 10,
        }}
      >
        <SearchBar
          data={[]}
          onFilterResult={() => {
            return;
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingLeft: 20,
          paddingTop: 10,
          paddingBottom: 110,
          gap: 21,
        }}
      >
        {categories.map((category) => {
          return <ServiceCard key={category.key} category={category.label} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },

  profileIconBody: {
    width: 24,
    height: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.white,
    marginTop: -2,
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
});
