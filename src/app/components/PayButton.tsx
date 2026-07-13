import { Image } from "expo-image";
import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type OrderFooterProps = {
  selectedCount: number;
  onOrderPress: () => void;
  buttonText?: string;
  helperText?: string;
};

export default function OrderFooter({
  selectedCount,
  onOrderPress,
  buttonText = "FAZER\nPEDIDO",
  helperText = "Quando tiver selecionado\ntodos os pratos que deseja\nclique em FAZER PEDIDO.",
}: OrderFooterProps) {
  const selectedText =
    selectedCount === 1 ? "PRATO\nSELECIONADO" : "PRATOS\nSELECIONADOS";

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/bottom_card.png")}
        style={styles.backgroundImage}
        contentFit="fill"
      />

      <View style={styles.selectedPill}>
        <Text style={styles.selectedPillText}>
          {selectedCount} {selectedText}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.orderButton}
        onPress={onOrderPress}
        activeOpacity={0.8}
      >
        <Text style={styles.orderButtonText}>{buttonText}</Text>
      </TouchableOpacity>

      <Text style={styles.helperText}>{helperText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 141,
    backgroundColor: "#FFFFFF",
  },

  backgroundImage: {
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
    borderRadius: 24,
    backgroundColor: "#28324A",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },

  selectedPillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 16,
    textAlign: "center",
  },

  orderButton: {
    position: "absolute",
    left: 30,
    bottom: 30,
    width: 120,
    height: 86,
    borderRadius: 46,
    backgroundColor: "#FF5A00",
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
    fontSize: 15,
    fontWeight: "900",
    lineHeight: 20,
    textAlign: "center",
  },

  helperText: {
    position: "absolute",
    left: 180,
    right: 34,
    bottom: 28,
    color: "#2B3349",
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 16,
    zIndex: 3,
  },
});
