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
  const IMG_FOOTER = require('../../assets/footer.png')
  const IMG_CAFE = require('../../assets/images/cafe.jpg')
  const IMG_RESTAURANTE = require('../../assets/images/restaurante.jpg')
  const IMG_LAVANDARIA = require('../../assets/images/lavandaria.jpg')

  // Category data - can add more items here
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
    // Add more categories as needed:
    // {
    //   id: 'padaria',
    //   title: 'PADARIA',
    //   image: IMG_PADARIA,
    //   route: 'padaria',
    // },
  ]

  const handleCategoryPress = (category) => {
    console.log(`Navigate to ${category.route}`)
    // navigation.navigate(category.route)
  }

  const renderCategoryCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => handleCategoryPress(item)}
    >
      {/* Card Background Image */}
      <FastImage
        source={item.image}
        style={styles.cardImage}
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* Orange Accent Circle */}
      <View style={styles.cardAccentCircle} />

      {/* Frosted Glass Label at bottom */}
      <View style={styles.cardLabelContainer}>
        <View style={styles.cardLabelBackground} />
        <Text style={styles.cardLabelText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Background Image */}
      <FastImage
        source={IMG_BACKGROUND}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* Header Section */}
      <View style={styles.header}>
        {/* Logo */}
        <FastImage
          source={IMG_LOGO}
          style={styles.logo}
          resizeMode={FastImage.resizeMode.contain}
        />

        {/* Search Input - Full width, no button */}
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
      </View>

      {/* Categories FlatList - Scrollable */}
      <FlatList
        data={categories}
        renderItem={renderCategoryCard}
        keyExtractor={(item) => item.id}
        style={styles.categoriesList}
        contentContainerStyle={styles.categoriesContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation - Using footer image */}
      <View style={styles.bottomNavContainer}>
        {/* Footer Background Image */}
        <FastImage
          source={IMG_FOOTER}
          style={styles.footerImage}
          resizeMode={FastImage.resizeMode.contain}
        />

        {/* Navigation Buttons */}
        <View style={styles.navButtonsContainer}>
          {/* Left Button - Map */}
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

          {/* Center Button - Calendar/Agenda */}
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

          {/* Right Button - List/File */}
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
const FOOTER_HEIGHT = 80

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },

  // Header
  header: {
    paddingTop: (StatusBar.currentHeight || 44) + 10,
    paddingHorizontal: 24,
    paddingBottom: 12,
  },

  logo: {
    width: 110,
    height: 36,
    marginBottom: 12,
  },

  searchContainer: {
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

  // Categories FlatList
  categoriesList: {
    flex: 1,
  },

  categoriesContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: FOOTER_HEIGHT + 40,
    gap: 12,
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
