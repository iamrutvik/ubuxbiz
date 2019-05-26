import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
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
  coalText: {
    color: Colors.coal
  },
  boldText: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.bold
  },
  amountText: {
    color: Colors.fire,
    fontFamily: Fonts.type.bold
  },
  productCount: {
    marginHorizontal: Metrics.doubleBaseMargin,
    position: 'absolute',
    bottom: 45,
    left: 20,
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
  storeProductDesc: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  }
})
