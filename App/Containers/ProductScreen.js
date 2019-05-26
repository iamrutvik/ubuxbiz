import React, { Component } from 'react'
import { FlatList, Text, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import CartActions from '../Redux/CartRedux'

// Styles
import styles from './Styles/ProductScreenStyle'
import { Body, Button, Container, Header, Icon, Left, ListItem, Right, Title, Toast, Thumbnail } from 'native-base'
import _ from 'lodash'
import { Colors, Metrics } from '../Themes'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ProductActions from '../Redux/ProductRedux'
import { BallIndicator } from 'react-native-indicators'
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'

type ProductScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptProducts: () => void,
  attemptAddProducts: () => void
};

class ProductScreen extends Component {

  props: ProductScreenProps;

  state: {
    fetching: boolean,
    payload: Object,
    error: string,
    cartFetching: boolean,
    cartPayload: Object,
    cartError: string,
    storeName: string,
    id: string,
    loading: boolean,
    bgColor: Object
  };

  constructor (props: ProductScreenProps) {
    super(props)

    this.state = {
      fetching: false,
      payload: null,
      error: null,
      storeName: null,
      id: null,
      loading: false,
      bgColor: Colors.coal,
      cartFetching: false,
      cartPayload: null,
      cartError: null
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!nextProps.fetching && prevState.loading) {
      if (nextProps.error) {
        Toast.show({
          text: nextProps.error,
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000
        })
        return {
          loading: false
        }
      } else {
        return {
          loading: false,
          payload: nextProps.payload
        }
      }
    } else if (!nextProps.cartFetching) {
      if (nextProps.cartError) {
        Toast.show({
          text: nextProps.cartError,
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000
        })
      } else {
        return {
          cartPayload: nextProps.cartPayload
        }
      }
    }
    return prevState
  }

  componentDidMount () {
    if (this.props.navigation.getParam('name') && this.props.navigation.getParam('id')) {
      this.setState({
        storeName: this.props.navigation.getParam('name'),
        id: this.props.navigation.getParam('id')
      })
      this.setState({ loading: true })
      this.props.attemptProducts(this.props.navigation.getParam('id'))
    }
  }

  renderForeGround = () => {
    return (
      <View style={styles.foregroundView}>
        <Text style={styles.storeName}>{this.state.storeName}</Text>
        <Text style={styles.snowText}>{this.state.payload ? this.state.payload.description : null}</Text>
        <Text style={styles.snowText}>{this.state.payload ? this.state.payload.suburb : null}</Text>
        <View style={styles.contactView}>
          <Icon name='mail' style={{fontSize: 20, marginRight: 5, color: Colors.snow}} />
          <Text style={styles.snowText}>{this.state.payload ? this.state.payload.ownerContactDetails.emailAddress : null}</Text>
          <Icon name='phone-portrait' style={{fontSize: 20, marginLeft: 10, marginRight: 5, color: Colors.snow}} />
          <Text style={styles.snowText}>{this.state.payload ? this.state.payload.ownerContactDetails.mobileNumber : null}</Text>
        </View>
      </View>
    )
  }

  renderItem = item => {
    return (
      <ListItem onPress={() => this.onPressStore(item)} thumbnail>
        <Left>
          <Thumbnail square source={{ uri: item.imageUrl }} />
        </Left>
        <Body style={{flexDirection: 'column'}}>
          <Text style={styles.boldText}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.amountText}>${item.priceCash}</Text>
        </Body>
        <Right>
          <Icon name='add-circle' style={{fontSize: 40}} />
        </Right>
      </ListItem>
    )
  }

  onPressStore = item => {
    const { cartPayload } = this.state
    let jsCartPayload = immutablePersistenceTransform.in(cartPayload)
    let jsItem = immutablePersistenceTransform.in(item)
    if (jsCartPayload && jsCartPayload.length > 0) {
      var foundIndex = jsCartPayload.findIndex(x => x._id == jsItem._id)
      if (foundIndex >= 0) {
        jsCartPayload[foundIndex].quantity = jsCartPayload[foundIndex].quantity + 1
      } else {
        jsItem.quantity = 1
        jsCartPayload.push(jsItem)
      }
    } else {
      jsItem.quantity = 1
      jsCartPayload.push(jsItem)
    }
    this.props.attemptAddProducts(jsCartPayload)
  }

  renderEmptyItem = () => {
    return (
      <View style={styles.emptyView}>
        <Icon name='sad' style={styles.emptyIcon} />
        <Text style={styles.emptyText}>No Products Available</Text>
      </View>
    )
  }

  keyExtractor = (item, index) => 'key-' + index;

  renderList = () => {
    return (
      <FlatList
        data={this.state.payload ? this.state.payload.products : null}
        keyExtractor={(item, index) => this.keyExtractor(item, index)}
        renderItem={({item}) => this.renderItem(item)}
        ListEmptyComponent={() => this.renderEmptyItem()}
      />
    )
  }

  calculateProducts = () => {
    let total = 0
    _.forEach(this.state.cartPayload, (item) => {
      total = total + item.quantity
    })
    return total
  }

  render () {
    return (
      <Container>
        <ParallaxScrollView
          backgroundColor={Colors.fire}
          fadeOutForeground
          contentBackgroundColor={Colors.transparent}
          parallaxHeaderHeight={200}
          stickyHeaderHeight={90}
          onChangeHeaderVisibility={(status) => !status ? this.setState({bgColor: Colors.snow}) : this.setState({bgColor: Colors.coal})}
          renderStickyHeader ={() => (
            <Header noLeft transparent>
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name='arrow-back' style={styles.snowText}/>
                </Button>
              </Left>
              <Body>
                <Title style={styles.snowText}>{this.state.storeName}</Title>
              </Body>
              <Right />
            </Header>
          )}
          renderForeground={() => this.renderForeGround()}>
          <View style={styles.productTitle}>
            <Text style={[styles.storeName, {color: this.state.bgColor}]}>Products</Text>
            <Text style={[styles.storeProductDesc, {color: this.state.bgColor}]}>Choose form the variety of products</Text>
          </View>
          { this.state.loading ? <BallIndicator color={Colors.fire} size={30} /> : this.renderList() }
        </ParallaxScrollView>
        <TouchableHighlight style={styles.cartView} onPress={() => this.props.navigation.navigate('CartScreen')}>
          <Icon name='cart' style={{color: Colors.snow}} />
        </TouchableHighlight>
        {
          this.calculateProducts() > 0 ? <TouchableHighlight style={styles.productCount} onPress={() => this.props.navigation.navigate('CartScreen')}>
            <Text style={styles.storeProductDesc}>{this.calculateProducts()}</Text>
          </TouchableHighlight>: null
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.products.fetching,
    payload: state.products.payload,
    error: state.products.error,
    cartFetching: state.cart.fetching,
    cartPayload: state.cart.payload,
    cartError: state.cart.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptProducts: (id) => dispatch(ProductActions.productRequest(id)),
    attemptAddProducts: (item) => dispatch(CartActions.cartRequest(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen)
