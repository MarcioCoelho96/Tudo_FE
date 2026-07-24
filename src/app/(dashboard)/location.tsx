import { colors } from "@/styles/global";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackgroundImage from "../components/backgroundImage";
import DashboardHeader from "../components/dashboardHeader";
import ServiceCard from "../components/servicesCard";

export default function LocationScreen() {
  const resources = {
    loacationText:
      "Indique-nos a sua loacalizaçāo para lhe indicarmos os serviços mais próximos de si.",
  };
  return (
    <View style={styles.container}>
      <DashboardHeader />
      <BackgroundImage />
      <View
        style={{
          paddingTop: 100,
          paddingLeft: 20,
        }}
      >
        <View
          style={{
            paddingTop: 50,
            paddingLeft: 20,
            gap: 24,
          }}
        >
          <TouchableOpacity style={styles.profileButton} activeOpacity={0.85}>
            <Image
              source={require("../../../assets/images/userProfileIcon.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>

          <ServiceCard category="RESTAURANTE" />
          <Text style={{ fontSize: 14.5, fontWeight: 700, width: 240 }}>
            {resources.loacationText}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  profileButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: colors.gray,
    marginTop: -20,
  },
});
