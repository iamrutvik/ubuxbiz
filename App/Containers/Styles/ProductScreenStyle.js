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
    marginTop: ((Metrics.screenHeight - 300) / 2) - 180
  },
  emptyIcon: {
    fontSize: 150,
    color: Colors.steel
  },
  emptyText: {
    fontSize: Fonts.size.h3,
    color: Colors.steel
  },
  cartView: {
    marginHorizontal: Metrics.doubleBaseMargin,
    position: 'absolute',
    bottom: Metrics.doubleBaseMargin,
    left: 0,
    backgroundColor: Colors.fire,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    width: 56,
    height: 56,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 28
  },
  productCount: {
    marginHorizontal: Metrics.doubleBaseMargin,
    position: 'absolute',
    bottom: 65,
    left: 25,
    backgroundColor: Colors.fire,
    width: 30,
    height: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15
  },
  boldText: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.bold
  },
  amountText: {
    color: Colors.fire,
    fontFamily: Fonts.type.bold
  }
})
