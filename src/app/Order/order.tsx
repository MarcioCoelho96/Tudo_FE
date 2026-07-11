import { colors } from "@/styles/global";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const HEADER_HEIGHT = SCREEN_HEIGHT * 0.22;
const ITEM_IMAGE_SIZE = SCREEN_WIDTH * 0.26;
const FOOTER_HEIGHT = 141;

const IMG_HEADER = require("../../../assets/images/restaurante.png");

const IMG_BOTTOM_CARD = require("../../../assets/images/bottom_card.png");

const TABS = ["Pratos", "Bebidas", "Sobremesas"] as const;

type MenuCategory = (typeof TABS)[number];

type MenuItem = {
  id: string;
  title: string;
  description: string;
  category: MenuCategory;
  image: {
    uri: string;
  };
};

const SEARCH_KEYS: Array<
  keyof Pick<MenuItem, "title" | "description" | "category">
> = ["title", "description", "category"];

const MENU_ITEMS: MenuItem[] = [
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
    id: "sumo",
    title: "Sumo de Laranja",
    description: "Sumo de laranja natural.",
    category: "Bebidas",
    image: {
      uri: "https://picsum.photos/seed/sumo/200/200",
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
  {
    id: "bolo",
    title: "Bolo de Bolacha",
    description: "Bolo de bolacha tradicional.",
    category: "Sobremesas",
    image: {
      uri: "https://picsum.photos/seed/bolo/200/200",
    },
  },
];

function normalizeSearchText(value: unknown): string {
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
  const router = useRouter();

  const params = useLocalSearchParams<{
    category?: string;
  }>();

  const flatListRef = useRef<FlatList<MenuItem>>(null);

  const categoryType =
    typeof params.category === "string" ? params.category : "restaurante";

  const categoryTitle = categoryType.toUpperCase();

  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState<MenuCategory>("Pratos");

  const [selectedItems, setSelectedItems] = useState<string[]>([
    "frango",
    "arroz",
  ]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearchText(searchQuery);

    return MENU_ITEMS.filter((item) => {
      const matchesActiveTab = item.category === activeTab;

      if (!matchesActiveTab) {
        return false;
      }

      if (normalizedQuery === "") {
        return true;
      }

      return SEARCH_KEYS.some((key) => {
        const itemValue = normalizeSearchText(item[key]);

        return itemValue.includes(normalizedQuery);
      });
    });
  }, [activeTab, searchQuery]);

  useEffect(() => {
    if (filteredItems.length === 0) {
      return;
    }

    const timeout = setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [searchQuery, activeTab, filteredItems.length]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleClearSearch = () => {
    setSearchQuery("");

    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  const handleTabPress = (tab: MenuCategory) => {
    setActiveTab(tab);
    setSearchQuery("");

    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems((currentItems) => {
      const isSelected = currentItems.includes(id);

      if (isSelected) {
        return currentItems.filter((itemId) => itemId !== id);
      }

      return [...currentItems, id];
    });
  };

  const handleFazerPedido = () => {
    const selectedItemsData = MENU_ITEMS.filter((item) =>
      selectedItems.includes(item.id),
    ).map((item) => ({
      id: item.id,
      titulo: item.title,
      descricao: item.description,
      categoria: item.category,
      image: item.image,
    }));

    /*
      Expo Router parameters should be strings.

      Change "/myOrder" if your order page has
      a different filename or route.
    */
    router.push({
      pathname: "/myOrder",
      params: {
        itens: JSON.stringify(selectedItemsData),
      },
    });
  };

  const renderMenuItem: ListRenderItem<MenuItem> = ({ item, index }) => {
    const isSelected = selectedItems.includes(item.id);

    const isLastItem = index === filteredItems.length - 1;

    return (
      <TouchableOpacity
        style={styles.itemRow}
        onPress={() => toggleItemSelection(item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.itemLeft}>
          <Text style={styles.itemTitle}>{item.title}</Text>

          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>

        <View style={styles.itemRight}>
          {isSelected && <View style={styles.orangeDot} />}

          <Image
            source={item.image}
            style={styles.itemImage}
            contentFit="cover"
            transition={150}
          />
        </View>

        {!isLastItem && <View style={styles.divider} />}
      </TouchableOpacity>
    );
  };

  const selectedLabel =
    selectedItems.length === 1 ? "PRATO\nSELECIONADO" : "PRATOS\nSELECIONADOS";

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.fixedHeader}>
        <View style={styles.headerContainer}>
          <Image
            source={IMG_HEADER}
            style={styles.headerImage}
            contentFit="cover"
          />

          <View style={styles.headerOverlay}>
            <Text style={styles.headerOverlayText}>{categoryTitle}</Text>
          </View>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Pesquisar"
              placeholderTextColor="#7A7A7A"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              returnKeyType="search"
            />

            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.clearSearchButton}
                onPress={handleClearSearch}
                activeOpacity={0.7}
              >
                <Text style={styles.clearSearchText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.tabsRow}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabPill, isActive && styles.tabPillActive]}
                onPress={() => handleTabPress(tab)}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.tabText, isActive && styles.tabTextActive]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.listArea}>
        <FlatList
          ref={flatListRef}
          data={filteredItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          style={styles.menuList}
          contentContainerStyle={[
            styles.menuListContent,
            filteredItems.length === 0 && styles.emptyListContent,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListEmptyComponent={
            <View style={styles.emptyResultsContainer}>
              <Text style={styles.emptyText}>
                Nenhum resultado encontrado para "{searchQuery}".
              </Text>

              <TouchableOpacity
                style={styles.clearResultsButton}
                onPress={handleClearSearch}
                activeOpacity={0.8}
              >
                <Text style={styles.clearResultsText}>Limpar pesquisa</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>

      <View style={styles.footerContainer}>
        <Image
          source={IMG_BOTTOM_CARD}
          style={styles.bottomCardImage}
          contentFit="fill"
        />

        <View style={styles.selectedPill}>
          <Text style={styles.selectedPillText}>
            {selectedItems.length} {selectedLabel}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={handleFazerPedido}
          activeOpacity={0.8}
        >
          <Text style={styles.orderButtonText}>FAZER{"\n"}PEDIDO</Text>
        </TouchableOpacity>

        <Text style={styles.helperText}>
          Quando tiver selecionado
          {"\n"}
          todos os pratos que deseja
          {"\n"}
          clique em FAZER PEDIDO.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.main ?? "#FFFFFF",
  },

  fixedHeader: {
    backgroundColor: "#FFFFFF",
  },

  headerContainer: {
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
    backgroundColor: "rgba(185, 185, 185, 0.65)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  headerOverlayText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 20,
    letterSpacing: 1,
  },

  searchRow: {
    width: "100%",
    marginTop: 14,
    paddingHorizontal: 20,
  },

  searchContainer: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 24,
    paddingLeft: 20,
    paddingRight: 8,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    color: "#1E1E1E",
    fontWeight: "700",
    fontSize: 15,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  clearSearchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  clearSearchText: {
    color: "#555555",
    fontSize: 28,
    fontWeight: "500",
    lineHeight: 30,
  },

  tabsRow: {
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
  },

  tabPill: {
    flex: 1,
    height: 36,
    marginHorizontal: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E6E6E6",
  },

  tabPillActive: {
    backgroundColor: "#F2F2F2",
  },

  tabText: {
    color: "#28324A",
    fontWeight: "700",
    fontSize: 13,
  },

  tabTextActive: {
    fontWeight: "900",
  },

  listArea: {
    flex: 1,
    minHeight: 0,
    backgroundColor: "#FFFFFF",
  },

  menuList: {
    flex: 1,
  },

  menuListContent: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },

  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  emptyResultsContainer: {
    alignItems: "center",
    paddingHorizontal: 25,
  },

  emptyText: {
    color: "#28324A",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },

  clearResultsButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#28324A",
    justifyContent: "center",
    alignItems: "center",
  },

  clearResultsText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
  },

  itemRow: {
    flexDirection: "row",
    paddingVertical: 16,
    position: "relative",
  },

  itemLeft: {
    flex: 1,
    paddingRight: 12,
  },

  itemTitle: {
    color: "#28324A",
    fontWeight: "900",
    fontSize: 18,
    lineHeight: 24,
  },

  itemDescription: {
    marginTop: 8,
    color: "#28324A",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.85,
  },

  itemRight: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },

  orangeDot: {
    position: "absolute",
    left: -15,
    top: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EB6300",
    zIndex: 5,
  },

  itemImage: {
    width: ITEM_IMAGE_SIZE,
    height: ITEM_IMAGE_SIZE,
    borderRadius: 25,
    backgroundColor: "#D9D9D9",
  },

  divider: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "#E6E6E6",
  },

  footerContainer: {
    width: "100%",
    height: FOOTER_HEIGHT,
    position: "relative",
    backgroundColor: "#FFFFFF",
  },

  bottomCardImage: {
    position: "absolute",
    left: 12,
    bottom: 8,
    width: SCREEN_WIDTH - 40,
    height: 125,
  },

  selectedPill: {
    position: "absolute",
    top: 4,
    right: 49,
    width: 180,
    height: 45,
    backgroundColor: "#28324A",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },

  selectedPillText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },

  orderButton: {
    position: "absolute",
    left: 30,
    bottom: 30,
    width: 120,
    height: 86,
    borderRadius: 46,
    backgroundColor: "#EB6300",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 4,
  },

  orderButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
  },

  helperText: {
    position: "absolute",
    left: 180,
    right: 34,
    bottom: 28,
    color: "#2B3349",
    fontWeight: "800",
    fontSize: 13,
    lineHeight: 16,
    zIndex: 3,
  },
});
