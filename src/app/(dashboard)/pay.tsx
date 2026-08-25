import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { colors } from "@/styles/global";
import PayButton from "../components/PayButton";
import { BackgroundImage } from "../components/backgroundImage";
import { DashboardHeader } from "../components/dashboardHeader";

type PaymentMethod = "mbway" | "multibanco" | "counter" | "reference";

type PaymentOption = {
  id: PaymentMethod;
  label: string;
  icon: ImageSourcePropType;
};

type SelectedProduct = {
  id: string;
  title: string;
  price: number;
};

const SELECTED_PRODUCTS: SelectedProduct[] = [
  {
    id: "mushroom-rice",
    title: "Arroz de Cogumelos\ncom Omelete",
    price: 8,
  },
  {
    id: "lemonade",
    title: "Limonada",
    price: 2,
  },
  {
    id: "chicken",
    title: "1 Dose de Frango",
    price: 5,
  },
];

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "mbway",
    label: "Pagamento com MB Way",
    icon: require("../../../assets/images/image 1.1.png"),
  },
  {
    id: "multibanco",
    label: "Pagamento com Multibanco",
    icon: require("../../../assets/images/credit-card.png"),
  },
  {
    id: "counter",
    label: "Pagamento ao Balcão",
    icon: require("../../../assets/images/cash-coin.png"),
  },
  {
    id: "reference",
    label: "Pagamento com Referência Multibanco",
    icon: require("../../../assets/images/card-text.png"),
  },
];

function formatCurrency(value: number): string {
  if (Number.isInteger(value)) {
    return `${value}`;
  }
  return value.toFixed(2).replace(".", ",");
}

export default function PaymentScreen() {
  const router = useRouter();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("mbway");

  const totalToPay = useMemo(() => {
    return SELECTED_PRODUCTS.reduce(
      (currentTotal, product) => currentTotal + product.price,
      0,
    );
  }, []);

  const handlePaymentMethodPress = (paymentMethod: PaymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleAdd = () => {
    console.log("Adding another payment method.");
  };

  const handleFinalizePayment = () => {
    const selectedOption = PAYMENT_OPTIONS.find(
      (option) => option.id === selectedPaymentMethod,
    );

    Alert.alert(
      "Confirmar pagamento",
      `Método: ${
        selectedOption?.label.replace("\n", " ") ?? selectedPaymentMethod
      }\nTotal: ${formatCurrency(totalToPay)}€`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            console.log("Payment confirmed:", {
              paymentMethod: selectedPaymentMethod,
              products: SELECTED_PRODUCTS,
              total: totalToPay,
            });
          },
        },
      ],
    );
  };

  return (
    <View style={styles.contentContainer}>
      <DashboardHeader />
      <BackgroundImage />

      <View style={styles.screenContent}>
        <View style={styles.titleSection}>
          <Text style={styles.tableText}>MESA 12</Text>
          <Text style={styles.title}>O MEU PEDIDO</Text>
        </View>

        <View style={styles.productsSection}>
          {SELECTED_PRODUCTS.map((product) => (
            <View key={product.id} style={styles.productRow}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productPrice}>
                {formatCurrency(product.price)}€
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>VALOR A PAGAR</Text>
          <Text style={styles.totalValue}>{formatCurrency(totalToPay)}€</Text>
        </View>

        <View style={styles.paymentTitleSection}>
          <Text style={styles.paymentTitle}>PAGAR COM</Text>
          <Text style={styles.paymentDescription}>
            Selecione o modo de pagamento que prefere:
          </Text>
        </View>

        <View style={styles.optionsSection}>
          {PAYMENT_OPTIONS.map((option) => {
            const isSelected = selectedPaymentMethod === option.id;

            return (
              <TouchableOpacity
                key={option.id}
                style={styles.paymentOption}
                onPress={() => handlePaymentMethodPress(option.id)}
                activeOpacity={0.85}
              >
                <View style={styles.paymentOptionContent}>
                  <Image
                    source={option.icon}
                    style={styles.paymentIcon}
                    resizeMode="contain"
                  />

                  <Text style={styles.paymentOptionLabel}>{option.label}</Text>
                </View>

                <View
                  style={[
                    styles.toggleTrack,
                    isSelected && styles.toggleTrackSelected,
                  ]}
                >
                  <View
                    style={[
                      styles.toggleThumb,
                      isSelected && styles.toggleThumbSelected,
                    ]}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>CANCELAR</Text>
            </TouchableOpacity>

            <View style={styles.actionDivider} />

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleAdd}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>ADICIONAR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.payButtonWrapper}>
            <PayButton
              buttonText={"FINALIZAR\nPAGAMENTO"}
              cardText="Confirmar o pagamento dos produtos selecionados."
              onPress={handleFinalizePayment}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: colors.main,
  },

  screenContent: {
    flex: 1,
    paddingTop: 110,
    paddingHorizontal: 30,
  },

  titleSection: {
    alignItems: "center",
    marginTop: 4,
  },

  tableText: {
    color: "#28324A",
    fontSize: 13,
    fontWeight: "500",
  },

  title: {
    color: "#2E3852",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 26,
  },

  productsSection: {
    marginTop: 12,
    paddingHorizontal: 4,
  },

  productRow: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  productTitle: {
    flex: 1,
    paddingRight: 20,
    color: "#303A53",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
  },

  productPrice: {
    color: "#303A53",
    fontSize: 17,
    fontWeight: "400",
  },

  totalSection: {
    minHeight: 48,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#D8D8D8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalLabel: {
    color: "#303A53",
    fontSize: 16,
    fontWeight: "900",
  },

  totalValue: {
    color: "#303A53",
    fontSize: 16,
    fontWeight: "900",
  },

  paymentTitleSection: {
    marginTop: 6,
  },

  paymentTitle: {
    color: "#2E3852",
    fontSize: 16,
    fontWeight: "900",
  },

  paymentDescription: {
    marginTop: 2,
    color: "#303A53",
    fontSize: 15,
    fontWeight: "400",
  },

  optionsSection: {
    marginTop: 12,
    gap: 8,
  },
  
  paymentOption: {
    width: "100%",
    minHeight: 70,
    paddingLeft: 16,
    paddingRight: 6,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
  },

  paymentOptionContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  paymentIcon: {
    width: 36,
    height: 36,
  },

  paymentOptionLabel: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
    color: "#303A53",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 15,
  },
  
  toggleTrack: {
    width: 80,
    height: 50,
    paddingHorizontal: 4,
    borderRadius: 30,
    backgroundColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  toggleTrackSelected: {
    alignItems: "flex-end",
  },

  toggleThumb: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#2E3852",
  },

  toggleThumbSelected: {
    backgroundColor: "#F86400",
  },

  footer: {
    height: 200,
  },

  footerActions: {
    position: "absolute",
    top: -10,
    right: 10,
    height: 60,
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: "#2E3852",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },

  actionButton: {
    height: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  actionDivider: {
    width: 2,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },

  payButtonWrapper: {
    width: "100%",
    height: 150,
    transform: [
      {
        translateX: -25,
      },
      {
        scale: 0.95,
      },
    ],
  },
});
