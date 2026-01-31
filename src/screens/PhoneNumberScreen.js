import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function PhoneNumberScreen() {
  const navigation = useNavigation()

  const [codigoPais, setCodigoPais] = useState('+351')
  const [numero, setNumero] = useState('')

  // Local assets - save your images to /assets folder
  // Uncomment these lines after adding the image files:
  // const IMG_BACKGROUND = require('../../assets/background.png')
  // const IMG_LOGO_PATTERN = require('../../assets/logo_background.png')
  
  // Temporary: set to null until assets are added
  const IMG_BACKGROUND = null
  const IMG_LOGO_PATTERN = null

  // Pattern configuration for the background logo tiles
  const PATTERN_ROWS = 12
  const PATTERN_COLS = 3
  const TILE_WIDTH = SCREEN_WIDTH * 0.34
  const TILE_HEIGHT = SCREEN_HEIGHT * 0.048
  const ROW_SPACING = SCREEN_HEIGHT * 0.103
  const COL_SPACING = SCREEN_WIDTH * 0.43

  const renderPatternTiles = () => {
    const tiles = []
    for (let row = 0; row < PATTERN_ROWS; row++) {
      const isOddRow = row % 2 === 1
      const offsetX = isOddRow ? COL_SPACING * 0.44 : 0
      const flip = isOddRow

      for (let col = 0; col < PATTERN_COLS; col++) {
        tiles.push(
          <FastImage
            key={`${row}-${col}`}
            source={IMG_LOGO_PATTERN}
            resizeMode={FastImage.resizeMode.contain}
            style={[
              styles.patternTile,
              {
                left: offsetX + col * COL_SPACING - SCREEN_WIDTH * 0.2,
                top: row * ROW_SPACING - SCREEN_HEIGHT * 0.11,
                width: TILE_WIDTH,
                height: TILE_HEIGHT,
                transform: flip ? [{ scaleY: -1 }] : undefined,
              },
            ]}
          />
        )
      }
    }
    return tiles
  }

  const handleCountryCodePress = () => {
    // TODO: Open country code picker/modal
    console.log('Country code picker pressed')
  }

  return (
    <View style={styles.container}>
      {/* Background Image */}
      {IMG_BACKGROUND && (
        <FastImage
          source={IMG_BACKGROUND}
          style={styles.backgroundImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}

      {/* Pattern Overlay */}
      {IMG_LOGO_PATTERN && (
        <View style={styles.patternContainer} pointerEvents="none">
          {renderPatternTiles()}
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.inputSection}>
          {/* Label */}
          <Text style={styles.label}>
            INDIQUE-NOS O SEU{'\n'}NUMERO DE{'\n'}TELEMOVÉL:
          </Text>

          {/* Input Row */}
          <View style={styles.inputRow}>
            {/* Country Code Selector */}
            <TouchableOpacity
              style={styles.countryCodeInput}
              onPress={handleCountryCodePress}
              activeOpacity={0.8}
            >
              <Text style={styles.countryCodeText}>{codigoPais}</Text>
            </TouchableOpacity>

            {/* Phone Number Input */}
            <View style={styles.phoneNumberInput}>
              <TextInput
                style={styles.phoneNumberTextInput}
                value={numero}
                onChangeText={(text) => setNumero(text.replace(/[^\d]/g, ''))}
                keyboardType="phone-pad"
                placeholder="Número de telemóvel"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B4066',
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },

  patternContainer: {
    ...StyleSheet.absoluteFillObject,
  },

  patternTile: {
    position: 'absolute',
    opacity: 0.4,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  inputSection: {
    alignItems: 'flex-start',
  },

  label: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 16,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },

  countryCodeInput: {
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },

  countryCodeText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 16,
    textAlign: 'center',
  },

  phoneNumberInput: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  phoneNumberTextInput: {
    color: '#000',
    fontWeight: '800',
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
})
