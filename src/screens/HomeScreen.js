import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function HomeScreen() {
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState('')

  // Assets
  const IMG_LOGO = require('../../assets/logo.png')
  const IMG_CAFE = require('../../assets/images/cafe.jpg')
  const IMG_RESTAURANTE = require('../../assets/images/restaurante.jpg')
  const IMG_LAVANDARIA = require('../../assets/images/lavandaria.jpg')

  // Category data
  const categories = [
    {
      id: 'cafe',
      title: 'CAFÉ',
      image: IMG_CAFE,
      route: 'cafe',
    },
    {
      id: 'restaurante',
      title: 'RESTAURANTE',
      image: IMG_RESTAURANTE,
      route: 'restaurante',
    },
    {
      id: 'lavandaria',
      title: 'LAVANDARIA',
      image: IMG_LAVANDARIA,
      route: 'lavandaria',
    },
  ]

  const renderCategoryCard = (category, index) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.card, index === 0 && styles.cardFirst]}
      activeOpacity={0.9}
      onPress={() => console.log(`Navigate to ${category.route}`)}
    >
      {/* Card Background Image */}
      <FastImage
        source={category.image}
        style={styles.cardImage}
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* Orange Accent Circle */}
      <View style={styles.cardAccentCircle} />

      {/* Frosted Glass Label at bottom */}
      <View style={styles.cardLabelContainer}>
        <View style={styles.cardLabelBackground} />
        <Text style={styles.cardLabelText}>{category.title}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* White Background with curved top */}
      <View style={styles.whiteBackground} />

      {/* Header Section */}
      <View style={styles.header}>
        {/* Logo */}
        <FastImage
          source={IMG_LOGO}
          style={styles.logo}
          resizeMode={FastImage.resizeMode.contain}
        />

        {/* Search Row */}
        <View style={styles.searchRow}>
          {/* Search Input */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Pesquisar"
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Profile Button - Dark blue filled */}
          <TouchableOpacity
            style={styles.profileButton}
            activeOpacity={0.85}
            onPress={() => console.log('Navigate to profile')}
          >
            {/* User icon placeholder - white */}
            <View style={styles.profileIconOuter}>
              <View style={styles.profileIconInner} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories List */}
      <ScrollView
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category, index) => renderCategoryCard(category, index))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        {/* Curved background with notch */}
        <View style={styles.bottomNavBar}>
          {/* Left Button - Map Pin */}
          <TouchableOpacity
            style={styles.navButton}
            activeOpacity={0.85}
            onPress={() => console.log('Navigate to map')}
          >
            <View style={styles.navIconPin}>
              <View style={styles.pinHead} />
              <View style={styles.pinPoint} />
            </View>
          </TouchableOpacity>

          {/* Spacer for center button */}
          <View style={styles.navSpacer} />

          {/* Right Button - File/Document */}
          <TouchableOpacity
            style={styles.navButton}
            activeOpacity={0.85}
            onPress={() => console.log('Navigate to list')}
          >
            <View style={styles.navIconFile}>
              <View style={styles.fileFold} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Notch curve overlay */}
        <View style={styles.notchCurve}>
          <View style={styles.notchLeft} />
          <View style={styles.notchCenter} />
          <View style={styles.notchRight} />
        </View>

        {/* Center Floating Button - Calendar */}
        <TouchableOpacity
          style={styles.navCenterButton}
          activeOpacity={0.9}
          onPress={() => console.log('Navigate to agenda')}
        >
          <View style={styles.calendarIcon}>
            <View style={styles.calendarTop} />
            <View style={styles.calendarBody} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const CARD_HEIGHT = SCREEN_HEIGHT * 0.19
const NAV_HEIGHT = 60
const NAV_CENTER_SIZE = 65

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },

  whiteBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    top: 20,
  },

  // Header
  header: {
    paddingTop: (StatusBar.currentHeight || 44) + 10,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },

  logo: {
    width: 110,
    height: 36,
    marginBottom: 12,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  searchContainer: {
    flex: 1,
    height: 52,
    backgroundColor: '#E8E8E8',
    borderRadius: 26,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  searchInput: {
    color: '#1E1E1E',
    fontWeight: '600',
    fontSize: 15,
    padding: 0,
  },

  profileButton: {
    width: 52,
    height: 52,
    backgroundColor: '#2B4066',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileIconOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },

  profileIconInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2B4066',
    marginTop: 2,
  },

  // Categories
  categoriesContainer: {
    flex: 1,
  },

  categoriesContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: NAV_HEIGHT + 30,
    gap: 12,
  },

  card: {
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#E6E6E6',
  },

  cardFirst: {
    // First card can have special styling if needed
  },

  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  cardAccentCircle: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#EB6300',
  },

  cardLabelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  cardLabelBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },

  cardLabelText: {
    color: '#2B4066',
    fontWeight: '900',
    fontSize: 17,
    letterSpacing: 0.5,
  },

  // Bottom Navigation
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: NAV_HEIGHT + 35,
    alignItems: 'center',
  },

  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: NAV_HEIGHT,
    backgroundColor: '#2B4066',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },

  navButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Pin icon
  navIconPin: {
    alignItems: 'center',
  },

  pinHead: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'transparent',
  },

  pinPoint: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(255,255,255,0.6)',
    marginTop: -2,
  },

  // File icon
  navIconFile: {
    width: 20,
    height: 26,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 3,
    position: 'relative',
  },

  fileFold: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    backgroundColor: '#2B4066',
    borderBottomLeftRadius: 4,
  },

  navSpacer: {
    width: NAV_CENTER_SIZE + 20,
  },

  // Notch curve (simplified)
  notchCurve: {
    position: 'absolute',
    bottom: NAV_HEIGHT - 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
  },

  notchLeft: {
    width: 20,
    height: 20,
    backgroundColor: '#2B4066',
    borderTopRightRadius: 20,
  },

  notchCenter: {
    width: NAV_CENTER_SIZE + 16,
    height: 35,
    backgroundColor: 'transparent',
  },

  notchRight: {
    width: 20,
    height: 20,
    backgroundColor: '#2B4066',
    borderTopLeftRadius: 20,
  },

  navCenterButton: {
    position: 'absolute',
    bottom: NAV_HEIGHT - 15,
    width: NAV_CENTER_SIZE,
    height: NAV_CENTER_SIZE,
    backgroundColor: '#EB6300',
    borderRadius: NAV_CENTER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },

  // Calendar icon
  calendarIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
  },

  calendarTop: {
    width: 24,
    height: 6,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },

  calendarBody: {
    width: 24,
    height: 16,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    marginTop: 2,
  },
})
