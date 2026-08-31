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
      style={{
        ...styles.backgroundImage,
        top: isDefaultBg ? 45 : 25,
        bottom: isDefaultBg ? -20 : -290,
      }}
      contentFit="fill"
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    left: -5,
    right: -5,
  },
});

export default BackgroundImage;
