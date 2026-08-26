import { colors } from "@/styles/global";
import { Image } from "expo-image";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PayButton from "./PayButton";

type PaymentModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function PaymentModal({
  visible,
  onClose,
  onConfirm,
}: PaymentModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          
          <View style={styles.darkCard}>
            <Image
              source={require("../../../assets/images/Subtract_1.svg")}
              style={StyleSheet.absoluteFillObject}
              contentFit="fill"
            />

            <View style={styles.cardInner}>
              <View style={styles.whiteBox}>
                <Text style={styles.modalTitle}>
                  Por Favor, dirija-se ao balcão para o pagamento.
                </Text>
                <Text style={styles.modalDescription}>
                  Ao escolher a opção de Pagamento com Multibanco, ou Pagamento ao
                  Balcão, deve dirigir-se ao Balcão mais próximo para efectuar o
                  pagamento, caso queira alterar o método de pagamento clique em
                  alterar.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.backButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.backButtonText}>VOLTAR E ALTERAR</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.payButtonWrapper}>
            <PayButton
              buttonText={"FINALIZAR\nPAGAMENTO"}
              cardText="Pretende continuar com a forma de pagamento?"
              onPress={onConfirm}
            />
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  modalContent: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
  },

  darkCard: {
    width: 350,
    height: 300,
    borderRadius: 15,
    position: "relative",
    overflow: "hidden", 
  },

  cardInner: {
    padding: 20,
    paddingBottom: 40,
    zIndex: 2,
  },

  whiteBox: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
  },

  modalTitle: {
    color: colors.main,
    fontSize: 18,
    fontWeight: "900",
    textAlign: "left",
    marginBottom: 10,
    lineHeight: 20,
  },

  modalDescription: {
    color: colors.lightBlue,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "left",
    lineHeight: 15,
  },

  backButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    backgroundColor: "#FFFFFF",
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: -20,
    borderRadius: 60,
  },

  backButtonText: {
    color: colors.main,
    fontSize: 16,
    fontWeight: "900",
  },

  payButtonWrapper: {
    width: "100%",
    marginTop: -40,
  },
});