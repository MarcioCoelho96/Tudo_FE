import { colors } from "@/styles/global";
import { ActivityIndicator, StyleSheet, View } from "react-native";

if (__DEV__) {
  import("../../ReactotronConfig");
}

export default function Index() {
  // The layout's NavigateGate will handle the redirection automatically
  // once the authentication state resolves. This index route just acts
  // as the initial visual canvas.
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main, // Match your app's background color palette
  },
});
