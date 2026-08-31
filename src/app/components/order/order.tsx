import { Image } from "expo-image";
import { useRouter } from "expo-router";
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

import PayButton from "../PayButton";

import ProductList, { Product, ProductCategory } from "../ProductList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const HEADER_HEIGHT = SCREEN_HEIGHT * 0.22;

const TABS: ProductCategory[] = ["Pratos", "Bebidas", "Sobremesas"];

const PRODUCTS: Product[] = [
  {
    id: "chicken-1",
    title: "Dose de Frango",
    description: "Uma dose de frango acompanhado\ncom batata frita e arroz.",
    category: "Pratos",
    price: 15,
    image: {
      uri: "https://picsum.photos/seed/chicken-1/200/200",
    },
  },
  {
    id: "fish-stew-1",
    title: "Caldeirada de Peixe",
    description:
      "Um cozido, cujos componentes\nbásicos são diversas variedades de\npeixe, batata, cebola, tomate e\npimentão.",
    category: "Pratos",
    price: 12,
    image: {
      uri: "https://picsum.photos/seed/fish-stew-1/200/200",
    },
  },
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
    id: "cod-1",
    title: "Bacalhau à Brás",
    description:
      "Bacalhau desfiado com batata\npalha, ovos, azeitonas e\nsalsa picada.",
    category: "Pratos",
    price: 14,
    image: {
      uri: "https://picsum.photos/seed/cod-1/200/200",
    },
  },
  {
    id: "water-1",
    title: "Água Mineral",
    description: "Garrafa de água mineral.",
    category: "Bebidas",
    price: 2,
    image: {
      uri: "https://picsum.photos/seed/water-1/200/200",
    },
  },
  {
    id: "beer-1",
    title: "Cerveja Super Bock",
    description: "Super Bock é uma marca de cerveja portuguesa.",
    category: "Bebidas",
    price: 3,
    image: {
      uri: "https://picsum.photos/seed/beer-1/200/200",
    },
  },
  {
    id: "mousse-1",
    title: "Mousse de Chocolate",
    description: "Mousse de chocolate caseira.",
    category: "Sobremesas",
    price: 4,
    image: {
      uri: "https://picsum.photos/seed/mousse-1/200/200",
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

export default function OrderScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState<ProductCategory>("Pratos");

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    "chicken-1",
    "mushroom-rice-1",
  ]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery);

    return PRODUCTS.filter((product) => {
      const matchesCategory = product.category === activeTab;

      if (!matchesCategory) {
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

    //router.push("components/ongoingOrder/OngoingOrder");
  };

  const selectedLabel =
    selectedProductIds.length === 1
      ? "PRATO\nSELECIONADO"
      : "PRATOS\nSELECIONADOS";

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
            source={require("../../../../assets/images/restaurante.png")}
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

      <View style={styles.listContainer}>
        <ProductList
          products={filteredProducts}
          selectedProductIds={selectedProductIds}
          onProductPress={handleProductPress}
          interactive
          showSelectionIndicator
          emptyMessage="Nenhum produto encontrado."
        />
      </View>

      <View style={styles.orderFooter}>
        <PayButton
          buttonText={"FAZER\nPEDIDO"}
          cardText={
            "Quando tiver selecionado\ntodos os pratos que deseja\nclique em FAZER PEDIDO."
          }
          onPress={handleOrderPress}
        />

        <View style={styles.selectedItemsPill}>
          <Text style={styles.selectedItemsText}>
            {selectedProductIds.length} {selectedLabel}
          </Text>
        </View>
      </View>
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

  listContainer: {
    flex: 1,
    minHeight: 0,
  },

  orderFooter: {
    position: "relative",
    width: "100%",
    height: 141,
    backgroundColor: "#FFFFFF",
  },

  selectedItemsPill: {
    position: "absolute",
    top: 4,
    right: 49,
    width: 180,
    height: 45,
    borderRadius: 24,
    backgroundColor: "#28324A",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  selectedItemsText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 16,
    textAlign: "center",
  },
});
