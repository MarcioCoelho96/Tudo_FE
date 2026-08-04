import { Paths } from "@/const/global";
import { colors } from "@/styles/global";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

export const DashboardHeader: React.FC = () => {
  const router = useRouter();

  const handleOpenProfile = () => {
    router.push(Paths.profile);
  };
  return (
    <View>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.topBar}>
        <Image
          source={require("../../../assets/images/tudoIcon.png")}
          style={{ width: 140, height: 64, marginRight: 90 }}
        />
        <TouchableOpacity
          style={styles.profileButton}
          activeOpacity={0.85}
          onPress={handleOpenProfile}
        >
          <Image
            source={require("../../../assets/images/userProfileIcon.png")}
            style={{ width: 45, height: 64, marginTop: 7 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

  profileButton: {
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: colors.gray,
    marginTop: -20,
  },
});

export default DashboardHeader;
