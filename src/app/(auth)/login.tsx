import { Image, ImageBackground } from "expo-image";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { colors } from "../../styles/global";

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+351");

  const [enterCode, setEnterCode] = useState(false);

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "");

    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length > 6) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)}`;
    }

    setPhoneNumber(formatted.substring(0, 11));
  };

  const handleContinue = (value: boolean) => {
    setEnterCode(value);
  };

  const resources = {
    loginTitle: "INDIQUE-NOS O SEU",
    loginSubtitle: "NUMERO DE TELEMOVÉL:",
    buttonText: "CONTINUAR",
    yourCodeWasSent:
      "Foi enviado um código para o número ******920, por favor indique-nos o código de 6 digitos que recebeu:",
    sendAgain: "VOLTAR A ENVIAR ",
    inCaseYouDidNotReceive:
      "Caso não tenhas recebido, clica em voltar a enviar.",
  };

  const backgroundImage = enterCode
    ? require("../../../assets/images/backgroundLoginTwo.svg")
    : require("../../../assets/images/backgroundLogin.svg");

  return (
    <ImageBackground
      source={backgroundImage}
      style={{
        ...styles.backgroundImage,
        backgroundColor: enterCode ? colors.white : colors.loginBackground,
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {enterCode ? (
          <View>
            <ImageBackground
              source={require("../../../assets/images/smsLayout.svg")}
              style={{
                width: 340,
                height: 340,
                alignItems: "center",
                justifyContent: "center",
              }}
              contentFit="contain"
            >
              <View
                style={{
                  backgroundColor: colors.lightGray,
                  width: 300,
                  height: 220,
                  padding: 20,
                  borderRadius: 50,
                  top: -20,
                  gap: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: colors.main,
                  }}
                >
                  {resources.yourCodeWasSent}
                </Text>
                <OTPTextInput
                  inputCount={6} // Number of circles
                  tintColor="#f27100" // Color when focused (matches your orange)
                  offTintColor="#e0e0e0" // Color when idle
                  textInputStyle={styles.otpInput}
                  keyboardType="numeric"
                  containerStyle={styles.otpContainer}
                />
              </View>
              <TouchableOpacity style={styles.buttonC}>
                <Text
                  style={{ fontSize: 14, fontWeight: 900, color: colors.main }}
                  onPress={() => handleContinue(false)}
                >
                  {resources.buttonText}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              source={require("../../../assets/images/smsRepeatLayout.svg")}
              style={{
                width: 340,
                height: 121,
                top: -30,
              }}
              contentFit="contain"
            >
              <TouchableOpacity style={styles.buttonB}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 900,
                    color: colors.white,
                    textAlign: "center",
                  }}
                  onPress={() => handleContinue(false)}
                >
                  {resources.sendAgain}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  paddingTop: 60,
                  paddingLeft: 140,
                  paddingRight: 20,
                  fontSize: 14,
                  fontWeight: 900,
                  color: colors.main,
                }}
              >
                {resources.inCaseYouDidNotReceive}
              </Text>
            </ImageBackground>
          </View>
        ) : (
          <View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.title}>{resources.loginTitle}</Text>
              <Text style={styles.title}>{resources.loginSubtitle}</Text>
            </View>
            <View style={styles.phoneContainer}>
              <TextInput
                style={styles.inputCode}
                placeholder="+351"
                value={countryCode}
                onChangeText={setCountryCode}
                maxLength={4}
                keyboardType="number-pad"
              />
              <TextInput
                style={styles.inputNumber}
                placeholder="XXX XXX XXX"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                maxLength={11}
                keyboardType="number-pad"
              />
            </View>
            <View>
              <Image
                source={require("../../../assets/images/Subtract.svg")}
                style={{ width: 310, height: 78 }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleContinue(true)}
              >
                <Text style={{ fontSize: 14, fontWeight: 900, color: "#fff" }}>
                  {resources.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.loginBackground,
  },
  title: {
    width: 258,
    textTransform: "uppercase",
    fontSize: 22,
    fontWeight: 900,
    fontFamily: "Inter-Black",
    includeFontPadding: false,
    color: colors.white,
  },
  phoneContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 13,
  },
  inputNumber: {
    width: 205,
    height: 60,
    borderWidth: 1,
    backgroundColor: colors.gray,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontWeight: 500,
    fontSize: 22,
    textAlign: "center",
  },
  inputCode: {
    width: 90,
    height: 60,
    borderWidth: 1,
    backgroundColor: colors.gray,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontWeight: 500,
    fontSize: 22,
  },
  button: {
    top: 10,
    left: 165,
    position: "absolute",
    backgroundColor: colors.orange,
    borderRadius: 50,
    elevation: 3,
    width: 130,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonC: {
    top: 270,
    left: 150,
    position: "absolute",
    backgroundColor: colors.white,
    borderRadius: 50,
    elevation: 3,
    width: 170,
    height: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonB: {
    top: 10,
    left: 10,
    position: "absolute",
    backgroundColor: colors.orange,
    borderRadius: 50,
    elevation: 3,
    width: 115,
    height: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  otpContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  otpInput: {
    backgroundColor: "#e0e0e0",
    borderRadius: 17.5,
    width: 35,
    height: 35,
    borderBottomWidth: 0,
    textAlign: "center",
    verticalAlign: "middle",
    padding: 0,
    fontSize: 14,
    lineHeight: 14,
    includeFontPadding: false,
  },
});
