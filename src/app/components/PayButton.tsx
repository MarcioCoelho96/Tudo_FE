import { colors } from "@/styles/global";
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

type PayButtonProps = {
  buttonText: string;
  cardText: string;
  onPress?: () => void;
};

export default function PayButton({
  buttonText,
  cardText,
  onPress,
}: PayButtonProps) {
  return (
    <View style={styles.Container}>
      <Image
        source={require("../../../assets/images/bottom_card.png")}
        style={styles.Background}
        contentFit="fill"
      />

      <TouchableOpacity
        style={styles.Button}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.ButtonText}>{buttonText}</Text>
      </TouchableOpacity>

      <View style={styles.HelperContainer}>
        <Text
          style={styles.HelperText}
          numberOfLines={4}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
        >
          {cardText}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    height: 141,
  },

  Background: {
    //position: "absolute",
    right: 10,
    bottom: 5,
    width: SCREEN_WIDTH - 40,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
  },

  Button: {
    position: "absolute",
    left: 3,
    bottom: 35,
    width: 120,
    height: 100,
    borderRadius: 46,
    backgroundColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 7,
    zIndex: 4,
  },

  ButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 20,
    textAlign: "center",
  },

  HelperContainer: {
    marginLeft: 140,
    marginTop: -25,
    width: SCREEN_WIDTH - 200,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  HelperText: {
    position: "absolute",
    color: "#28324A",
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 16,
  },
});
