import { colors } from "@/styles/global";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PayButton from "../components/PayButton";
import ProductList, { Product } from "../components/ProductList";
import { BackgroundImage } from "../components/backgroundImage";
import { DashboardHeader } from "../components/dashboardHeader";

type PaymentScope = "select" | "all";

const ORDERED_PRODUCTS: Product[] = [
  {
    id: "mushroom-rice-1",
    title: "Arroz de Cogumelos\ncom Omelete",
    description:
      "Um cozido, cujos componentes\nbásicos são diversas variedades de\npeixe, batata, cebola, tomate e\npimentão.",
    category: "Pratos",
    price: 10,
    image: {},
  },
  {
    id: "beer-1",
    title: "Cerveja Super Bock",
    description: "Super Bock é uma marca de cerveja\nportuguesa.",
    category: "Bebidas",
    price: 8,
    image: {},
  },
  {
    id: "lemonade-1",
    title: "Limonada",
    description:
      "Limonada feita à base de água, sumo\nde limão, açúcar e folhas de menta.",
    category: "Bebidas",
    price: 5,
    image: {},
  },
  {
    id: "chicken-1",
    title: "1 Dose de Frango",
    description: "Uma dose de frango acompanhado\ncom batata frita e arroz.",
    category: "Pratos",
    price: 7,
    image: {},
  },
];

function formatCurrency(value: number): string {
  return `${value.toFixed(2).replace(".00", "")}€`;
}

export default function OrderSummaryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [paymentScope, setPaymentScope] = useState<PaymentScope>("all");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const totalLabel = useMemo(() => {
    const relevantProducts =
      paymentScope === "select"
        ? ORDERED_PRODUCTS.filter((product) =>
            selectedProductIds.includes(product.id),
          )
        : ORDERED_PRODUCTS;

    const total = relevantProducts.reduce(
      (currentTotal, product) => currentTotal + (product.price ?? 0),
      0,
    );

    return formatCurrency(total);
  }, [paymentScope, selectedProductIds]);

  const handleOrderMorePress = () => {
    router.push("/restaurant-selection");
  };

  const handlePaymentScopePress = (scope: PaymentScope) => {
    setPaymentScope(scope);
    setSelectedProductIds([]);
  };

  const handleProductPress = (product: Product) => {
    if (paymentScope !== "select") {
      return;
    }

    setSelectedProductIds((currentIds) => {
      const isSelected = currentIds.includes(product.id);

      if (isSelected) {
        return currentIds.filter((id) => id !== product.id);
      }

      return [...currentIds, product.id];
    });
  };

  const handlePayPress = () => {
    router.push("/pay");
  };

  return (
    <View style={styles.contentContainer}>
      <DashboardHeader />
      <BackgroundImage />

      <View
        style={[
          styles.screenContent,
          { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 10 },
        ]}
      >
        <View style={styles.titleSection}>
          <View style={styles.titleTextWrapper}>
            <Text style={styles.tableText}>MESA 12</Text>
            <Text style={styles.title}>O MEU PEDIDO</Text>
          </View>

          <TouchableOpacity
            style={styles.orderMoreButton}
            onPress={handleOrderMorePress}
            activeOpacity={0.85}
          >
            <Text style={styles.orderMoreText}>PEDIR MAIS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <ProductList
            products={ORDERED_PRODUCTS}
            selectedProductIds={selectedProductIds}
            onProductPress={handleProductPress}
            interactive={paymentScope === "select"}
            showSelectionIndicator={paymentScope === "select"}
            dimUnselected={paymentScope === "select"}
          />
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>{totalLabel}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.scopeToggle}>
            <TouchableOpacity
              style={[
                styles.scopeOption,
                paymentScope === "select" && styles.scopeOptionActive,
              ]}
              onPress={() => handlePaymentScopePress("select")}
              activeOpacity={0.85}
            >
              <Text style={styles.scopeOptionText}>SELECIONAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.scopeOption,
                paymentScope === "all" && styles.scopeOptionActive,
              ]}
              onPress={() => handlePaymentScopePress("all")}
              activeOpacity={0.85}
            >
              <Text style={styles.scopeOptionText}>PAGAR TUDO</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.payButtonWrapper}>
            <PayButton
              buttonText="PAGAR"
              cardText="Tem a opção de pagar a conta ou dividir, escolha a sua opção."
              onPress={handlePayPress}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: colors.main,
  },

  screenContent: {
    flex: 1,
    paddingHorizontal: 30,
  },

  titleSection: {
    alignItems: "center",
    marginBottom: 5,
  },

  titleTextWrapper: {
    alignItems: "center",
  },

  tableText: {
    color: "#2B3349",
    fontSize: 13,
    fontWeight: "500",
  },

  title: {
    color: "#2B3349",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 26,
  },

  orderMoreButton: {
    alignSelf: "flex-end",
    height: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#2B3349",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginRight: 5,
  },

  orderMoreText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  listContainer: {
    flex: 1,
    minHeight: 0,
    marginTop: 5,
  },

  totalSection: {
    borderTopWidth: 0,
    borderTopColor: "#D8D8D8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: -30,
    marginTop: 5,
    top: 0,
  },

  totalLabel: {
    color: "#2B3349",
    fontSize: 18,
    fontWeight: "900",
  },

  totalValue: {
    color: "#2B3349",
    fontSize: 18,
    fontWeight: "900",
  },

  footer: {
    height: 150,
  },

  scopeToggle: {
    alignSelf: "flex-end",
    height: 80,
    borderRadius: 40,
    flexDirection: "row",
    overflow: "hidden",
    top: 35,
    zIndex: 10,
  },

  scopeOption: {
    paddingHorizontal: 10,
    backgroundColor: colors.main,
    justifyContent: "center",
    alignItems: "center",
  },

  scopeOptionActive: {
    backgroundColor: colors.orange,
  },

  scopeOptionText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  payButtonWrapper: {
    width: "100%",
  },
});