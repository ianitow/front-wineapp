/* eslint-disable object-curly-newline */
import ProductApi from 'src/api/products';

import { GET_PRODUCTS_REQUEST_SUCCESS } from './types';

export function getProductsRequest({ commit }) {
  return new Promise((resolve, reject) => {
    ProductApi.get({})
      .then(data => resolve(commit(GET_PRODUCTS_REQUEST_SUCCESS, { products: data })))
      .catch(err => {
        this.$router.push('/login');
        reject(err);
      });
  });
}
// eslint-disable-next-line no-unused-vars
export function getProductRequest(state, { id }) {
  return new Promise((resolve, reject) => {
    ProductApi.get({ id })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function editProductRequest({ dispatch }, { id, name, quantity, size, price, notes }) {
  return new Promise((resolve, reject) => {
    ProductApi.put({
      id,
      name,
      quantity,
      size,
      price,
      notes,
    })
      .then(() => {
        resolve(dispatch('getProductsRequest'));
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function deleteProductRequest({ dispatch }, { id }) {
  return new Promise((resolve, reject) => {
    ProductApi.delete({ id })
      .then(() => resolve(dispatch('getProductsRequest')))
      .catch(err => reject(err));
  });
}
// eslint-disable-next-line object-curly-newline
export function createProductRequest({ dispatch }, { name, quantity, size, price, notes }) {
  return new Promise((resolve, reject) => {
    ProductApi.post({
      name,
      quantity,
      size,
      price,
      notes,
    })
      .then(() => resolve(dispatch('getProductsRequest')))
      .catch(err => reject(err));
  });
}
