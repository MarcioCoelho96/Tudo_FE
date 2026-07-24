import { colors } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";
import DashboardHeader from "../components/dashboardHeader";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <DashboardHeader />
      <View
        style={{
          paddingTop: 200,
          paddingLeft: 20,
        }}
      >
        <Text>Profile Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
