import { colors } from "@/src/styles/global";
import { Image, ImageBackground } from "expo-image";
import React from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Top Bar with Profile (in blue area) */}
      <View style={styles.topBar}>
        <View style={styles.topBarSpacer} />
        {/* Profile Icon - Top Right in Blue Area */}
        <TouchableOpacity
          style={styles.profileButton}
          activeOpacity={0.85}
          onPress={() => console.log("Navigate to profile")}
        >
          <Image
            source={require("../../../assets/images/userProfileIcon.png")}
            style={{ width: 45, height: 64, marginTop: 7 }}
          />
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require("../../../assets/images/dashboardBackground.png")}
        style={styles.backgroundImage}
        contentFit="fill"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },

  // Top Bar (in blue area)
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: (StatusBar.currentHeight || 44) + 5,
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 100,
  },

  topBarSpacer: {
    flex: 1,
    paddingLeft: 100,
  },

  profileButton: {
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: colors.gray,
  },

  profileIconHead: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.white,
  },

  profileIconBody: {
    width: 24,
    height: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.white,
    marginTop: -2,
  },
  backgroundImage: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    bottom: -20,
  },
});
