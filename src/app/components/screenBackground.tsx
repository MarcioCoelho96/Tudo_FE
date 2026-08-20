import { ImageBackground } from "expo-image";
import React, { ReactNode } from "react";

import { StatusBar, StatusBarStyle, StyleSheet, View } from "react-native";

type ScreenBackgroundProps = {
  children: ReactNode;
  statusBarStyle?: StatusBarStyle;
};

export default function ScreenBackground({
  children,
  statusBarStyle = "dark-content",
}: ScreenBackgroundProps) {
  return (
    <View style={styles.screen}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={statusBarStyle}
      />

      <ImageBackground
        source={require("../../../assets/images/white_background.png")}
        style={styles.backgroundImage}
        contentFit="fill"
      />

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#283754",
  },

  backgroundImage: {
    position: "absolute",
    top: 40,
    left: -10,
    right: -10,
    bottom: -20,
  },

  content: {
    flex: 1,
  },
});
