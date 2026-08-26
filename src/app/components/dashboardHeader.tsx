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
          style={{ width: 170, height: 65, right: 20, bottom: 25 }}
        />
        <TouchableOpacity
          style={styles.profileButton}
          activeOpacity={0.85}
          onPress={handleOpenProfile}
        >
          <Image
            source={require("../../../assets/images/userProfileIcon_1.svg")}
            style={{ width: 45, height: 45, marginTop: 7 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    position: "absolute",
    paddingTop: (StatusBar.currentHeight || 45) + 15,
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 100,
    justifyContent: "space-between",
    width: "100%",
  },

  profileButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: colors.gray,
    marginTop: -45,
    marginRight: 10,
  },
});

export default DashboardHeader;
