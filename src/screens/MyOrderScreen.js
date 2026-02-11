import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function MyOrderScreen() {
  const navigation = useNavigation()
  const route = useRoute()

  // Get selected items from previous screen or use defaults
  const pedidoItens = route?.params?.itens || [
    {
      id: 'frango',
      titulo: '1 Dose de Frango',
      descricao: 'Uma dose de frango acompanhado\ncom batata frita e arroz.',
      image: { uri: 'https://picsum.photos/seed/frango/200/200' },
    },
    {
      id: 'arroz',
      titulo: 'Arroz de Cogumelos\ncom Omelete',
      descricao: 'Um cozido, cujos componentes\nbásicos são diversas variedades de\npeixe, batata, cebola, tomate e\npimentão.',
      image: { uri: 'https://picsum.photos/seed/arroz/200/200' },
    },
  ]

  const pagar = () => {
    console.log('Paying for items:', pedidoItens)
    // navigation.navigate('Pagamento', { itens: pedidoItens })
  }

  const pedirMais = () => {
    navigation.goBack()
  }

  const dividirConta = () => {
    console.log('Split bill')
    // navigation.navigate('DividirConta', { itens: pedidoItens })
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemRow}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemTitle}>{item.titulo}</Text>
          <Text style={styles.itemDesc}>{item.descricao}</Text>
        </View>

        <View style={styles.itemRight}>
          <View style={styles.itemImageContainer}>
            {item.image ? (
              <FastImage
                source={item.image}
                style={styles.itemImage}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <View style={styles.itemImagePlaceholder} />
            )}
          </View>
        </View>

        {index !== pedidoItens.length - 1 && <View style={styles.divider} />}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* White main panel */}
      <View style={styles.whitePanel} />

      {/* Top-right navy shape */}
      <View style={styles.topRightNavy} />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>tud</Text>
        <Text style={styles.logoTextO}>o</Text>
        <View style={styles.logoDot} />
      </View>

      {/* Profile button */}
      <TouchableOpacity
        style={styles.profileCircle}
        onPress={() => console.log('Navigate to profile')}
      >
        <View style={styles.profileIconHead} />
        <View style={styles.profileIconBody} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.titulo}>O MEU PEDIDO</Text>

      {/* List */}
      <FlatList
        data={pedidoItens}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      {/* Footer Card */}
      <View style={styles.footerWrap}>
        <View style={styles.footerCard}>
          {/* Pay button */}
          <TouchableOpacity style={styles.pagarBtn} onPress={pagar}>
            <Text style={styles.pagarTxt}>PAGAR</Text>
          </TouchableOpacity>

          {/* Right side */}
          <View style={styles.footerRight}>
            {/* Action buttons row */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionPillLeft} onPress={pedirMais}>
                <Text style={styles.actionTxt}>PEDIR{'\n'}MAIS</Text>
              </TouchableOpacity>

              <View style={styles.actionDivider} />

              <TouchableOpacity style={styles.actionPillRight} onPress={dividirConta}>
                <Text style={styles.actionTxt}>DIVIDIR{'\n'}CONTA</Text>
              </TouchableOpacity>
            </View>

            {/* Helper text */}
            <View style={styles.helperPill}>
              <Text style={styles.helperTxt}>
                Quando tiver selecionado{'\n'}
                todos os pratos que deseja{'\n'}
                clique em FAZER PEDIDO.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomBar} />

        {/* Nav Buttons */}
        <View style={styles.navButtonsContainer}>
          {/* Left - Pin/Location icon */}
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => console.log('Navigate to map')}
          >
            <View style={styles.pinIcon}>
              <View style={styles.pinIconTop} />
              <View style={styles.pinIconPoint} />
            </View>
          </TouchableOpacity>

          {/* Center - Wallet button */}
          <TouchableOpacity
            style={styles.navCenterButton}
            onPress={() => console.log('Navigate to wallet')}
          >
            <View style={styles.walletIcon}>
              <View style={styles.walletBody} />
              <View style={styles.walletFlap} />
            </View>
          </TouchableOpacity>

          {/* Right - Document/Receipt icon */}
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => console.log('Navigate to receipts')}
          >
            <View style={styles.receiptIcon}>
              <View style={styles.receiptBody} />
              <View style={styles.receiptLine1} />
              <View style={styles.receiptLine2} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const HEADER_TOP = (StatusBar.currentHeight || 44) + 10
