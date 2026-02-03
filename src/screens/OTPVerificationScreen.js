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

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function OTPVerificationScreen({ route }) {
  const navigation = useNavigation()

  // Masked phone number from previous screen
  const maskedNumber = route?.params?.maskedNumber || '******920'

  // Assets
  const IMG_PATTERN = require('../../assets/pattern_light.png')
  const IMG_BUBBLE = require('../../assets/bubble_orange.png')
  const IMG_PANEL = require('../../assets/panel_white.png')
  const IMG_BOTTOM_CARD = require('../../assets/bottom_card.png')

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
        {/* Orange Bubble Card */}
        <View style={styles.bubbleContainer}>
          <FastImage
            source={IMG_BUBBLE}
            style={styles.bubbleImage}
            resizeMode={FastImage.resizeMode.contain}
          />

          {/* White Panel Overlay */}
          <View style={styles.panelContainer}>
            <FastImage
              source={IMG_PANEL}
              style={styles.panelImage}
              resizeMode={FastImage.resizeMode.contain}
            />

            {/* Message Text */}
            <View style={styles.messageContainer}>
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
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              { opacity: isCodeComplete ? 1 : 0.7 },
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
          <View style={styles.bottomCardContainer}>
            <FastImage
              source={IMG_BOTTOM_CARD}
              style={styles.bottomCardImage}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.helperText}>
              Caso não tenhas recebido,{'\n'}
              clica em voltar a enviar.
            </Text>
          </View>

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

const OTP_CIRCLE_SIZE = SCREEN_WIDTH * 0.105

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.70,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 120,
  },

  // Orange Bubble
  bubbleContainer: {
    position: 'relative',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
    marginTop: 40,
  },

  bubbleImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 380 / 384,
  },

  // White Panel
  panelContainer: {
    position: 'absolute',
    top: '12%',
    left: '5%',
    right: '5%',
    alignItems: 'center',
  },

  panelImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 347 / 250,
  },

  messageContainer: {
    position: 'absolute',
    top: '12%',
    left: '10%',
    right: '10%',
  },

  messageText: {
    color: '#2B3349',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 24,
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
    bottom: 20,
    right: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 48,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },

  continueButtonText: {
    color: '#2B3349',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },

  bottomSection: {
    marginTop: 40,
    position: 'relative',
  },

  resendButton: {
    position: 'absolute',
    top: -61,                 
    left: 27,                 
    width: 110,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#EB6300',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.20,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 10,
  },

  resendButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },

  bottomCardImage: {
    position: 'absolute',
    marginTop: -73,
    marginLeft: 5,
    width: 360,
    height: 120,
  },

  helperText: {
    color: '#2B3349',
    fontWeight: '800',
    fontSize: 15,
    lineHeight: 20,
    marginTop: -12,
    marginLeft: 155,
  },
})
