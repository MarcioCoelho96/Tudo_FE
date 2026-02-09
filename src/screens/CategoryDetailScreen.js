import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function CategoryDetailScreen() {
  const navigation = useNavigation()
  const route = useRoute()

  // Get category from route params or default to 'restaurante'
  const categoryType = route?.params?.category || 'restaurante'
  const categoryTitle = categoryType.toUpperCase()

  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Pratos')
  const [selectedItems, setSelectedItems] = useState(['frango', 'arroz'])

  // Assets
  const IMG_HEADER = require('../../assets/images/restaurante.png')

  // Menu items data
  const menuItems = [
    {
      id: 'frango',
      title: '1 Dose de Frango',
      description: 'Uma dose de frango acompanhado\ncom batata frita e arroz.',
    },
    {
      id: 'peixe',
      title: 'Caldeirada de Peixe',
      description: 'Um cozido, cujos componentes\nbásicos são diversas variedades de\npeixe, batata, cebola, tomate e\npimentão.',
    },
    {
      id: 'arroz',
      title: 'Arroz de Cogumelos\ncom Omelete',
      description: 'Um cozido, cujos componentes\nbásicos são diversas variedades de\npeixe, batata, cebola, tomate e\npimentão.',
    },
  ]

  const tabs = ['Pratos', 'Bebidas', 'Sobremesas']

  const toggleItemSelection = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id)
      }
      return [...prev, id]
    })
  }

  const handleOrder = () => {
    console.log('Making order with items:', selectedItems)
    // navigation.navigate('Order', { items: selectedItems })
  }

  const filteredItems = menuItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Image */}
        <View style={styles.headerContainer}>
          <FastImage
            source={IMG_HEADER}
            style={styles.headerImage}
            resizeMode={FastImage.resizeMode.cover}
          />

          {/* Category Title Overlay */}
          <View style={styles.headerOverlay}>
            <Text style={styles.headerOverlayText}>{categoryTitle}</Text>
          </View>
        </View>

        {/* Search Row */}
        <View style={styles.searchRow}>
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

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => console.log('Navigate to profile')}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabPill, activeTab === tab && styles.tabPillActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items List */}
        <View style={styles.listContainer}>
          {filteredItems.map((item, index) => {
            const isSelected = selectedItems.includes(item.id)

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.itemRow}
                onPress={() => toggleItemSelection(item.id)}
                activeOpacity={0.8}
              >
                {/* Left Content */}
                <View style={styles.itemLeft}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>

                {/* Right Content */}
                <View style={styles.itemRight}>
                  {isSelected && <View style={styles.orangeDot} />}
                  <View style={styles.itemImagePlaceholder} />
                </View>

                {/* Divider */}
                {index !== filteredItems.length - 1 && <View style={styles.divider} />}
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Footer Card */}
      <View style={styles.footerContainer}>
        <View style={styles.footerCard}>
          {/* Order Button */}
          <TouchableOpacity
            style={styles.orderButton}
            onPress={handleOrder}
            activeOpacity={0.9}
          >
            <Text style={styles.orderButtonText}>FAZER{'\n'}PEDIDO</Text>
          </TouchableOpacity>

          {/* Footer Right */}
          <View style={styles.footerRight}>
            {/* Selected Count Pill */}
            <View style={styles.selectedPill}>
              <Text style={styles.selectedPillText}>
                {selectedItems.length} PRATOS{'\n'}SELECIONADOS
              </Text>
            </View>

            {/* Hint Text */}
            <Text style={styles.footerHint}>
              Quando tiver selecionado{'\n'}
              todos os pratos que deseja{'\n'}
              clique em FAZER PEDIDO.
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const HEADER_HEIGHT = SCREEN_HEIGHT * 0.26
const ITEM_IMAGE_SIZE = SCREEN_WIDTH * 0.26
const FOOTER_HEIGHT = 160

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    paddingBottom: 20,
  },

  // Header
  headerContainer: {
    width: '100%',
    height: HEADER_HEIGHT,
    paddingHorizontal: 20,
    paddingTop: (StatusBar.currentHeight || 44) + 10,
  },

  headerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },

  headerOverlay: {
    position: 'absolute',
    left: 50,
    right: 50,
    bottom: 20,
    height: 55,
    backgroundColor: 'rgba(185, 185, 185, 0.65)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerOverlayText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: 1,
  },

  // Search Row
  searchRow: {
    marginTop: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchContainer: {
    flex: 1,
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginRight: 12,
  },

  searchInput: {
    color: '#1E1E1E',
    fontWeight: '700',
    fontSize: 15,
    padding: 0,
  },

  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#28324A',
  },

  // Tabs
  tabsRow: {
    marginTop: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  tabPill: {
    flex: 1,
    height: 38,
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E6E6E6',
  },

  tabPillActive: {
    backgroundColor: '#F2F2F2',
  },

  tabText: {
    color: '#28324A',
    fontWeight: '700',
    fontSize: 14,
  },

  tabTextActive: {
    fontWeight: '900',
  },

  // List
  listContainer: {
    marginTop: 12,
    paddingHorizontal: 20,
  },

  itemRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    position: 'relative',
  },

  itemLeft: {
    flex: 1,
    paddingRight: 12,
  },

  itemTitle: {
    color: '#28324A',
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 24,
  },

  itemDescription: {
    marginTop: 8,
    color: '#28324A',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.85,
  },

  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },

  orangeDot: {
    position: 'absolute',
    left: -15,
    top: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EB6300',
    zIndex: 5,
  },

  itemImagePlaceholder: {
    width: ITEM_IMAGE_SIZE,
    height: ITEM_IMAGE_SIZE,
    borderRadius: 25,
    backgroundColor: '#D9D9D9',
  },

  divider: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: '#E6E6E6',
  },

  bottomSpacer: {
    height: FOOTER_HEIGHT + 40,
  },

  // Footer
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center',
  },

  footerCard: {
    width: SCREEN_WIDTH - 40,
    height: FOOTER_HEIGHT,
    backgroundColor: '#D9D9D9',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 7,
  },

  orderButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EB6300',
    justifyContent: 'center',
    alignItems: 'center',
  },

  orderButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
  },

  footerRight: {
    flex: 1,
    marginLeft: 16,
  },

  selectedPill: {
    width: '100%',
    height: 50,
    backgroundColor: '#28324A',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedPillText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 17,
  },

  footerHint: {
    marginTop: 10,
    color: '#28324A',
    fontWeight: '800',
    fontSize: 11,
    lineHeight: 15,
  },
})
