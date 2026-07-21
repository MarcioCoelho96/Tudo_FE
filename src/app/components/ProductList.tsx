import { Image, ImageSource } from "expo-image";
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
  /*
   * This ID should identify the order line,
   * not only the product.
   *
   * Example:
   * mushroom-rice-1
   * mushroom-rice-2
   */
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  image: ImageSource;
  price?: number;
};

type ProductListProps = {
  products: Product[];
  selectedProductIds?: string[];
  onProductPress?: (product: Product) => void;
  emptyMessage?: string;
  interactive?: boolean;
  showSelectionIndicator?: boolean;
};

export default function ProductList({
  products,
  selectedProductIds = [],
  onProductPress,
  emptyMessage = "Nenhum produto encontrado.",
  interactive = true,
  showSelectionIndicator = true,
}: ProductListProps) {
  const renderProduct: ListRenderItem<Product> = ({ item, index }) => {
    const isSelected = selectedProductIds.includes(item.id);

    const isLastProduct = index === products.length - 1;

    const productContent = (
      <>
        <View style={styles.productTextContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>

          <Text style={styles.productDescription}>{item.description}</Text>
        </View>

        <View style={styles.productImageContainer}>
          {showSelectionIndicator && isSelected && (
            <View style={styles.selectedIndicator} />
          )}

          <Image
            source={item.image}
            style={styles.productImage}
            contentFit="cover"
            transition={150}
          />
        </View>

        {!isLastProduct && <View style={styles.divider} />}
      </>
    );

    if (!interactive) {
      return <View style={styles.productRow}>{productContent}</View>;
    }

    return (
      <TouchableOpacity
        style={styles.productRow}
        onPress={() => onProductPress?.(item)}
        activeOpacity={0.8}
      >
        {productContent}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        bounces={false}
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
    backgroundColor: "transparent",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 8,
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
    minHeight: 128,
    paddingVertical: 14,
  },

  productTextContainer: {
    flex: 1,
    paddingRight: 14,
  },

  productTitle: {
    color: "#28324A",
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 23,
  },

  productDescription: {
    marginTop: 14,
    color: "#28324A",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 14,
  },

  productImageContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },

  productImage: {
    width: 104,
    height: 104,
    borderRadius: 28,
    backgroundColor: "#D9D9D9",
  },

  selectedIndicator: {
    position: "absolute",
    left: -15,
    top: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FF5200",
    zIndex: 5,
  },

  divider: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
});
