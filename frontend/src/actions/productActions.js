import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

const productListRequest = () => {
  return { type: PRODUCT_LIST_REQUEST }
}

const productListSuccess = (products) => {
  return { type: PRODUCT_LIST_SUCCESS, payload: products }
}

const productListFail = (error) => {
  return {
    type: PRODUCT_LIST_FAIL,
    payload: error,
  }
}

export const listProducts = () => async (dispatch) => {
  try {
    dispatch(productListRequest())
    const { data } = await axios.get('/api/products')
    dispatch(productListSuccess(data))
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch(productListFail(err))
  }
}

export const detailsProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err })
  }
}
