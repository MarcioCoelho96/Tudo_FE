import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";

import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import PayButton from "../components/PayButton";
import ScreenBackground from "../components/screenBackground";

type PaymentMethod = "mbway" | "multibanco" | "counter" | "reference";

type PaymentOption = {
  id: PaymentMethod;
  label: string;
  icon:
    | "cellphone"
    | "credit-card-outline"
    | "cash-register"
    | "card-text-outline";
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
    icon: "cellphone",
  },
  {
    id: "multibanco",
    label: "Pagamento com Multibanco",
    icon: "credit-card-outline",
  },
  {
    id: "counter",
    label: "Pagamento ao Balcão",
    icon: "cash-register",
  },
  {
    id: "reference",
    label: "Pagamento com Referência\nMultibanco",
    icon: "card-text-outline",
  },
];

function formatCurrency(value: number): string {
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

  const handleProfilePress = () => {
    router.push("/profile");
  };

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
    <ScreenBackground>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
            contentFit="contain"
          />

          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleProfilePress}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../../assets/images/profileButton.png")}
              style={styles.profileImage}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

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
                  {option.id === "mbway" ? (
                    <View style={styles.mbWayIcon}>
                      <Text style={styles.mbWayText}>MB</Text>

                      <View style={styles.mbWayLine} />
                    </View>
                  ) : (
                    <MaterialCommunityIcons
                      name={option.icon}
                      size={41}
                      color="#2E3852"
                    />
                  )}

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
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>CANCELAR</Text>
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
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 35,
    marginHorizontal: 18,
    marginBottom: 8,
    paddingHorizontal: 20,
  },

  header: {
    height: 68,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    zIndex: 10,
  },

  logo: {
    width: 105,
    height: 42,
  },

  profileButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  profileImage: {
    width: 54,
    height: 54,
  },

  titleSection: {
    alignItems: "center",
  },

  tableText: {
    color: "#28324A",
    fontSize: 13,
    fontWeight: "500",
  },

  title: {
    color: "#2E3852",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 27,
  },

  productsSection: {
    marginTop: 18,
    paddingHorizontal: 4,
  },

  productRow: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  productTitle: {
    flex: 1,
    paddingRight: 20,
    color: "#303A53",
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 25,
  },

  productPrice: {
    color: "#303A53",
    fontSize: 19,
    fontWeight: "400",
  },

  totalSection: {
    minHeight: 55,
    borderTopWidth: 1,
    borderTopColor: "#D8D8D8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalLabel: {
    color: "#303A53",
    fontSize: 18,
    fontWeight: "900",
  },

  totalValue: {
    color: "#303A53",
    fontSize: 18,
    fontWeight: "900",
  },

  paymentTitleSection: {
    marginTop: 2,
  },

  paymentTitle: {
    color: "#2E3852",
    fontSize: 17,
    fontWeight: "900",
  },

  paymentDescription: {
    width: 210,
    marginTop: 5,
    color: "#303A53",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 14,
  },

  optionsSection: {
    marginTop: 20,
    gap: 7,
  },

  paymentOption: {
    width: "100%",
    minHeight: 60,
    paddingLeft: 18,
    paddingRight: 5,
    borderRadius: 38,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 6,
  },

  paymentOptionContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  paymentOptionLabel: {
    flex: 1,
    marginLeft: 14,
    paddingRight: 8,
    color: "#303A53",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 17,
  },

  mbWayIcon: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },

  mbWayText: {
    color: "#111111",
    fontSize: 22,
    fontWeight: "500",
  },

  mbWayLine: {
    width: 35,
    height: 3,
    marginTop: 1,
    borderRadius: 2,
    backgroundColor: "#E30613",
  },

  toggleTrack: {
    width: 87,
    height: 40,
    paddingHorizontal: 5,
    borderRadius: 30,
    backgroundColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "flex-start",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },

  toggleTrackSelected: {
    alignItems: "flex-end",
  },

  toggleThumb: {
    width: 40,
    height: 40,
    borderRadius: 26,
    backgroundColor: "#2E3852",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },

  toggleThumbSelected: {
    backgroundColor: "#F86400",
  },

  footer: {
    flex: 1,
    bottom: 38,
    right: 16,
    justifyContent: "flex-end",
  },

  footerActions: {
    position: "absolute",
    right: 4,
    bottom: 83,
    height: 37,
    borderRadius: 36,
    backgroundColor: "#2E3852",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 20,
  },

  cancelButton: {
    height: "100%",
    paddingLeft: 42,
    paddingRight: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },

  payButtonWrapper: {
    width: "100%",
    height: 132,
    transform: [
      {
        translateX: -12,
      },
      {
        scale: 0.95,
      },
    ],
  },
});
