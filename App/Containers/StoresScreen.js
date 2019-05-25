import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, View } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import StoresActions from '../Redux/StoresRedux'
import {Container, Header, Left, Body, Right, Button, Icon, Title, Toast, ListItem, Text, Fab, Item, Input} from 'native-base'
// Styles
import styles from './Styles/StoresScreenStyle'
import { BallIndicator } from 'react-native-indicators'
import { Colors } from '../Themes'
import _ from 'lodash'
import API from '../Services/Api'
const api = API.create()

type StoresScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptStores: () => void
};

class StoresScreen extends Component {
  props: StoresScreenProps;

  state: {
    fetching: boolean,
    payload: Object,
    error: string,
    selectedFilter: string,
    searchKeyword: string,
    loading: boolean,
    active: boolean,
    originalData: Object,
    searchLoading: boolean
  };

  constructor (props: StoresScreenProps) {
    super(props)

    this.state = {
      fetching: false,
      payload: null,
      error: null,
      selectedFilter: null,
      searchKeyword: null,
      loading: false,
      active: false,
      originalData: null,
      searchLoading: false
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
        let data = _.dropWhile(nextProps.payload, function(o) { return !o.tradingName })
        return {
          loading: false,
          payload: data,
          originalData: data
        }
      }
    }
    return prevState
  }

  componentDidMount () {
    this.setState({loading: true}, () => this.props.attemptStores())
  }

  renderItem = item => {
    return (
      <ListItem onPress={() => this.onPressStore(item)}>
        <Left>
          <Icon type='Octicons' name={item.status === 'verified' ? 'verified' : 'unverified'}
            style={{color: item.status === 'verified' ? Colors.green : Colors.fire, marginRight: 10}}
          />
          <Text>{item.tradingName.toUpperCase()}</Text>
        </Left>
        <Right>
          <Icon name='arrow-forward' />
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
        <Text style={styles.emptyText}>No Stores Available</Text>
      </View>
    )
  }

  keyExtractor = (item, index) => 'key-' + index;

  onKeywordChange = value => {
    this.setState({ searchKeyword: value })
    if (value.length >= 3) {
      this.handleSearch()
    }
  }

  handleSearch = async () => {
    if (this.state.searchKeyword.length >= 3) {
      this.setState({ searchLoading: true })
      const response = await api.searchStores(this.state.searchKeyword)
      console.log(response)
      if (response.status === 200 && response.ok) {
        this.setState({ searchLoading: false, payload: response.data.stores })
      } else if (response.status === 500 && !response.ok) {
        this.setState({ searchLoading: false }, () => {
          Toast.show({
            text: response.data.message,
            buttonText: 'Okay',
            type: 'danger',
            duration: 3000
          })
        })
      } else {
        this.setState({searchLoading: false})
        switch (response.problem) {
          case 'NETWORK_ERROR':
            Toast.show({
              text: 'Network Connection is not available',
              buttonText: 'Okay',
              type: 'danger',
              duration: 3000
            })
            break
          case 'CONNECTION_ERROR':
            Toast.show({
              text: 'Server is not available',
              buttonText: 'Okay',
              type: 'danger',
              duration: 3000
            })
            break
          default:
            Toast.show({
              text: 'Something went wrong',
              buttonText: 'Okay',
              type: 'danger',
              duration: 3000
            })
            break
        }
      }
    }
  }

  renderHeaderItem = () => {
    return (
      <View style={styles.searchItem}>
        <Icon name='ios-search' style={{fontSize: 20}} />
        <Input
          placeholder='Search'
          value={this.state.searchKeyword}
          onChangeText={this.onKeywordChange}
          returnKeyType='search'
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          onSubmitEditing={(e) => this.handleSearch(e)}
        />
        {
          this.state.searchLoading ? <BallIndicator color={Colors.fire} size={20} style={{justifyContent: 'flex-end', alignItems: 'flex-end'}} /> : <Icon name='close' onPress={() => {
            this.setState({ searchKeyword: null, payload: this.state.originalData, searchLoading: false })
          }} />
        }
      </View>
    )
  }

  renderList = () => {
    return (
      <FlatList
        data={this.state.payload}
        keyExtractor={(item, index) => this.keyExtractor(item, index)}
        renderItem={({item}) => this.renderItem(item)}
        ListEmptyComponent={() => this.renderEmptyItem()}
        ListHeaderComponent={this.renderHeaderItem}
      />
    )
  }

  filterStores = (status) => {
    let filteredData = _.filter(this.state.payload, function(o) { return o.status === status })
    this.setState({
      payload: filteredData,
      active: !this.state.active
    })
  }

  render () {
    return (
      <Container>
        <Header noLeft transparent>
          <Left />
          <Body>
            <Title>Stores</Title>
          </Body>
          <Right />
        </Header>
        { this.state.loading ? <BallIndicator color={Colors.fire} size={50} /> : this.renderList() }
        <Fab
          active={this.state.active}
          direction='up'
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position='bottomRight'
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon type='FontAwesome' name='filter' />
          <Button style={{ backgroundColor: Colors.green }} onPress={() => this.filterStores('verified')}>
            <Icon type='Octicons' name='verified' style={{fontSize: 30}} />
          </Button>
          <Button style={{ backgroundColor: Colors.fire }} onPress={() => this.filterStores('pending')}>
            <Icon type='Octicons' name='unverified' style={{fontSize: 30}} />
          </Button>
          <Button style={{ backgroundColor: Colors.fire }} onPress={() => this.setState({payload: this.state.originalData, active: !this.state.active})}>
            <Icon type='MaterialIcons' name='refresh' style={{fontSize: 30}} />
          </Button>
        </Fab>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.stores.fetching,
    error: state.stores.error,
    payload: state.stores.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptStores: () => dispatch(StoresActions.storesRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoresScreen)
