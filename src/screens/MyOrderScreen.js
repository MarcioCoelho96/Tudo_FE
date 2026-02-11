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

  const [footerHeight, setFooterHeight] = useState(0)

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

  // Assets - using placeholder paths (update with your actual assets)
  // const IMG_LOGO = require('../../assets/home38/logo.png')
  // const IMG_PROFILE = require('../../assets/home38/icons/user.png')

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

      {/* Logo placeholder */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>tudo</Text>
        <View style={styles.logoDot} />
      </View>

      {/* Profile button */}
      <TouchableOpacity
        style={styles.profileCircle}
        onPress={() => console.log('Navigate to profile')}
      >
        <View style={styles.profileIconPlaceholder}>
          <View style={styles.profileIconHead} />
          <View style={styles.profileIconBody} />
        </View>
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
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: footerHeight + SCREEN_HEIGHT * 0.12 },
        ]}
      />

      {/* Footer */}
      <View
        style={styles.footerWrap}
        onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
      >
        <View style={styles.footerCard}>
          {/* Pay button */}
          <TouchableOpacity style={styles.pagarBtn} onPress={pagar}>
            <Text style={styles.pagarTxt}>PAGAR</Text>
          </TouchableOpacity>

          {/* Right side */}
          <View style={styles.footerRight}>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionPill} onPress={pedirMais}>
                <Text style={styles.actionTxt}>PEDIR{'\n'}MAIS</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionPill} onPress={dividirConta}>
                <Text style={styles.actionTxt}>DIVIDIR{'\n'}CONTA</Text>
              </TouchableOpacity>
            </View>

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

      {/* Bottom navy bar */}
      <View style={styles.bottomBar} />

      {/* Bottom white notch */}
      <View style={styles.bottomNotch} />
    </View>
  )
}

const HEADER_TOP = SCREEN_HEIGHT * 0.05
const TOP_NAV_HEIGHT = SCREEN_HEIGHT * 0.16
const FOOTER_BOTTOM = SCREEN_HEIGHT * 0.12
const ITEM_IMAGE_SIZE = SCREEN_WIDTH * 0.28

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
    bottom: SCREEN_HEIGHT * 0.10,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: SCREEN_HEIGHT * 0.06,
    borderBottomRightRadius: SCREEN_HEIGHT * 0.06,
  },

  topRightNavy: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: SCREEN_WIDTH * 0.55,
    height: TOP_NAV_HEIGHT,
    backgroundColor: '#28324A',
    borderBottomLeftRadius: SCREEN_HEIGHT * 0.20,
  },

  // Logo (placeholder using text)
  logoContainer: {
    position: 'absolute',
    left: SCREEN_WIDTH * 0.08,
    top: HEADER_TOP,
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoText: {
    color: '#28324A',
    fontWeight: '900',
    fontSize: 32,
    fontStyle: 'italic',
  },

  logoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EB6300',
    marginLeft: 2,
    marginTop: -12,
  },

  profileCircle: {
    position: 'absolute',
    right: SCREEN_WIDTH * 0.08,
    top: HEADER_TOP - 4,
    width: SCREEN_WIDTH * 0.14,
    height: SCREEN_WIDTH * 0.14,
    borderRadius: 999,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileIconPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileIconHead: {
    width: SCREEN_WIDTH * 0.05,
    height: SCREEN_WIDTH * 0.05,
    borderRadius: 999,
    backgroundColor: '#9E9E9E',
    marginBottom: 2,
  },

  profileIconBody: {
    width: SCREEN_WIDTH * 0.08,
    height: SCREEN_WIDTH * 0.04,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    backgroundColor: '#9E9E9E',
  },

  titulo: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.15,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#28324A',
    fontWeight: '900',
    fontSize: 22,
  },

  list: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: SCREEN_HEIGHT * 0.20,
    bottom: FOOTER_BOTTOM,
  },

  listContent: {
    paddingHorizontal: SCREEN_WIDTH * 0.08,
    paddingBottom: SCREEN_HEIGHT * 0.02,
  },

  itemRow: {
    flexDirection: 'row',
    paddingTop: SCREEN_HEIGHT * 0.022,
    paddingBottom: SCREEN_HEIGHT * 0.022,
  },

  itemLeft: {
    flex: 1,
    paddingRight: 12,
  },

  itemTitle: {
    color: '#28324A',
    fontWeight: '900',
    fontSize: 20,
    lineHeight: 26,
  },

  itemDesc: {
    marginTop: 8,
    color: '#28324A',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.9,
  },

  itemRight: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  itemImageContainer: {
    width: ITEM_IMAGE_SIZE,
    height: ITEM_IMAGE_SIZE,
    borderRadius: 30,
    overflow: 'hidden',
  },

  itemImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 30,
  },

  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },

  divider: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: '#E6E6E6',
  },

  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: FOOTER_BOTTOM,
    alignItems: 'center',
  },

  footerCard: {
    width: SCREEN_WIDTH * 0.88,
    backgroundColor: '#D9D9D9',
    borderRadius: 35,
    paddingVertical: SCREEN_HEIGHT * 0.02,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 7,
  },

  pagarBtn: {
    width: SCREEN_WIDTH * 0.26,
    height: SCREEN_WIDTH * 0.26,
    borderRadius: 999,
    backgroundColor: '#EB6300',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pagarTxt: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 20,
    letterSpacing: 1,
  },

  footerRight: {
    flex: 1,
    marginLeft: SCREEN_WIDTH * 0.04,
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SCREEN_HEIGHT * 0.012,
  },

  actionPill: {
    width: SCREEN_WIDTH * 0.22,
    height: SCREEN_HEIGHT * 0.065,
    backgroundColor: '#28324A',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionTxt: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },

  helperPill: {
    width: '100%',
    backgroundColor: '#CFCFCF',
    borderRadius: 25,
    paddingVertical: SCREEN_HEIGHT * 0.012,
    paddingHorizontal: SCREEN_WIDTH * 0.035,
  },

  helperTxt: {
    color: '#28324A',
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 16,
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT * 0.10,
    backgroundColor: '#28324A',
    borderTopLeftRadius: SCREEN_HEIGHT * 0.06,
    borderTopRightRadius: SCREEN_HEIGHT * 0.06,
  },

  bottomNotch: {
    position: 'absolute',
    left: SCREEN_WIDTH * 0.41,
    bottom: SCREEN_HEIGHT * 0.062,
    width: SCREEN_WIDTH * 0.18,
    height: SCREEN_WIDTH * 0.18,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
})
