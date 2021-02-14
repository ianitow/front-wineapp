/* eslint-disable object-curly-newline */
import CustomerApi from 'src/api/customers';

import { GET_CUSTOMERS_REQUEST_SUCCESS } from './types';

export function getCustomersRequest({ commit }) {
  return new Promise((resolve, reject) => {
    CustomerApi.get({})
      .then(data => resolve(commit(GET_CUSTOMERS_REQUEST_SUCCESS, { customers: data })))
      .catch(err => {
        this.$router.push('/login');
        reject(err);
      });
  });
}
export function getCustomerRequest(state, { id }) {
  return new Promise((resolve, reject) => {
    CustomerApi.get({ id })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function editCustomerRequest({ dispatch }, { id, name, address, number_phone }) {
  return new Promise((resolve, reject) => {
    CustomerApi.put({
      id,
      name,
      address,
      number_phone,
    })
      .then(() => {
        resolve(dispatch('getCustomersRequest'));
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function deleteCustomerRequest({ dispatch }, { id }) {
  return new Promise((resolve, reject) => {
    CustomerApi.delete({ id })
      .then(() => resolve(dispatch('getCustomersRequest')))

      .catch(err => reject(err));
  });
}
// eslint-disable-next-line object-curly-newline
export function createCustomerRequest({ dispatch }, { name, address, number_phone }) {
  return new Promise((resolve, reject) => {
    CustomerApi.post({
      name,
      address,
      number_phone,
    })
      .then(() => resolve(dispatch('getCustomersRequest')))
      .catch(err => reject(err));
  });
}
