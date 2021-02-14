/* eslint-disable object-curly-newline */
import { api } from '../boot/axios';

export function get({ id = '' }) {
  return new Promise((resolve, reject) => {
    api
      .get(`/customers/${id}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(({ message, response }) => {
        if (!response) {
          reject({
            type: 'UNKNOWN',
            message,
          });
        }

        reject(response.data);
      });
  });
}

// eslint-disable-next-line object-curly-newline
export function post({ name, number_phone, address }) {
  return new Promise((resolve, reject) => {
    api
      .post('/customers', {
        name,
        number_phone,
        address,
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch(({ message, response }) => {
        if (!response) {
          reject({
            type: 'UNKNOWN',
            message,
          });
        }
        reject(response.data);
      });
  });
}

export function exclude({ id }) {
  return new Promise((resolve, reject) => {
    api
      .delete(`/customers/${id}`)
      .then(({ status }) => {
        resolve(status);
      })
      .catch(({ message, response }) => {
        if (!response) {
          reject({
            type: 'UNKNOWN',
            message,
          });
        }

        reject(response.data);
      });
  });
}

export function put({ id, name, number_phone, address }) {
  return new Promise((resolve, reject) => {
    api
      .put(`/customers/${id}`, {
        name,
        number_phone,
        address,
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch(({ message, response }) => {
        if (!response) {
          reject({
            type: 'UNKNOWN',
            message,
          });
        }

        reject(response.data);
      });
  });
}
export default {
  get,
  post,
  delete: exclude,
  put,
};
