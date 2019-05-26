import { createReducer, createActions } from 'reduxsauce'
import _ from  'lodash'
import Immutable from 'seamless-immutable'
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cartRequest: ['item'],
  cartRemoveRequest: ['item'],
  cartSuccess: ['payload'],
  cartFailure: ['error']
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: [],
  error: null
})

/* ------------- Selectors ------------- */

export const CartSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, error: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload: payload })
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({ fetching: false, error: error, payload: null })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CART_REQUEST]: request,
  [Types.CART_REMOVE_REQUEST]: request,
  [Types.CART_SUCCESS]: success,
  [Types.CART_FAILURE]: failure
})
