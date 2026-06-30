import { colors } from "@/src/styles/global";
import { Image, ImageBackground } from "expo-image";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../components/searchBar";
import ServiceCard from "../components/servicesCard";

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

        <Image
          source={require("../../../assets/images/tudoIcon.png")}
          style={{ width: 140, height: 64, marginRight: 90 }}
        />
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

      <View
        style={{
          paddingTop: 100,
          paddingLeft: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/locationIcon.png")}
            style={{ width: 36, height: 36 }}
            contentFit="fill"
          />
          <Text
            style={{
              paddingLeft: 9,
              paddingRight: 9,
              fontWeight: 900,
              fontSize: 14,
              width: 170,
              color: colors.gray,
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Rua Nova da Telha, nº261, 482
          </Text>
          <View
            style={{
              width: 122,
              height: 68,
              borderRadius: 50,
              backgroundColor: colors.lightBlue,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 5,
                height: 5,
                backgroundColor: colors.orange,
                borderRadius: 100,
                marginRight: 5,
                marginBottom: 5,
              }}
            ></View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: colors.white,
              }}
            >
              34,30 €
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingTop: 10,
        }}
      >
        <SearchBar
          data={[]}
          onFilterResult={() => {
            return;
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingLeft: 20,
          paddingTop: 10,
          paddingBottom: 110,
          gap: 21,
        }}
      >
        <ServiceCard category="CAFÉ" />
        <ServiceCard category="RESTAURANTE" />
        <ServiceCard category="LIVRARIA" />
      </ScrollView>
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
    paddingTop: (StatusBar.currentHeight || 44) + 5,
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 100,
    justifyContent: "space-between",
    width: "100%",
  },

  topBarSpacer: {},

  profileButton: {
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: colors.gray,
    marginBottom: 5,
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
