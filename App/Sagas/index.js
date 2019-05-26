import { takeLatest, all, takeEvery } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StoresTypes } from '../Redux/StoresRedux'
import { ProductTypes } from '../Redux/ProductRedux'
import { CartTypes } from '../Redux/CartRedux'

/* ------------- Sagas ------------- */

import { getStores } from './StoresSagas'
import { getProducts } from './ProductSagas'
import { addCart, removeCart } from './CartSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(StoresTypes.STORES_REQUEST, getStores, api),
    takeLatest(ProductTypes.PRODUCT_REQUEST, getProducts, api),
    takeEvery(CartTypes.CART_REQUEST, addCart),
    takeEvery(CartTypes.CART_REMOVE_REQUEST, removeCart)
  ])
}
