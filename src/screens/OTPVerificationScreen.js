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

      {/* Background Pattern */}
      <FastImage
        source={IMG_PATTERN}
        style={styles.backgroundPattern}
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Speech Bubble */}
        <View style={styles.speechBubbleContainer}>
          {/* Orange outer bubble */}
          <View style={styles.orangeBubble}>
            {/* White inner panel */}
            <View style={styles.whitePanel}>
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

            {/* Continue Button - inside orange bubble at bottom */}
            <View style={styles.continueButtonWrapper}>
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
          </View>

          {/* Speech bubble tail */}
          <View style={styles.bubbleTailContainer}>
            <View style={styles.bubbleTail} />
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Gray card */}
          <View style={styles.grayCard}>
            <View style={styles.grayCardContent}>
              <Text style={styles.helperText}>
                Caso não tenhas recebido,{'\n'}
                clica em voltar a enviar.
              </Text>
            </View>
          </View>

          {/* Resend Button - overlapping */}
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

const OTP_CIRCLE_SIZE = (SCREEN_WIDTH - 48 - 60) / 6 - 4

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingBottom: SCREEN_HEIGHT * 0.1,
  },

  // Speech Bubble
  speechBubbleContainer: {
    position: 'relative',
  },

  orangeBubble: {
    backgroundColor: '#EB6300',
    borderRadius: 28,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },

  whitePanel: {
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },

  messageText: {
    color: '#2B3349',
    fontWeight: '800',
    fontSize: 17,
    lineHeight: 24,
  },

  // OTP Row
  otpRow: {
    flexDirection: 'row',
    marginTop: 20,
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
    fontSize: 18,
    textAlign: 'center',
    padding: 0,
  },

  // Continue Button wrapper
  continueButtonWrapper: {
    alignItems: 'flex-end',
    paddingRight: 6,
    paddingTop: 10,
    paddingBottom: 6,
  },

  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },

  continueButtonText: {
    color: '#2B3349',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.5,
  },

  // Bubble tail
  bubbleTailContainer: {
    position: 'absolute',
    bottom: -18,
    left: 30,
    width: 40,
    height: 25,
    overflow: 'hidden',
  },

  bubbleTail: {
    width: 40,
    height: 40,
    backgroundColor: '#EB6300',
    borderBottomLeftRadius: 25,
    transform: [{ rotate: '-15deg' }, { translateY: -15 }],
  },

  // Bottom Section
  bottomSection: {
    marginTop: 35,
    position: 'relative',
    height: 90,
  },

  grayCard: {
    position: 'absolute',
    left: 45,
    right: 0,
    top: 10,
    bottom: 0,
    backgroundColor: '#E5E5E5',
    borderRadius: 22,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  grayCardContent: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 70,
    paddingRight: 16,
  },

  helperText: {
    color: '#2B3349',
    fontWeight: '800',
    fontSize: 13,
    lineHeight: 18,
  },

  resendButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: '#EB6300',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },

  resendButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
})
