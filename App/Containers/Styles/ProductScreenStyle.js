import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  foregroundView: {
    height: 200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  storeName: {
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  storeProductDesc: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  contactView: {
    flexDirection: 'row'
  },
  snowText: {
    color: Colors.snow
  },
  productTitle: {
    marginLeft: Metrics.baseMargin,
    marginVertical: Metrics.baseMargin + 5
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: (Metrics.screenHeight / 2) - 180
  },
  emptyIcon: {
    fontSize: 150,
    color: Colors.steel
  },
  emptyText: {
    fontSize: Fonts.size.h3,
    color: Colors.steel
  },
})
