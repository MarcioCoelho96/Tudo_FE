import { Paths } from "@/const/global";
import { useUserStore } from "@/store/userStore/userStore.store";
import { colors } from "@/styles/global";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackgroundImage } from "../components/backgroundImage";
import { DashboardHeader } from "../components/dashboardHeader";
import SearchBar from "../components/searchBar";

const CATEGORIES = [
  {
    id: "1",
    label: "CAFÉ",
    image: require("../../../assets/images/cafeImage.jpg"),
  },
  {
    id: "2",
    label: "RESTAURANTE",
    image: require("../../../assets/images/restaurante.png"),
  },
  {
    id: "3",
    label: "LAVANDARIA",
    image: require("../../../assets/images/laundromat-worker.jpg"),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const address = useUserStore((state) => state.address);

  const [isSearching, setIsSearching] = useState(false);

  const handleChangeAddress = () => {
    router.push(Paths.location);
  };

  // Mantém apenas a função sem lógica de router para o toque fazer a animação de opacidade
  const handleCategoryPress = () => {};

  const displayAddress =
    address?.formattedAddress || "Rua Nova da Telha, nº261, 482...";

  return (
    <View style={styles.container}>
      <DashboardHeader />
      <BackgroundImage />

      <View style={styles.headerRowContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.addressButton}
            onPress={handleChangeAddress}
            activeOpacity={0.7}
          >
            <Image
              source={require("../../../assets/images/locationIcon.png")}
              style={{ width: 36, height: 36 }}
              contentFit="fill"
            />
            <Text
              style={styles.addressText}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {isSearching ? "Escolher morada" : displayAddress}
            </Text>
          </TouchableOpacity>

          <View style={styles.balanceBadge}>
            <View style={styles.orangeDot} />
            <Text style={styles.balanceText}>34,30 €</Text>
          </View>
        </View>
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchBarWrapper}>
        <SearchBar
          data={[]}
          onFilterResult={() => {}}
          onFocus={() => setIsSearching(true)}
          onBlur={() => setIsSearching(false)}
        />
      </View>

      {isSearching && (
        <Text style={styles.searchSectionTitle}>
          QUE TIPO DE SERVIÇO PROCURA?
        </Text>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={handleCategoryPress}
            activeOpacity={0.9}
            style={styles.cardContainer}
          >
            <Image
              source={item.image}
              style={StyleSheet.absoluteFillObject}
              contentFit="cover"
            />

            <View style={styles.orangeCircle} />

            <View style={styles.textOverlay}>
              <Text style={styles.cardText}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },

  headerRowContainer: {
    paddingTop: 120,
    paddingLeft: 20,
    paddingRight: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  addressButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  addressText: {
    paddingLeft: 9,
    paddingRight: 9,
    fontWeight: "900",
    fontSize: 14,
    maxWidth: 170,
    color: colors.gray,
  },

  balanceBadge: {
    width: 110,
    height: 55,
    borderRadius: 50,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  orangeDot: {
    width: 6,
    height: 6,
    backgroundColor: colors.orange,
    borderRadius: 100,
    marginRight: 6,
    marginBottom: 4,
  },

  balanceText: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.white,
  },

  searchBarWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },

  searchSectionTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.main,
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 5,
  },

  scrollContent: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 160,
    gap: 20,
  },

  cardContainer: {
    width: 360,
    height: 170,
    borderRadius: 50,
    overflow: "hidden",
    position: "relative",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "center",
  },

  orangeCircle: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: colors.orange || "#E25822",
    zIndex: 2,
  },

  textOverlay: {
    width: 360,
    height: 70,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  cardText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1.2,
  },
});