import { ImageBackground } from "expo-image";
import { StyleSheet } from "react-native";

interface BackgroundImageProps {
  source: string | number;
}

export function BackgroundImage({ source }: BackgroundImageProps) {
  return (
    <ImageBackground
      source={source}
      style={styles.backgroundImage}
      contentFit="fill"
    />
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    bottom: -20,
  },
});

export default BackgroundImage;
