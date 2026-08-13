import { useUserStore } from "@/store/userStore/userStore.store";
import { colors } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";
import BackgroundImage from "../components/backgroundImage";
import DashboardHeader from "../components/dashboardHeader";

export default function ProfileScreen() {
  const resources = {
    nameLabel: "Nome",
    locationLabel: "Localização",
    historyLabel: "Histórico",
    movementsLabel: "Movimentos",
  };

  const address = useUserStore((state) => state.address);

  return (
    <View style={styles.container}>
      <DashboardHeader />
      <BackgroundImage isDefaultBg={false} />
      <View style={styles.profileInfo}>
        <View style={{ flexDirection: "column" }}>
          <RowBlock
            title={resources.nameLabel}
            subtitle="Diana Margarida Ribeiro Almeida"
          />
          <RowBlock
            title={resources.locationLabel}
            subtitle={address?.formattedAddress ?? ""}
          />

          <RowBlock
            title={resources.historyLabel}
            subtitle={"Diana Margarida Ribeiro Almeida"}
          />
          <RowBlock
            title={resources.movementsLabel}
            subtitle={
              "Rua Nova da Telha, nº261 -Silvares São Martinho, Fafe, Braga, Portugal"
            }
          />
        </View>
      </View>
    </View>
  );
}

interface RowBlockProps {
  title: string;
  subtitle: string;
}

const RowBlock: React.FC<RowBlockProps> = ({ title, subtitle }) => {
  return (
    <>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.infoText}>{subtitle}</Text>
      <View style={{ height: 1, backgroundColor: colors.gray }} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileInfo: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 140,
    marginLeft: 20,
    borderRadius: 50,
    width: 345,
    height: 560,
    backgroundColor: colors.white,
  },
  titleText: {
    fontWeight: 900,
    color: colors.main,
    fontSize: 20,
    paddingBottom: 12,
  },
  infoText: {
    fontWeight: 400,
    color: colors.main,
    fontSize: 12,
    paddingBottom: 15,
  },
});
