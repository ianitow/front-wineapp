/* eslint-disable object-curly-newline */
import OrderApi from 'src/api/orders';

import { GET_ORDERS_REQUEST_SUCCESS } from './types';

export function getOrdersRequest({ commit }) {
  return new Promise((resolve, reject) => {
    OrderApi.get({})

      .then(data => {
        resolve(commit(GET_ORDERS_REQUEST_SUCCESS, { orders: data }));
      })
      .catch(err => {
        this.$router.push('/login');
        reject(err);
      });
  });
}
export function getOrderRequest(state, { id }) {
  return new Promise((resolve, reject) => {
    OrderApi.get({ id })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function patchStatusOrderRequest({ dispatch }, { id, status }) {
  return new Promise((resolve, reject) => {
    OrderApi.patch({
      id,
      status,
    })
      .then(() => {
        resolve(dispatch('getOrdersRequest'));
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function editOrderRequest({ dispatch }, { id, status, notes }) {
  return new Promise((resolve, reject) => {
    OrderApi.put({
      id,
      status,
      notes,
    })
      .then(() => {
        resolve(dispatch('getOrdersRequest'));
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function deleteOrderRequest({ dispatch }, { id }) {
  return new Promise((resolve, reject) => {
    OrderApi.delete({ id })
      .then(() => {
        return resolve(dispatch('getOrdersRequest'));
      })

      .catch(err => {
        return reject(err);
      });
  });
}
// eslint-disable-next-line object-curly-newline
export function createOrderRequest({ dispatch }, { customer_id, products, notes }) {
  return new Promise((resolve, reject) => {
    console.log(products);
    OrderApi.post({
      customer_id,
      products,
      notes,
    })
      .then(() => {
        return resolve(dispatch('getOrdersRequest'));
      })
      .catch(err => {
        return reject(err);
      });
  });
}
