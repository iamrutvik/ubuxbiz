import { createStackNavigator, createAppContainer } from 'react-navigation'
import CartScreen from '../Containers/CartScreen'
import ProductScreen from '../Containers/ProductScreen'
import StoresScreen from '../Containers/StoresScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  CartScreen: { screen: CartScreen },
  ProductScreen: { screen: ProductScreen },
  StoresScreen: { screen: StoresScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'StoresScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
