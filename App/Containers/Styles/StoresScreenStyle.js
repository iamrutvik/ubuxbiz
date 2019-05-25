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
  searchItem: {
    marginHorizontal: Metrics.baseMargin,
    borderRadius: Metrics.doubleBaseMargin,
    backgroundColor: Colors.steel,
    paddingHorizontal: Metrics.baseMargin,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
