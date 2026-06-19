import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {/* 1. Curved Background Shape */}
      <Svg width={width} height={70} style={styles.svgBackground}>
        <Path
          d={`
      M 0 0 
      L ${width / 2 - 38} 0 
      A 38 38 0 0 0 ${width / 2 + 38} 0
      L ${width} 0 
      L ${width} 70 
      L 0 70 
      Z
    `}
          fill="#232C43" // Your dark navy background color
        />
      </Svg>

      {/* 2. Interactive Navigation Buttons */}
      <View style={styles.mainTabWrapper}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          // Check if this is the center tab (e.g., the Calendar/Home tab)
          const isCenter = index === Math.floor(state.routes.length / 2);

          if (isCenter) {
            // Render the raised center button
            return (
              <View key={route.key} style={styles.centerButtonContainer}>
                <TouchableOpacity
                  onPress={onPress}
                  activeOpacity={0.8}
                  style={[
                    styles.centerButton,
                    { backgroundColor: isFocused ? "#1d2436" : "#232c43" },
                  ]}
                >
                  {options.tabBarIcon &&
                    options.tabBarIcon({
                      focused: isFocused,
                      color: "#FFF",
                      size: 30,
                    })}
                </TouchableOpacity>
              </View>
            );
          }

          // Render normal side buttons (Pin, Report/List)
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: "#FFF",
                  size: 24,
                })}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: width,
    backgroundColor: "transparent",
  },
  svgBackground: {
    position: "absolute",
    bottom: 0,
  },
  mainTabWrapper: {
    flexDirection: "row",
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  centerButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  centerButton: {
    position: "absolute",
    // Size matches the cutout depth perfectly
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#232C43",
    justifyContent: "center",
    alignItems: "center",

    // Pushes the button exactly halfway up out of the bar
    // leaving a crisp 5px white boundary margin inside the 38px arc radius
    top: -33,
    zIndex: 2,

    // Smooth border to complete the look
    borderWidth: 4,
    borderColor: "#232C43",

    // Soft shadow depth mapping matching image_021b1e.png
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
