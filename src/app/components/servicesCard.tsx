import { ImageBackground } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles/global";

interface ServiceCardProps {
  category: string;
  handleOnPress: () => void;
}

// Mapeamento dinâmico de categorias para as imagens
const CATEGORY_IMAGES: Record<string, any> = {
  CAFE: require("../../../assets/images/cafeImage.jpg"),
  RESTAURANT: require("../../../assets/images/restaurante.png"),
  LAUNDRY: require("../../../assets/images/laundromat-worker.jpg"),
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  category,
  handleOnPress,
}) => {
  // Procura a imagem correspondente à categoria em maiúsculas (com fallback para a imagem do CAFÉ)
  const imageSource =
    CATEGORY_IMAGES[category?.toUpperCase()] || CATEGORY_IMAGES["CAFE"];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flex: 1 }} onPress={handleOnPress}>
        <ImageBackground
          source={imageSource}
          style={{
            flex: 1,
            borderRadius: 50,
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 15,
            paddingTop: 15,
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
                fontWeight: "700",
                color: colors.white,
              }}
            >
              {category}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
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
