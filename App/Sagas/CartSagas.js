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
import CartActions from '../Redux/CartRedux'
// import { CartSelectors } from '../Redux/CartRedux'

export function * addCart (action) {
  const { item } = action
  if (item) {
    yield put(CartActions.cartSuccess(item))
  } else {
    yield put(CartActions.cartFailure('Cant add product'))
  }
}

export function * removeCart (action) {
  const { item } = action
  if (item) {
    yield put(CartActions.cartSuccess(item))
  } else {
    yield put(CartActions.cartFailure('Cant remove product'))
  }
}
