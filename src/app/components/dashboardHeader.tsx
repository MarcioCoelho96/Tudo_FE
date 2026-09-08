import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Paths } from "@/const/global";
import { colors } from "@/styles/global";

export const DashboardHeader: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Scale elements proportionally based on standard screen width
  const scale = width / 375;
  const logoWidth = Math.min(Math.max(130 * scale, 120), 180);
  const logoHeight = logoWidth * (65 / 170);
  const buttonSize = Math.min(Math.max(45 * scale, 42), 56);

  const handleOpenProfile = () => {
    router.push(Paths.profile);
  };

  const handleLogoPress = () => {
    router.push(Paths.home);
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View
        style={[
          styles.topBar,
          {
            paddingTop: Math.max(insets.top, 12) + 8,
            paddingHorizontal: Math.max(width * 0.05, 16),
          },
        ]}
      >
        {/* Tappable Logo */}
        <TouchableOpacity activeOpacity={0.8} onPress={handleLogoPress}>
          <Image
            source={require("../../../assets/images/tudoIcon.png")}
            style={{ width: logoWidth, height: logoHeight }}
            contentFit="contain"
          />
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity
          style={[
            styles.profileButton,
            {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
            },
          ]}
          activeOpacity={0.85}
          onPress={handleOpenProfile}
        >
          <Image
            source={require("../../../assets/images/userProfileIcon_1.svg")}
            style={{
              width: buttonSize * 0.85,
              height: buttonSize * 0.85,
              marginTop: 10,
            }}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    zIndex: 100,
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Changed to flex-start so margin controls spacing
    width: "100%",
  },
  profileButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray,
    overflow: "hidden",
    marginLeft: "auto", // Keeps the profile button aligned to the right while moving 24px inward
    marginRight: 24,
  },
});

export default DashboardHeader;
