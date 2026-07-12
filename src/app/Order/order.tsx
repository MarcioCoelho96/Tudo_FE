import { Image } from "expo-image";
import React, { useMemo, useState } from "react";

import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import OrderFooter from "../components/PayButton";

import ProductList, {
  Product,
  ProductCategory,
} from "../components/ProductList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const HEADER_HEIGHT = SCREEN_HEIGHT * 0.22;

const TABS: ProductCategory[] = ["Pratos", "Bebidas", "Sobremesas"];

const PRODUCTS: Product[] = [
  {
    id: "frango",
    title: "Dose de Frango",
    description: "Uma dose de frango acompanhado\ncom batata frita e arroz.",
    category: "Pratos",
    image: {
      uri: "https://picsum.photos/seed/frango/200/200",
    },
  },
  {
    id: "peixe",
    title: "Caldeirada de Peixe",
    description:
      "Um cozido, cujos componentes\nbásicos são diversas variedades de\npeixe, batata, cebola, tomate e\npimentão.",
    category: "Pratos",
    image: {
      uri: "https://picsum.photos/seed/peixe/200/200",
    },
  },
  {
    id: "arroz",
    title: "Arroz de Cogumelos\ncom Omelete",
    description:
      "Um cozido, cujos componentes\nbásicos são diversas variedades de\npeixe, batata, cebola, tomate e\npimentão.",
    category: "Pratos",
    image: {
      uri: "https://picsum.photos/seed/arroz/200/200",
    },
  },
  {
    id: "bacalhau",
    title: "Bacalhau à Brás",
    description:
      "Bacalhau desfiado com batata\npalha, ovos, azeitonas e\nsalsa picada.",
    category: "Pratos",
    image: {
      uri: "https://picsum.photos/seed/bacalhau/200/200",
    },
  },
  {
    id: "agua",
    title: "Água Mineral",
    description: "Garrafa de água mineral.",
    category: "Bebidas",
    image: {
      uri: "https://picsum.photos/seed/agua/200/200",
    },
  },
  {
    id: "mousse",
    title: "Mousse de Chocolate",
    description: "Mousse de chocolate caseira.",
    category: "Sobremesas",
    image: {
      uri: "https://picsum.photos/seed/mousse/200/200",
    },
  },
];

function normalizeText(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export default function RestaurantScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState<ProductCategory>("Pratos");

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    "frango",
    "arroz",
  ]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery);

    return PRODUCTS.filter((product) => {
      if (product.category !== activeTab) {
        return false;
      }

      if (normalizedQuery === "") {
        return true;
      }

      const searchableText = [
        product.title,
        product.description,
        product.category,
      ]
        .map(normalizeText)
        .join(" ");

      return searchableText.includes(normalizedQuery);
    });
  }, [activeTab, searchQuery]);

  const handleProductPress = (product: Product) => {
    setSelectedProductIds((currentIds) => {
      const isSelected = currentIds.includes(product.id);

      if (isSelected) {
        return currentIds.filter((id) => id !== product.id);
      }

      return [...currentIds, product.id];
    });
  };

  const handleOrderPress = () => {
    const selectedProducts = PRODUCTS.filter((product) =>
      selectedProductIds.includes(product.id),
    );

    console.log("Selected products:", selectedProducts);

    /*
      Later you can navigate:

      router.push({
        pathname: "/myOrder",
        params: {
          products: JSON.stringify(
            selectedProducts
          ),
        },
      });
    */
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.header}>
        <View style={styles.headerImageContainer}>
          <Image
            source={require("../../../assets/images/restaurante.png")}
            style={styles.headerImage}
            contentFit="cover"
          />

          <View style={styles.headerOverlay}>
            <Text style={styles.headerOverlayText}>RESTAURANTE</Text>
          </View>
        </View>

        <View style={styles.searchRow}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Pesquisar"
            placeholderTextColor="#7A7A7A"
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
        </View>

        <View style={styles.tabsRow}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, isActive && styles.activeTabButton]}
                onPress={() => {
                  setActiveTab(tab);
                  setSearchQuery("");
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.tabText, isActive && styles.activeTabText]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Green component */}
      <ProductList
        products={filteredProducts}
        selectedProductIds={selectedProductIds}
        onProductPress={handleProductPress}
        emptyMessage="Nenhum produto encontrado."
      />

      {/* Red component */}
      <OrderFooter
        selectedCount={selectedProductIds.length}
        onOrderPress={handleOrderPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    backgroundColor: "#FFFFFF",
  },

  headerImageContainer: {
    width: "100%",
    height: HEADER_HEIGHT,
    paddingHorizontal: 20,
    paddingTop: (StatusBar.currentHeight || 44) + 10,
  },

  headerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },

  headerOverlay: {
    position: "absolute",
    left: 50,
    right: 50,
    bottom: 15,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(185,185,185,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },

  headerOverlayText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },

  searchRow: {
    width: "100%",
    marginTop: 14,
    paddingHorizontal: 20,
  },

  searchInput: {
    width: "100%",
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: "#D9D9D9",
    color: "#1E1E1E",
    fontSize: 15,
    fontWeight: "700",
  },

  tabsRow: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
  },

  tabButton: {
    flex: 1,
    height: 36,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: "#E6E6E6",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  activeTabButton: {
    backgroundColor: "#F2F2F2",
  },

  tabText: {
    color: "#28324A",
    fontSize: 13,
    fontWeight: "700",
  },

  activeTabText: {
    fontWeight: "900",
  },
});
