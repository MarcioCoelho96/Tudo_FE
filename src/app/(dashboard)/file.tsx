import { colors } from "@/styles/global";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackgroundImage } from "../components/backgroundImage";
import { DashboardHeader } from "../components/dashboardHeader";

const MUTED_TEXT_COLOR = "#7A7A7A";

type OngoingOrderItem = {
  id: string;
  label: string;
  phone: string;
  price: string;
  note: string;
};

const ONGOING_ORDER = {
  date: "18/03/2026",
  place: "Café Bar",
  total: "400,50€",
  items: [
    {
      id: "1",
      label: "Nome",
      phone: "910 000 000",
      price: "2,30€",
      note: "(fino, água, café)",
    },
    {
      id: "2",
      label: "Nome",
      phone: "910 000 002",
      price: "5,00€",
      note: "(5 finos)",
    },
    {
      id: "3",
      label: "Nome",
      phone: "910 000 001",
      price: "5,00€",
      note: "(5 finos)",
    },
  ] as OngoingOrderItem[],
};

type FinishedOrder = {
  id: string;
  date: string;
  place: string;
  price: string;
};

const FINISHED_ORDERS: FinishedOrder[] = [
  { id: "1", date: "17/03/2026", place: "Restaurante Bar", price: "36,40€" },
  { id: "2", date: "17/03/2026", place: "Restaurante", price: "38,40€" },
  { id: "3", date: "16/03/2026", place: "Restaurante Bar", price: "36,40€" },
  { id: "4", date: "16/03/2026", place: "Café Bar", price: "36,40€" },
  { id: "5", date: "15/03/2026", place: "Restaurante", price: "246,40€" },
  { id: "6", date: "15/03/2026", place: "Café", price: "16,40€" },
  { id: "7", date: "14/03/2026", place: "Restaurante Bar", price: "36,40€" },
  { id: "8", date: "14/03/2026", place: "Restaurante", price: "38,40€" },
  { id: "9", date: "13/03/2026", place: "Restaurante Bar", price: "36,40€" },
  { id: "10", date: "13/03/2026", place: "Café Bar", price: "36,40€" },
  { id: "11", date: "12/03/2026", place: "Restaurante", price: "246,40€" },
  { id: "12", date: "12/03/2026", place: "Café", price: "16,40€" },
];

export default function FileScreen() {
  const handleOrderPress = () => {};

  return (
    <View style={styles.container}>
      <DashboardHeader />
      <BackgroundImage />

      <ScrollView
        style={styles.scrollViewContainer} // MODIFICADO: Adicionado style para definir a área visível do ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>REGISTO DE PEDIDOS</Text>

        <Text style={styles.sectionTitle}>Em andamento...</Text>

        <View style={styles.ongoingCard}>
          <Text style={styles.ongoingHeaderText}>
            {ONGOING_ORDER.date} - {ONGOING_ORDER.place} -{" "}
            {ONGOING_ORDER.total}
          </Text>

          {ONGOING_ORDER.items.map((item) => (
            <View key={item.id} style={styles.ongoingItem}>
              <Text style={styles.ongoingItemText}>
                {item.label} - {item.phone} - {item.price}
              </Text>
              <Text style={styles.ongoingItemNote}>{item.note}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.viewOrderButton}
          activeOpacity={0.8}
          onPress={handleOrderPress}
        >
          <Text style={styles.viewOrderButtonText}>VER PEDIDO</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Terminados</Text>

        <View>
          {FINISHED_ORDERS.map((order, index) => (
            <TouchableOpacity
              key={order.id}
              activeOpacity={0.8}
              onPress={handleOrderPress}
            >
              <Text
                style={[
                  styles.finishedItemText,
                  index % 2 === 1 && styles.finishedItemTextMuted,
                ]}
              >
                {order.date} - {order.place} - {order.price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },

  // MODIFICADO: Criado para empurrar o início do ScrollView para baixo do cabeçalho
  scrollViewContainer: {
    flex: 1,
    marginTop: 100, // Ajusta este valor de acordo com a altura exata do teu DashboardHeader
  },

  scrollContent: {
    paddingTop: 10, // MODIFICADO: Alterado de 150 para 10 para evitar duplicação de espaço
    paddingHorizontal: 24,
    paddingBottom: 160,
  },

  title: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.main,
    marginBottom: 24,
    alignSelf: "center",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.main,
    marginBottom: 10,
  },

  ongoingCard: {
    marginBottom: 0,
  },

  ongoingHeaderText: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.main,
    marginBottom: 10,
  },

  ongoingItem: {
    marginBottom: 8,
  },

  ongoingItemText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.main,
  },

  ongoingItemNote: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.main,
  },

  viewOrderButton: {
    height: 40,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: colors.main,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
    marginTop: 20,
  },

  viewOrderButtonText: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.white,
    letterSpacing: 0.5,
  },

  divider: {
    height: 1,
    backgroundColor: colors.gray,
    marginBottom: 20,
  },

  finishedItemText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.main,
    marginBottom: 12,
  },

  finishedItemTextMuted: {
    fontWeight: "400",
    color: MUTED_TEXT_COLOR,
  },
});