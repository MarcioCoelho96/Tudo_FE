import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
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
  const IMG_BACKGROUND = require('../../assets/homepage_background.png')
  const IMG_FOOTER = require('../../assets/footer_homepage.png')
  const IMG_CAFE = require('../../assets/images/cafe.png')
  const IMG_RESTAURANTE = require('../../assets/images/restaurante.png')
  const IMG_LAVANDARIA = require('../../assets/images/lavandaria.png')
  const IMG_PIN = require('../../assets/icons/pin.png')

  // User balance/credits
  const userBalance = '34,30 €'

  // Recent places data
  const recentPlaces = [
    {
      id: 'recent1',
      title: 'RESTAURANTE\nANTÔNIO',
      image: IMG_CAFE,
    },
    {
      id: 'recent2',
      title: 'RESTAURANTE',
      image: IMG_CAFE,
    },
    {
      id: 'recent3',
      title: 'RESTAURANTE\nBAR',
      image: IMG_CAFE,
    },
  ]

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

  const handleCategoryPress = (category) => {
    console.log(`Navigate to ${category.route}`)
  }

  const handleRecentPress = (place) => {
    console.log(`Navigate to recent place: ${place.title}`)
  }

  const handleLocationPress = () => {
    console.log('Open location picker')
  }

  const renderRecentCard = ({ item }) => (
    <TouchableOpacity
      style={styles.recentCard}
      activeOpacity={0.9}
      onPress={() => handleRecentPress(item)}
    >
      <FastImage
        source={item.image}
        style={styles.recentCardImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.recentAccentCircle} />
      <View style={styles.recentLabelContainer}>
        <Text style={styles.recentLabelText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderCategoryCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => handleCategoryPress(item)}
    >
      <FastImage
        source={item.image}
        style={styles.cardImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.cardAccentCircle} />
      <View style={styles.cardLabelContainer}>
        <View style={styles.cardLabelBackground} />
        <Text style={styles.cardLabelText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Top Bar with Profile (in blue area) */}
      <View style={styles.topBar}>
        <View style={styles.topBarSpacer} />
        
        {/* Profile Icon - Top Right in Blue Area */}
        <TouchableOpacity
          style={styles.profileButton}
          activeOpacity={0.85}
          onPress={() => console.log('Navigate to profile')}
        >
          <View style={styles.profileIconHead} />
          <View style={styles.profileIconBody} />
        </TouchableOpacity>
      </View>

      {/* Background Image */}
      <FastImage
        source={IMG_BACKGROUND}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* Logo */}
          <FastImage
            source={IMG_LOGO}
            style={styles.logo}
            resizeMode={FastImage.resizeMode.contain}
          />

          {/* Location Row */}
          <View style={styles.locationRow}>
            <TouchableOpacity 
              style={styles.locationPicker}
              onPress={handleLocationPress}
              activeOpacity={0.8}
            >
              <FastImage
                source={IMG_PIN}
                style={styles.locationIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.locationText}>Escolher morada</Text>
            </TouchableOpacity>

            <View style={styles.balanceContainer}>
              <View style={styles.balanceDot} />
              <Text style={styles.balanceText}>{userBalance}</Text>
            </View>
          </View>

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
              returnKeyType="search"
              onSubmitEditing={() => console.log('Search:', searchQuery)}
            />
          </View>

          {/* Section Title */}
          <Text style={styles.sectionTitle}>QUE TIPO DE SERVIÇO PROCURA?</Text>
        </View>

        {/* Recent Places - Horizontal FlatList */}
        {recentPlaces.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.recentTitle}>RECENTES</Text>
            <FlatList
              data={recentPlaces}
              renderItem={renderRecentCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentListContent}
            />
          </View>
        )}

        {/* Categories - Vertical FlatList */}
        <FlatList
          data={categories}
          renderItem={renderCategoryCard}
          keyExtractor={(item) => item.id}
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <FastImage
          source={IMG_FOOTER}
          style={styles.footerImage}
          resizeMode={FastImage.resizeMode.contain}
        />

        <View style={styles.navButtonsContainer}>
          <TouchableOpacity
            style={styles.navButton}
            activeOpacity={0.85}
            onPress={() => console.log('Navigate to map')}
          >
            <FastImage
              source={require('../../assets/icons/pin.png')}
              style={styles.navIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navCenterButton}
            activeOpacity={0.9}
            onPress={() => console.log('Navigate to agenda')}
          >
            <FastImage
              source={require('../../assets/icons/calendar.png')}
              style={styles.navCenterIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            activeOpacity={0.85}
            onPress={() => console.log('Navigate to list')}
          >
            <FastImage
              source={require('../../assets/icons/file.png')}
              style={styles.navIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const CARD_HEIGHT = SCREEN_HEIGHT * 0.18
const RECENT_CARD_SIZE = SCREEN_WIDTH * 0.28  // Smaller recent cards
const FOOTER_HEIGHT = 80
const TOP_BAR_HEIGHT = 50

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3349',
  },

  // Top Bar (in blue area)
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: (StatusBar.currentHeight || 44) + 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 100,
  },

  topBarSpacer: {
    flex: 1,
  },

  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileIconHead: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2B3349',
  },

  profileIconBody: {
    width: 24,
    height: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#2B3349',
    marginTop: -2,
  },

  // Background
  backgroundImage: {
    position: 'absolute',
    top: TOP_BAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Content Container
  contentContainer: {
    flex: 1,
    marginTop: TOP_BAR_HEIGHT + 10,
  },

  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  logo: {
    width: 110,
    height: 36,
    marginBottom: 16,
  },

  // Location Row
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  locationPicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationIcon: {
    width: 24,
    height: 24,
    tintColor: '#CCCCCC',
    marginRight: 8,
  },

  locationText: {
    color: '#CCCCCC',
    fontSize: 16,
    fontWeight: '600',
  },

  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B4066',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  balanceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EB6300',
    marginRight: 8,
  },

  balanceText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  // Search
  searchContainer: {
    height: 52,
    backgroundColor: '#E8E8E8',
    borderRadius: 26,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  searchInput: {
    color: '#1E1E1E',
    fontWeight: '600',
    fontSize: 15,
    padding: 0,
  },

  // Section Title
  sectionTitle: {
    color: '#2B4066',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 12,
  },

  // Recent Section
  recentSection: {
    marginBottom: 12,
  },

  recentTitle: {
    color: '#2B4066',
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 24,
    marginBottom: 10,
  },

  recentListContent: {
    paddingHorizontal: 24,
  },

  recentCard: {
    width: RECENT_CARD_SIZE,
    height: RECENT_CARD_SIZE,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#E6E6E6',
    marginRight: 10,
  },

  recentCardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  recentAccentCircle: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EB6300',
  },

  recentLabelContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },

  recentLabelText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  // Categories FlatList
  categoriesList: {
    flex: 1,
  },

  categoriesContent: {
    paddingHorizontal: 24,
    paddingBottom: FOOTER_HEIGHT + 60,  // More padding so cards don't go behind footer
  },

  card: {
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#E6E6E6',
    marginBottom: 12,
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
    height: FOOTER_HEIGHT + 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  footerImage: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
    height: FOOTER_HEIGHT,
  },

  navButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: FOOTER_HEIGHT - 15,
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

  navIcon: {
    width: 28,
    height: 28,
    tintColor: '#FFFFFF',
  },

  navCenterButton: {
    width: 60,
    height: 60,
    backgroundColor: '#EB6300',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },

  navCenterIcon: {
    width: 28,
    height: 28,
    tintColor: '#FFFFFF',
  },
})
