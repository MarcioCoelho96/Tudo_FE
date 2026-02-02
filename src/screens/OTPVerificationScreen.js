import React, { useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function OTPVerificationScreen({ route }) {
  const navigation = useNavigation()

  // Masked phone number from previous screen
  const maskedNumber = route?.params?.maskedNumber || '******920'

  // Assets - reuse the same pattern from phone number screen
  const IMG_PATTERN = require('../../assets/background.png')

  // OTP State
  const OTP_LENGTH = 6
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const inputRefs = useRef([])

  const handleDigitChange = (index, value) => {
    const digit = value.replace(/[^\d]/g, '').slice(-1)

    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)

    // Auto-focus next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (index, e) => {
    // Handle backspace - focus previous input
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const isCodeComplete = otp.join('').length === OTP_LENGTH

  const handleContinue = () => {
    const code = otp.join('')
    console.log('OTP Code:', code)
    // navigation.navigate('NextScreen', { code })
  }

  const handleResend = () => {
    console.log('Resend OTP')
    // Call your resend SMS function here
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Background Pattern - increased opacity */}
      <FastImage
        source={IMG_PATTERN}
        style={styles.backgroundPattern}
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Orange Bubble Card */}
        <View style={styles.bubbleWrapper}>
          <View style={styles.bubbleContainer}>
            {/* Orange bubble background */}
            <View style={styles.bubbleOrange}>
              {/* White panel inside */}
              <View style={styles.panelWhite}>
                {/* Message Text */}
                <Text style={styles.messageText}>
                  Foi enviado um código para o{'\n'}
                  número {maskedNumber}, por{'\n'}
                  favor indique-nos o código{'\n'}
                  de 6 digitos que recebeu:
                </Text>

                {/* OTP Input Row */}
                <View style={styles.otpRow}>
                  {otp.map((digit, index) => (
                    <View key={index} style={styles.otpCircle}>
                      <TextInput
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        style={styles.otpInput}
                        value={digit}
                        onChangeText={(text) => handleDigitChange(index, text)}
                        onKeyPress={(e) => handleKeyPress(index, e)}
                        keyboardType="number-pad"
                        maxLength={1}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textAlign="center"
                      />
                    </View>
                  ))}
                </View>
              </View>

              {/* Bubble tail */}
              <View style={styles.bubbleTail} />
            </View>
          </View>

          {/* Continue Button - positioned at bottom right of bubble */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              { opacity: isCodeComplete ? 1 : 0.9 },
            ]}
            onPress={handleContinue}
            disabled={!isCodeComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>CONTINUAR</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Gray card behind */}
          <View style={styles.bottomCard}>
            <Text style={styles.helperText}>
              Caso não tenhas recebido,{'\n'}
              clica em voltar a enviar.
            </Text>
          </View>

          {/* Resend Button - overlapping the card */}
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResend}
            activeOpacity={0.8}
          >
            <Text style={styles.resendButtonText}>VOLTAR A{'\n'}ENVIAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const OTP_CIRCLE_SIZE = SCREEN_WIDTH * 0.11

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.45,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingBottom: SCREEN_HEIGHT * 0.15,
  },

  // Bubble wrapper for positioning continue button
  bubbleWrapper: {
    position: 'relative',
  },

  bubbleContainer: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },

  bubbleOrange: {
    backgroundColor: '#EB6300',
    borderRadius: 30,
    padding: 12,
    paddingBottom: 50,
  },

  panelWhite: {
    backgroundColor: '#F5F5F5',
    borderRadius: 22,
    padding: 24,
    paddingBottom: 30,
  },

  bubbleTail: {
    position: 'absolute',
    bottom: -15,
    left: 40,
    width: 40,
    height: 40,
    backgroundColor: '#EB6300',
    borderBottomLeftRadius: 20,
    transform: [{ rotate: '45deg' }],
  },

  messageText: {
    color: '#2B3349',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 26,
  },

  // OTP Row
  otpRow: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-between',
  },

  otpCircle: {
    width: OTP_CIRCLE_SIZE,
    height: OTP_CIRCLE_SIZE,
    borderRadius: OTP_CIRCLE_SIZE / 2,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  otpInput: {
    width: '100%',
    height: '100%',
    color: '#2B3349',
    fontWeight: '900',
    fontSize: 20,
    textAlign: 'center',
    padding: 0,
  },

  // Continue Button
  continueButton: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 36,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  continueButtonText: {
    color: '#2B3349',
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 1,
  },

  // Bottom Section
  bottomSection: {
    position: 'relative',
    marginTop: 30,
    marginLeft: 0,
  },

  bottomCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    paddingVertical: 20,
    paddingLeft: 100,
    paddingRight: 24,
    marginLeft: 50,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },

  helperText: {
    color: '#2B3349',
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 20,
  },

  resendButton: {
    position: 'absolute',
    left: 0,
    top: -15,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#EB6300',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },

  resendButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
})
