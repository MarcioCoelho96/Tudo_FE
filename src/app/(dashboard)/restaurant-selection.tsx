import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import PayButton from "../components/PayButton";
import ProductList, {
  Product,
  ProductCategory,
} from "../components/ProductList";
import ScreenBackground from "../components/screenBackground";

const TABS: ProductCategory[] = ["Pratos", "Bebidas", "Sobremesas"];

const PRODUCTS: Product[] = [
  {
    id: "chicken-1",
    title: "1 Dose de Frango",
    description: "Uma dose de frango acompanhado\ncom batata frita e arroz.",
    category: "Pratos",
    price: 15,
    image: {    },
  },
  {
    id: "caldeira-de-peixe-1",
    title: "Caldeira de Peixe",
    description:
      "Um cozido, cujos componentes\nbásicos são diversas variedades de\npeixe, batata, cebola, tomate e\npimentão.",
    category: "Pratos",
    price: 8,
    image: {    },
  },
  {
    id: "mushroom-rice-1",
    title: "Arroz de Cogumelos\ncom Omelete",
    description:
      "Prato de arroz cozinhado com cogumelos, cebola e azeite, acompanhado com uma omelete.",
    category: "Pratos",
    price: 8,
    image: {},
  },
  {
    id: "beer-1",
    title: "Cerveja Super Bock",
    description: "Super Bock é uma marca de cerveja portuguesa.",
    category: "Bebidas",
    price: 3,
    image: {    },
  },
  {
    id: "water-1",
    title: "Água",
    description: "33cl",
    category: "Bebidas",
    price: 2,
    image: {},
  },
  {
    id: "lemonade-1",
    title: "Limonada",
    description:
      "Limonada feita à base de água, sumo\nde limão, açúcar e folhas de menta.",
    category: "Bebidas",
    price: 2,
    image: {    },
  },
  {
    id: "mousse-1",
    title: "Mousse de Chocolate",
    description: "Mousse de chocolate caseira.",
    category: "Sobremesas",
    price: 4,
    image: {},
  },
];

const CATEGORY_LABELS: Record<
  ProductCategory,
  { singular: string; plural: string }
> = {
  Pratos: {
    singular: "PRATO SELECIONADO",
    plural: "PRATOS SELECIONADOS",
  },
  Bebidas: {
    singular: "BEBIDA SELECIONADA",
    plural: "BEBIDAS SELECIONADAS",
  },
  Sobremesas: {
    singular: "SOBREMESA SELECIONADA",
    plural: "SOBREMESAS SELECIONADAS",
  },
};

function normalizeText(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export default function RestaurantSelectionScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState<ProductCategory>("Bebidas");

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    "beer-1",
    "lemonade-1",
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

      const searchableText = [product.title, product.description]
        .map(normalizeText)
        .join(" ");

      return searchableText.includes(normalizedQuery);
    });
  }, [activeTab, searchQuery]);

  const activeCategorySelectedCount = useMemo(() => {
    return PRODUCTS.filter(
      (product) =>
        product.category === activeTab && selectedProductIds.includes(product.id)
    ).length;
  }, [activeTab, selectedProductIds]);

  const selectedLabel = useMemo(() => {
    const labels = CATEGORY_LABELS[activeTab];

    return activeCategorySelectedCount === 1 ? labels.singular : labels.plural;
  }, [activeTab, activeCategorySelectedCount]);

  const handleProfilePress = () => {
    router.push("/profile");
  };

  const handleTabPress = (tab: ProductCategory) => {
    setActiveTab(tab);
    setSearchQuery("");
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

  const handleOrderPress = () => {
    const selectedProducts = PRODUCTS.filter((product) =>
      selectedProductIds.includes(product.id),
    );

    console.log("Selected products:", selectedProducts);
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

        <View style={styles.restaurantImageContainer}>
          <Image
            source={require("../../../assets/images/restaurante.png")}
            style={styles.restaurantImage}
            contentFit="cover"
          />

          <View style={styles.restaurantOverlay}>
            <Text style={styles.restaurantOverlayText}>RESTAURANTE</Text>
          </View>
        </View>

        <View style={styles.searchRow}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Insira aqui o seu pedido"
            placeholderTextColor="#7A7A7A"
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />

          <View style={styles.searchButton}>
            <Image
              source={require("../../../assets/images/searchIcon.png")}
              style={styles.searchIcon}
              contentFit="contain"
            />
          </View>
        </View>

        <View style={styles.tabsRow}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, isActive && styles.activeTabButton]}
                onPress={() => handleTabPress(tab)}
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

        <View style={styles.footer}>
          <View style={styles.selectedItemsPill}>
            <Text style={styles.selectedItemsText}>
              {activeCategorySelectedCount} {selectedLabel}
            </Text>
          </View>

          <View style={styles.payButtonWrapper}>
            <PayButton
              buttonText={"FAZER\nPEDIDO"}
              cardText="Quando tiver selecionado os produtos, clique em FAZER PEDIDO."
              onPress={handleOrderPress}
            />
          </View>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 55,
    marginHorizontal: 18,
    paddingHorizontal: 20,
  },

  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    zIndex: 10,
  },

  logo: {
    width: 150,
    height: 40,
    right: 10,
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
    right: 20,
  },

  restaurantImageContainer: {
    width: "100%",
    height: 150,
    marginTop: 6,
  },

  restaurantImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },

  restaurantOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    borderRadius: 33,
    backgroundColor: "rgba(185,185,185,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },

  restaurantOverlayText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },

  searchRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  searchInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: "#D9D9D9",
    color: "#1E1E1E",
    fontSize: 13,
    fontWeight: "500",
  },

  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2E3852",
    justifyContent: "center",
    alignItems: "center",
  },

  searchIcon: {
    width: 22,
    height: 22,
  },

  tabsRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 1,
    borderRadius: 18,
    backgroundColor: "#D9D9D9",
  },

  tabButton: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    marginVertical: 3,
    marginHorizontal: 3,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },

  activeTabButton: {
    backgroundColor: "#E4E4E4",
  },

  tabText: {
    color: "#7A7A7A",
    fontSize: 13,
    fontWeight: "700",
  },

  activeTabText: {
    color: "#28324A",
    fontWeight: "900",
  },

  listContainer: {
    flex: 1,
    minHeight: 0,
    marginTop: 6,
  },

  footer: {
    height: 250,
  },

  selectedItemsPill: {
    position: "absolute",
    top: 0,
    right: 4,
    minWidth: 150,
    height: 45,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: "#2E3852",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  selectedItemsText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
    textAlign: "center",
  },

  payButtonWrapper: {
    width: "100%",
    height: 150,
    transform: [
      {
        translateX: -25,
      },
      {
        scale: 0.95,
      },
    ],
  },
});
