import { Image } from "expo-image";
import React from "react";
import {
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type ProductCategory = "Pratos" | "Bebidas" | "Sobremesas";

export type Product = {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;

  /*
    This accepts both:

    require("../../assets/image.png")

    and:

    { uri: "https://..." }
  */
  image: number | { uri: string };
};

type ProductListProps = {
  products: Product[];
  selectedProductIds: string[];
  onProductPress: (product: Product) => void;
  emptyMessage?: string;
};

export default function ProductList({
  products,
  selectedProductIds,
  onProductPress,
  emptyMessage = "Nenhum produto encontrado.",
}: ProductListProps) {
  const renderProduct: ListRenderItem<Product> = ({ item, index }) => {
    const isSelected = selectedProductIds.includes(item.id);

    const isLastProduct = index === products.length - 1;

    return (
      <TouchableOpacity
        style={styles.productRow}
        onPress={() => onProductPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.productTextContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>

          <Text style={styles.productDescription}>{item.description}</Text>
        </View>

        <View style={styles.productImageContainer}>
          {isSelected && <View style={styles.selectedDot} />}

          <Image
            source={item.image}
            style={styles.productImage}
            contentFit="cover"
            transition={200}
          />
        </View>

        {!isLastProduct && <View style={styles.divider} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={[
          styles.listContent,
          products.length === 0 && styles.emptyListContent,
        ]}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
    backgroundColor: "#FFFFFF",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },

  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  emptyText: {
    color: "#28324A",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },

  productRow: {
    position: "relative",
    flexDirection: "row",
    paddingVertical: 16,
  },

  productTextContainer: {
    flex: 1,
    paddingRight: 12,
  },

  productTitle: {
    color: "#28324A",
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 24,
  },

  productDescription: {
    marginTop: 8,
    color: "#28324A",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    opacity: 0.85,
  },

  productImageContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },

  productImage: {
    width: 104,
    height: 104,
    borderRadius: 25,
    backgroundColor: "#D9D9D9",
  },

  selectedDot: {
    position: "absolute",
    left: -15,
    top: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FF5A00",
    zIndex: 5,
  },

  divider: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "#E6E6E6",
  },
});
