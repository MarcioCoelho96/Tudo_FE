import { ImageBackground } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles/global";

interface ServiceCArdProps {
  category: string;
}

const ServiceCard: React.FC<ServiceCArdProps> = ({ category }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/cafeImage.jpg")}
        style={{
          flex: 1,
          borderRadius: 50,
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: 15,
          paddingTop: 15,
          //alignItems: "center",
        }}
        contentFit="fill"
      >
        <View
          style={{
            backgroundColor: colors.orange,
            width: 59,
            height: 57,
            borderRadius: 100,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: 320,
            height: 58,
            backgroundColor: "#D9D9D9B3",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: colors.white,
            }}
          >
            {category}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 163,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: colors.main,
  },
});

export default ServiceCard;
