import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
        <TouchableOpacity
          style={styles.profileButton}
          activeOpacity={0.85}
          onPress={() => console.log("Navigate to profile")}
        >
          <View style={styles.profileIconHead} />
          <View style={styles.profileIconBody} />
        </TouchableOpacity>
        <Text>lol</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B3349",
  },

  // Top Bar (in blue area)
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: (StatusBar.currentHeight || 44) + 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 100,
  },

  topBarSpacer: {
    flex: 1,
  },

  profileButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  profileIconHead: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#2B3349",
  },

  profileIconBody: {
    width: 24,
    height: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#2B3349",
    marginTop: -2,
  },
});
