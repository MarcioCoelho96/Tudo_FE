import { useCategories } from "@/hooks/useCategories";
import { colors } from "@/styles/global";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BackgroundImage } from "../components/backgroundImage";
import { DashboardHeader } from "../components/dashboardHeader";
import SearchBar from "../components/searchBar";
import ServiceCard from "../components/servicesCard";

export default function HomeScreen() {
  const { categories } = useCategories();
  return (
    <View style={styles.container}>
      <DashboardHeader />
      <BackgroundImage
        source={require("../../../assets/images/dashboardBackground.png")}
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
        {categories.map((category) => {
          return <ServiceCard key={category.key} category={category.label} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },

  profileIconBody: {
    width: 24,
    height: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.white,
    marginTop: -2,
  },
});
