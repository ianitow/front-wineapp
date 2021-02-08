/* eslint-disable object-curly-newline */
import { api } from '../boot/axios';

export function get({ id = '' }) {
  return new Promise((resolve, reject) => {
    api
      .get(`/products/${id}`)
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
export function post({ name, quantity, size, price, notes }) {
  return new Promise((resolve, reject) => {
    api
      .post('/products', {
        name,
        quantity,
        size,
        price,
        notes,
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
      .delete(`/products/${id}`)
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

export function put({ id, name, quantity, size, price, notes }) {
  return new Promise((resolve, reject) => {
    api
      .put(`/products/${id}`, {
        name,
        quantity,
        size,
        price,
        notes,
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
