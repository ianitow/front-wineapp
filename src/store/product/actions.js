/* eslint-disable comma-dangle */
import ProductApi from 'src/api/products';
import { GET_PRODUCTS_REQUEST_SUCCESS } from './types';

export function getProductsRequest({ commit }) {
  return new Promise((resolve, reject) => {
    ProductApi.get()
      .then(data => resolve(commit(GET_PRODUCTS_REQUEST_SUCCESS, { products: data })))
      .catch(err => reject(err));
  });
}

export function deleteProductRequest({ dispatch }, { id }) {
  return new Promise((resolve, reject) => {
    ProductApi.delete({ id })
      .then(() => resolve(dispatch('getProductsRequest')))
      .catch(err => reject(err));
  });
}
