import { ImageBackground } from "expo-image";
import { StyleSheet } from "react-native";

interface BackgroundImageProps {
  isDefaultBg?: boolean;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  isDefaultBg = true,
}) => {
  const source = isDefaultBg
    ? require("../../../assets/images/dashboardBackground.png")
    : require("../../../assets/images/profileBackground.png");
  return (
    <ImageBackground
      source={source}
      style={styles.backgroundImage}
      contentFit="fill"
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 35,
    left: -5,
    right: -5,
    bottom: -20,
  },
});

export default BackgroundImage;
