/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import ProductActions from '../Redux/ProductRedux'
// import { ProductSelectors } from '../Redux/ProductRedux'

export function * getProducts (api, action) {
  const { id } = action
  // get current data from Store
  // const currentData = yield select(ProductSelectors.getData)
  // make the call to the api
  const storeResponse = yield call(api.getStoreDetails, id)
  const productResponse = yield call(api.getStoreProducts, id)

  // success?
  if (storeResponse.ok && productResponse.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    let response = storeResponse.data.store
    response.products = productResponse.data.products
    console.log(response)
    yield put(ProductActions.productSuccess(response))
  } else {
    switch (storeResponse.problem) {
      case 'NETWORK_ERROR':
        yield put(ProductActions.productFailure('Network Connection is not available'))
        break
      case 'CONNECTION_ERROR':
        yield put(ProductActions.productFailure('Server is not available'))
        break
      default:
        yield put(ProductActions.productFailure('Something went wrong'))
        break
    }
  }
}
