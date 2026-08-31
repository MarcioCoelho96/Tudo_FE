import { colors } from "@/styles/global";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { BackgroundImage } from "../components/backgroundImage";
import BookingModal from "../components/BookingModal";
import { DashboardHeader } from "../components/dashboardHeader";
import PaymentModal from "../components/payment-modal";
import SearchBar from "../components/searchBar";

interface RestaurantCard {
  id: string;
  label: string;
  image: number;
}

const RECENT_RESTAURANTS: RestaurantCard[] = [
  {
    id: "recent-1",
    label: "RESTAURANTE\nANTÓNIO",
    image: require("../../../assets/images/restaurante.png"),
  },
  {
    id: "recent-2",
    label: "RESTAURANTE\n",
    image: require("../../../assets/images/restaurante.png"),
  },
  {
    id: "recent-3",
    label: "RESTAURANTE\nBAR",
    image: require("../../../assets/images/restaurante.png"),
  },
];

const NEARBY_RESTAURANTS: RestaurantCard[] = [
  {
    id: "nearby-1",
    label: "RESTAURANTE",
    image: require("../../../assets/images/restaurante.png"),
  },
  {
    id: "nearby-2",
    label: "RESTAURANTE",
    image: require("../../../assets/images/restaurante.png"),
  },
  {
    id: "nearby-3",
    label: "RESTAURANTE",
    image: require("../../../assets/images/restaurante.png"),
  },
];

export default function RestaurantSearchScreen() {
  // Estados para controlar os Modais
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);

  // Ao clicar num Restaurante -> Abre o BookingModal
  const handleSelectRestaurant = () => {
    setIsBookingVisible(true);
  };

  // Se no BookingModal clicar em "RESERVAR E PEDIR" -> Fecha BookingModal e abre PaymentModal
  const handleOrderAndBook = () => {
    setIsBookingVisible(false);
    setTimeout(() => {
      setIsPaymentVisible(true);
    }, 200); // Pequeno atraso para a animação ser suave
  };

  return (
    <View style={styles.container}>
      <DashboardHeader />
      <BackgroundImage />

      <View style={styles.searchRow}>
        <SearchBar
          data={[]}
          placeholder="Insira aqui o Restaurante"
          onFilterResult={() => {}}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.recentsPanel}>
          <Text style={styles.recentsTitle}>RECENTES</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentsRow}
          >
            {RECENT_RESTAURANTS.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.recentCard}
                activeOpacity={0.85}
                onPress={handleSelectRestaurant}
              >
                <Image
                  source={restaurant.image}
                  style={StyleSheet.absoluteFillObject}
                  contentFit="cover"
                />

                <View style={styles.recentOrangeDot} />

                <View style={styles.recentTextOverlay}>
                  <Text style={styles.recentCardText} numberOfLines={2}>
                    {restaurant.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>
          OS RESTAURANTES{"\n"}PERTO DE TI:
        </Text>

        <View style={styles.nearbyList}>
          {NEARBY_RESTAURANTS.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              activeOpacity={0.9}
              style={styles.nearbyCard}
              onPress={handleSelectRestaurant}
            >
              <Image
                source={restaurant.image}
                style={StyleSheet.absoluteFillObject}
                contentFit="cover"
              />

              <View style={styles.nearbyOrangeCircle} />

              <View style={styles.nearbyTextOverlay}>
                <Text style={styles.nearbyCardText}>{restaurant.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* MODAL 1: RESERVA E MARCAÇÃO */}
      <BookingModal
        visible={isBookingVisible}
        onClose={() => setIsBookingVisible(false)}
        onOrderAndBook={handleOrderAndBook}
      />

      {/* MODAL 2: PAGAMENTO (REUTILIZADO DIRECTAMENTE) */}
      <PaymentModal
        visible={isPaymentVisible}
        onClose={() => setIsPaymentVisible(false)}
        onConfirm={() => {
          setIsPaymentVisible(false);
          // Ação ao finalizar o pagamento
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },

  scrollContent: {
    paddingTop: 5,
    paddingHorizontal: 25,
    paddingBottom: 160,
  },

  searchRow: {
    paddingTop: 110,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  recentsPanel: {
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#E4E4E4",
  },

  recentsTitle: {
    color: colors.main,
    fontSize: 18,
    fontWeight: "900",
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 10,
  },

  recentsRow: {
    flexDirection: "row",
    gap: 5,
    paddingLeft: 0,
  },

  recentCard: {
    width: 120,
    height: 120,
    borderRadius: 30,
    overflow: "hidden",
    position: "relative",
  },

  recentOrangeDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.orange,
    zIndex: 2,
  },

  recentTextOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  recentCardText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.3,
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "900",
    color: colors.main,
    lineHeight: 18,
  },

  nearbyList: {
    gap: 20,
  },

  nearbyCard: {
    width: "100%",
    height: 170,
    borderRadius: 50,
    overflow: "hidden",
    position: "relative",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  nearbyOrangeCircle: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.orange,
    zIndex: 2,
  },

  nearbyTextOverlay: {
    width: "100%",
    height: 65,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  nearbyCardText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1.2,
  },
});