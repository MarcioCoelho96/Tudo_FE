import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ProductList, { Product } from "../components/ProductList";
import ScreenBackground from "../components/screenBackground";

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

  const handleProfilePress = () => {
    router.push("/profile");
  };

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
    <ScreenBackground>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
            contentFit="contain"
          />

          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleProfilePress}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../../assets/images/profileButton.png")}
              style={styles.profileImage}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <View>
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
          <Image
            source={require("../../../assets/images/bottom_card.png")}
            style={styles.footerBackground}
            contentFit="fill"
          />

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

          <TouchableOpacity
            style={styles.payButton}
            onPress={handlePayPress}
            activeOpacity={0.85}
          >
            <Text style={styles.payButtonText}>PAGAR</Text>
          </TouchableOpacity>

          <Text style={styles.payHelperText}>
            Tem a opção de pagar a conta ou dividir, escolha a sua opção.
          </Text>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 55,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },

  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    zIndex: 10,
  },

  logo: {
    width: 150,
    height: 40,
    left: 20,
  },

  profileButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  profileImage: {
    width: 50,
    height: 50,
    right: 50,
  },

  titleSection: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
  },

  tableText: {
    color: "#28324A",
    fontSize: 13,
    fontWeight: "500",
    left: 50,
  },

  title: {
    color: "#2E3852",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 27,
  },

  orderMoreButton: {
    height: 30,
    paddingHorizontal: 22,
    marginTop: 10,
    borderRadius: 20,
    left: 142,
    backgroundColor: "#223C63",
    justifyContent: "center",
    alignItems: "center",
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
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalLabel: {
    color: "#303A53",
    fontSize: 18,
    fontWeight: "900",
    left: 20,
  },

  totalValue: {
    color: "#303A53",
    fontSize: 18,
    fontWeight: "900",
    right: 20,
  },

  footer: {
    marginTop: 30,
    height: 200,
    position: "relative",
  },

  footerBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 80,
    width: "100%",
    height: 140,
  },

  scopeToggle: {
    position: "absolute",
    bottom: 180,
    right: 6,
    flexDirection: "row",
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    zIndex: 5,
  },

  scopeOption: {
    minWidth: 100,
    height: "100%",
    paddingHorizontal: 16,
    backgroundColor: "#2E3852",
    justifyContent: "center",
    alignItems: "center",
  },

  scopeOptionActive: {
    backgroundColor: "#EB6300",
  },

  scopeOptionText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  payButton: {
    position: "absolute",
    left: 15,
    bottom: 100,
    width: 150,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#EB6300",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 6,

    elevation: 7,
  },

  payButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  payHelperText: {
    position: "absolute",
    left: 170,
    right: 20,
    top: 55,
    color: "#28324A",
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 16,
  },
});
