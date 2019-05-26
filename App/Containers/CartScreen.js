import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, FlatList, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CartScreenStyle'
import { Colors } from '../Themes'
import { Body, Button, Container, Header, Icon, Left, ListItem, Right, Thumbnail, Title, Toast } from 'native-base'
import { BallIndicator } from 'react-native-indicators'
import CartActions from '../Redux/CartRedux'
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'

type CartScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptRemoveProducts: () => void
};

class CartScreen extends Component {

  props: CartScreenProps;

  state: {
    fetching: boolean,
    payload: Object,
    error: string,
  };

  constructor (props: CartScreenProps) {
    super(props)

    this.state = {
      fetching: false,
      payload: null,
      error: null
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!nextProps.fetching) {
      if (nextProps.error) {
        Toast.show({
          text: nextProps.error,
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000
        })
      } else {
        return {
          payload: nextProps.payload
        }
      }
    }
    return prevState
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

  renderItem = item => {
    return (
      <ListItem onPress={() => this.onPressStore(item)} thumbnail>
        <Left>
          <Thumbnail square source={{ uri: item.imageUrl }} />
          <View style={styles.productCount}>
            <Text style={styles.storeProductDesc}>{item.quantity}</Text>
          </View>
        </Left>
        <Body style={{flexDirection: 'column'}}>
          <Text style={styles.boldText}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.amountText}>${item.priceCash * item.quantity}</Text>
        </Body>
        <Right>
          <Icon name='remove-circle' style={{fontSize: 40}} />
        </Right>
      </ListItem>
    )
  }

  onPressStore = item => {
    const { payload } = this.state
    let jsCartPayload = immutablePersistenceTransform.in(payload)
    let jsItem = immutablePersistenceTransform.in(item)
    var foundIndex = jsCartPayload.findIndex(x => x._id == jsItem._id)
    if (foundIndex >= 0) {
      jsCartPayload[foundIndex].quantity = jsCartPayload[foundIndex].quantity - 1
      if (jsCartPayload[foundIndex].quantity <= 0) {
        jsCartPayload.splice(foundIndex, 1)
      }
    }
    this.props.attemptRemoveProducts(jsCartPayload)
  }

  renderList = () => {
    return (
      <FlatList
        data={this.state.payload}
        keyExtractor={(item, index) => this.keyExtractor(item, index)}
        renderItem={({item}) => this.renderItem(item)}
        ListEmptyComponent={() => this.renderEmptyItem()}
      />
    )
  }

  render () {
    return (
      <Container>
        <Header noLeft transparent>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' style={styles.coalText} />
            </Button>
          </Left>
          <Body>
            <Title>My Cart</Title>
          </Body>
          <Right />
        </Header>
        { this.renderList() }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.cart.fetching,
    error: state.cart.error,
    payload: state.cart.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptRemoveProducts: (item) => dispatch(CartActions.cartRemoveRequest(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)
