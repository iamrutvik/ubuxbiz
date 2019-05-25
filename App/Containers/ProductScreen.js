import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProductScreenStyle'
import { Body, Button, Container, Header, Icon, Left, ListItem, Right, Title, Toast, Thumbnail } from 'native-base'
import _ from 'lodash'
import { Colors, Metrics } from '../Themes'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ProductActions from '../Redux/ProductRedux'
import { BallIndicator } from 'react-native-indicators'

type ProductScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptProducts: () => void
};

class ProductScreen extends Component {

  props: ProductScreenProps;

  state: {
    fetching: boolean,
    payload: Object,
    error: string,
    storeName: string,
    id: string,
    loading: boolean,
    bgColor: Object
  };

  constructor (props: StoresScreenProps) {
    super(props)

    this.state = {
      fetching: false,
      payload: null,
      error: null,
      storeName: null,
      id: null,
      loading: false,
      bgColor: Colors.coal
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!nextProps.fetching && prevState.loading && nextProps.payload) {
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
    //call store and product APIS
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
          <Text>{item.name}</Text>
          <Text style={{fontSize: 15, marginRight: 5}}>${item.priceCash}</Text>
        </Body>
        <Right>
          <Icon name='add-circle' style={{fontSize: 40}} />
        </Right>
      </ListItem>
    )
  }

  onPressStore = item => {
    this.props.navigation.navigate('ProductScreen', {id: item.storeId ? item.storeId : item.ownerId, name: item.tradingName.toUpperCase() })
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
    console.log(this.state.payload)
    return (
      <FlatList
        data={this.state.payload ? this.state.payload.products : null}
        keyExtractor={(item, index) => this.keyExtractor(item, index)}
        renderItem={({item}) => this.renderItem(item)}
        ListEmptyComponent={() => this.renderEmptyItem()}
      />
    )
  }

  render () {
    return (
      <Container>
        <ParallaxScrollView
          backgroundColor={Colors.fire}
          fadeOutForeground
          contentBackgroundColor={Colors.transparent}
          parallaxHeaderHeight={200}
          stickyHeaderHeight={80}
          onChangeHeaderVisibility={(status) => !status ? this.setState({bgColor: Colors.snow}) : this.setState({bgColor: Colors.coal})}
          renderStickyHeader = { () => (
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
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.products.fetching,
    payload: state.products.payload,
    error: state.products.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptProducts: (id) => dispatch(ProductActions.productRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen)
