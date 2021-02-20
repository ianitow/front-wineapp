/* eslint-disable object-curly-newline */
import { api } from '../boot/axios';

export function get({ id = '' }) {
  return new Promise((resolve, reject) => {
    api
      .get(`/orders/${id}`)
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
export function post({ user_id, customer_id, products }) {
  return new Promise((resolve, reject) => {
    api
      .post('/orders', {
        user_id,
        customer_id,
        products,
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

export function patch({ id, status }) {
  return new Promise((resolve, reject) => {
    api
      .patch(`/orders/${id}`, {
        status,
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
  patch,
};