const TOP_NAV_HEIGHT = SCREEN_HEIGHT * 0.14
const FOOTER_HEIGHT = 180
const BOTTOM_BAR_HEIGHT = SCREEN_HEIGHT * 0.08
const ITEM_IMAGE_SIZE = SCREEN_WIDTH * 0.26

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28324A',
  },

  whitePanel: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: BOTTOM_BAR_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  topRightNavy: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: SCREEN_WIDTH * 0.50,
    height: TOP_NAV_HEIGHT,
    backgroundColor: '#28324A',
    borderBottomLeftRadius: SCREEN_HEIGHT * 0.14,
  },

  // Logo
  logoContainer: {
    position: 'absolute',
    left: SCREEN_WIDTH * 0.08,
    top: HEADER_TOP,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  logoText: {
    color: '#28324A',
    fontWeight: '900',
    fontSize: 36,
    fontStyle: 'italic',
  },

  logoTextO: {
    color: '#28324A',
    fontWeight: '900',
    fontSize: 36,
    fontStyle: 'italic',
  },

  logoDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EB6300',
    marginLeft: -2,
    marginTop: 2,
  },

  // Profile
  profileCircle: {
    position: 'absolute',
    right: SCREEN_WIDTH * 0.08,
    top: HEADER_TOP - 6,
    width: SCREEN_WIDTH * 0.14,
    height: SCREEN_WIDTH * 0.14,
    borderRadius: 999,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileIconHead: {
    width: SCREEN_WIDTH * 0.045,
    height: SCREEN_WIDTH * 0.045,
    borderRadius: 999,
    backgroundColor: '#9E9E9E',
    marginBottom: 2,
  },

  profileIconBody: {
    width: SCREEN_WIDTH * 0.07,
    height: SCREEN_WIDTH * 0.035,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    backgroundColor: '#9E9E9E',
  },

  // Title
  titulo: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.14,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#28324A',
    fontWeight: '900',
    fontSize: 24,
  },

  // List
  list: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: SCREEN_HEIGHT * 0.19,
    bottom: FOOTER_HEIGHT + BOTTOM_BAR_HEIGHT,
  },

  listContent: {
    paddingHorizontal: SCREEN_WIDTH * 0.08,
    paddingBottom: 20,
  },

  itemRow: {
    flexDirection: 'row',
    paddingVertical: SCREEN_HEIGHT * 0.02,
    position: 'relative',
  },

  itemLeft: {
    flex: 1,
    paddingRight: 12,
    justifyContent: 'center',
  },

  itemTitle: {
    color: '#28324A',
    fontWeight: '900',
    fontSize: 20,
    lineHeight: 26,
  },

  itemDesc: {
    marginTop: 8,
    color: '#6B7280',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
  },

  itemRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  itemImageContainer: {
    width: ITEM_IMAGE_SIZE,
    height: ITEM_IMAGE_SIZE,
    borderRadius: 25,
    overflow: 'hidden',
  },

  itemImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
  },

  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },

  divider: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: '#E5E5E5',
  },

  // Footer
  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: BOTTOM_BAR_HEIGHT + 15,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  footerCard: {
    width: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 35,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },

  pagarBtn: {
    width: SCREEN_WIDTH * 0.28,
    height: SCREEN_WIDTH * 0.28,
    borderRadius: 999,
    backgroundColor: '#EB6300',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pagarTxt: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: 1,
  },

  footerRight: {
    flex: 1,
    marginLeft: 14,
  },

  actionsRow: {
    flexDirection: 'row',
    backgroundColor: '#28324A',
    borderRadius: 25,
    marginBottom: 10,
    overflow: 'hidden',
  },

  actionPillLeft: {
    flex: 1,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionDivider: {
    width: 1,
    height: 35,
    backgroundColor: '#4A5568',
    alignSelf: 'center',
  },

  actionPillRight: {
    flex: 1,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionTxt: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
    lineHeight: 17,
    textAlign: 'center',
  },

  helperPill: {
    width: '100%',
    backgroundColor: '#C4C4C4',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  helperTxt: {
    color: '#28324A',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
  },

  // Bottom Navigation
  bottomNavContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: BOTTOM_BAR_HEIGHT + 40,
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: BOTTOM_BAR_HEIGHT,
    backgroundColor: '#28324A',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  navButtonsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: BOTTOM_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_WIDTH * 0.15,
  },

  navButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navCenterButton: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  // Pin/Location Icon
  pinIcon: {
    alignItems: 'center',
  },

  pinIconTop: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },

  pinIconPoint: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    marginTop: -2,
  },

  // Wallet Icon
  walletIcon: {
    width: 28,
    height: 22,
    justifyContent: 'flex-end',
  },

  walletBody: {
    width: 28,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#EB6300',
    borderWidth: 2,
    borderColor: '#EB6300',
  },

  walletFlap: {
    position: 'absolute',
    top: 0,
    left: 4,
    right: 4,
    height: 8,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: '#EB6300',
  },

  // Receipt/Document Icon
  receiptIcon: {
    width: 20,
    height: 26,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
  },

  receiptBody: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },

  receiptLine1: {
    width: 12,
    height: 2,
    backgroundColor: '#28324A',
    marginBottom: 4,
  },

  receiptLine2: {
    width: 12,
    height: 2,
    backgroundColor: '#28324A',
  },
})
