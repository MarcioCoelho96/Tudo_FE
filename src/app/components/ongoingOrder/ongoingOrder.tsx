import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import PayButton from "../PayButton";
import ScreenBackground from "../screenBackground";

import ProductList, { Product } from "../ProductList";

const ORDER_PRODUCTS: Product[] = [
  {
    id: "mushroom-rice-1",
    title: "Arroz de Cogumelos\ncom Omelete",
    description:
      "Um cozido, cujos componentes\nbásicos são diversas variedades de\npeixe, batata, cebola, tomate e\npimentão.",
    category: "Pratos",
    price: 8,
    image: {
      uri: "https://picsum.photos/seed/mushroom-rice-1/200/200",
    },
  },
  {
    id: "super-bock-1",
    title: "Cerveja Super Bock",
    description: "Super Bock é uma marca de cerveja\nportuguesa.",
    category: "Bebidas",
    price: 3,
    image: {
      uri: "https://picsum.photos/seed/super-bock-1/200/200",
    },
  },
  {
    id: "lemonade-1",
    title: "Limonada",
    description:
      "Limonada feita à base de água, sumo\nde limão, açúcar e folhas de menta.",
    category: "Bebidas",
    price: 4,
    image: {
      uri: "https://picsum.photos/seed/lemonade-1/200/200",
    },
  },
  {
    id: "chicken-1",
    title: "1 Dose de Frango",
    description: "Uma dose de frango acompanhado\ncom batata frita e arroz.",
    category: "Pratos",
    price: 15,
    image: {
      uri: "https://picsum.photos/seed/chicken-1/200/200",
    },
  },
  {
    id: "mushroom-rice-2",
    title: "Arroz de Cogumelos\ncom Omelete",
    description:
      "Um cozido, cujos componentes\nbásicos são diversas variedades de\npeixe, batata, cebola, tomate e\npimentão.",
    category: "Pratos",
    price: 8,
    image: {
      uri: "https://picsum.photos/seed/mushroom-rice-2/200/200",
    },
  },
  {
    id: "mushroom-rice-3",
    title: "Arroz de Cogumelos\ncom Omelete",
    description:
      "Um cozido, cujos componentes\nbásicos são diversas variedades de\npeixe, batata, cebola, tomate e\npimentão.",
    category: "Pratos",
    price: 8,
    image: {
      uri: "https://picsum.photos/seed/mushroom-rice-3/200/200",
    },
  },
];

function formatCurrency(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

export default function OngoingOrderScreen() {
  const router = useRouter();

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const allProductIds = useMemo(() => {
    return ORDER_PRODUCTS.map((product) => product.id);
  }, []);

  const selectedProducts = useMemo(() => {
    return ORDER_PRODUCTS.filter((product) =>
      selectedProductIds.includes(product.id),
    );
  }, [selectedProductIds]);

  const selectedTotal = useMemo(() => {
    return selectedProducts.reduce(
      (currentTotal, product) => currentTotal + (product.price ?? 0),
      0,
    );
  }, [selectedProducts]);

  const isPayAllActive =
    ORDER_PRODUCTS.length > 0 &&
    selectedProductIds.length === ORDER_PRODUCTS.length &&
    allProductIds.every((id) => selectedProductIds.includes(id));

  const handleOrderMore = () => {
    router.replace("/components/order/order");
  };

  const handleProfilePress = () => {
    router.replace("/profile");
  };

  const handleProductPress = (product: Product) => {
    setSelectedProductIds((currentIds) => {
      const isSelected = currentIds.includes(product.id);

      if (isSelected) {
        return currentIds.filter((id) => id !== product.id);
      }

      return [...currentIds, product.id];
    });
  };

  const handlePayAllToggle = () => {
    if (isPayAllActive) {
      setSelectedProductIds([]);
      return;
    }

    setSelectedProductIds(allProductIds);
  };

  const handlePay = () => {
    if (selectedProducts.length === 0) {
      console.log("Select at least one product before paying.");

      return;
    }

    console.log("Selected products:", selectedProducts);

    console.log("Selected total:", selectedTotal);

    /*
     * Add payment navigation later:
     *
     * router.replace({
     *   pathname: "/Payment/payment",
     *   params: {
     *     productIds: JSON.stringify(
     *       selectedProductIds,
     *     ),
     *     total: String(
     *       selectedTotal,
     *     ),
     *   },
     * });
     */
  };

  return (
    <ScreenBackground>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Image
            source={require("../../../../assets/images/logo.png")}
            style={styles.logo}
            contentFit="contain"
          />

          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleProfilePress}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../../../assets/images/profileButton.png")}
              style={styles.profileImage}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.tableText}>MESA 12</Text>

          <Text style={styles.title}>O MEU PEDIDO</Text>

          <TouchableOpacity
            style={styles.orderMoreButton}
            onPress={handleOrderMore}
            activeOpacity={0.8}
          >
            <Text style={styles.orderMoreButtonText}>PEDIR MAIS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <ProductList
            products={ORDER_PRODUCTS}
            selectedProductIds={selectedProductIds}
            onProductPress={handleProductPress}
            interactive
            showSelectionIndicator
            emptyMessage="O seu pedido está vazio."
          />
        </View>

        <View style={styles.paymentFooter}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>

            <Text style={styles.totalValue}>
              {formatCurrency(selectedTotal)}€
            </Text>
          </View>

          <View style={styles.paymentCardContainer}>
            <View style={styles.payButtonScaleWrapper}>
              <PayButton
                buttonText="PAGAR"
                cardText="Selecione os produtos que deseja pagar ou escolha PAGAR TUDO."
                onPress={handlePay}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.payAllToggle,
                isPayAllActive && styles.payAllToggleActive,
              ]}
              onPress={handlePayAllToggle}
              activeOpacity={0.8}
            >
              <Text style={styles.payAllToggleText}>PAGAR TUDO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 35,
    marginHorizontal: 18,
    marginBottom: 8,
  },

  header: {
    height: 62,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    zIndex: 10,
  },

  logo: {
    width: 105,
    height: 42,
  },

  profileButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  profileImage: {
    width: 45,
    height: 45,
  },

  titleSection: {
    paddingHorizontal: 20,
    alignItems: "center",
  },

  tableText: {
    color: "#28324A",
    fontSize: 13,
    fontWeight: "500",
  },

  title: {
    color: "#28324A",
    fontSize: 17,
    fontWeight: "900",
  },

  orderMoreButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    height: 25,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "#28324A",
    justifyContent: "center",
    alignItems: "center",
  },

  orderMoreButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },

  listContainer: {
    flex: 1,
    minHeight: 0,
    marginTop: 4,
  },

  paymentFooter: {
    width: "100%",
    height: 151,
    paddingHorizontal: 18,
    flexShrink: 0,
  },

  totalRow: {
    height: 39,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E1E1E1",
  },

  totalLabel: {
    color: "#28324A",
    fontSize: 16,
    fontWeight: "900",
  },

  totalValue: {
    color: "#28324A",
    fontSize: 15,
    fontWeight: "500",
  },

  paymentCardContainer: {
    position: "relative",
    width: "100%",
    height: 112,
  },

  payButtonScaleWrapper: {
    transform: [
      {
        translateX: -16,
      },
      {
        translateY: -8,
      },
      {
        scale: 0.87,
      },
    ],
    transformOrigin: "left top",
  },

  payAllToggle: {
    position: "absolute",
    right: 52,
    bottom: 76,
    width: 140,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "#28324A",
    zIndex: 10,
  },

  payAllToggleActive: {
    backgroundColor: "#FF5200",
  },

  payAllToggleText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    textAlign: "center",
  },
});
