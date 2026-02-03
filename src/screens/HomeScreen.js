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

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.card}
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

      {/* Label at bottom */}
      <View style={styles.cardLabelContainer}>
        <Text style={styles.cardLabelText}>{category.title}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

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
              placeholderTextColor="#7A7A7A"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Profile Button */}
          <TouchableOpacity
            style={styles.profileButton}
            activeOpacity={0.85}
            onPress={() => console.log('Navigate to profile')}
          >
            <View style={styles.profileIconPlaceholder} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories List */}
      <ScrollView
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map(renderCategoryCard)}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        {/* Curved background */}
        <View style={styles.bottomNavBar}>
          {/* Left Button - Map */}
          <TouchableOpacity
            style={styles.navButton}
            activeOpacity={0.85}
            onPress={() => console.log('Navigate to map')}
          >
            <View style={styles.navIconPlaceholder} />
          </TouchableOpacity>

          {/* Spacer for center button */}
          <View style={styles.navSpacer} />

          {/* Right Button - List */}
          <TouchableOpacity
            style={styles.navButton}
            activeOpacity={0.85}
            onPress={() => console.log('Navigate to list')}
          >
            <View style={styles.navIconPlaceholder} />
          </TouchableOpacity>
        </View>

        {/* Center Floating Button - Calendar */}
        <TouchableOpacity
          style={styles.navCenterButton}
          activeOpacity={0.9}
          onPress={() => console.log('Navigate to agenda')}
        >
          <View style={styles.navCenterIconPlaceholder} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const CARD_HEIGHT = SCREEN_HEIGHT * 0.2
const NAV_HEIGHT = 70
const NAV_CENTER_SIZE = 70

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B4066',
  },

  // Header
  header: {
    paddingTop: StatusBar.currentHeight || 44,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },

  logo: {
    width: 120,
    height: 40,
    marginBottom: 16,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  searchContainer: {
    flex: 1,
    height: 56,
    backgroundColor: '#E6E6E6',
    borderRadius: 28,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  searchInput: {
    color: '#1E1E1E',
    fontWeight: '700',
    fontSize: 16,
    padding: 0,
  },

  profileButton: {
    width: 56,
    height: 56,
    backgroundColor: '#2B4066',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileIconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: '#E6E6E6',
    borderRadius: 12,
  },

  // Categories
  categoriesContainer: {
    flex: 1,
  },

  categoriesContent: {
    paddingHorizontal: 24,
    paddingBottom: NAV_HEIGHT + 40,
    gap: 16,
  },

  card: {
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#E6E6E6',
  },

  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  cardAccentCircle: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EB6300',
  },

  cardLabelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  cardLabelText: {
    color: '#2B4066',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 1,
  },

  // Bottom Navigation
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: NAV_HEIGHT + 20,
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
    paddingHorizontal: 50,
  },

  navButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navIconPlaceholder: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 6,
  },

  navSpacer: {
    width: NAV_CENTER_SIZE,
  },

  navCenterButton: {
    position: 'absolute',
    bottom: NAV_HEIGHT - NAV_CENTER_SIZE / 2,
    width: NAV_CENTER_SIZE,
    height: NAV_CENTER_SIZE,
    backgroundColor: '#EB6300',
    borderRadius: NAV_CENTER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },

  navCenterIconPlaceholder: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 6,
  },
})
