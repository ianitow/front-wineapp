/* eslint-disable comma-dangle */
import { getProducts } from 'src/api/products';
import { GET_PRODUCTS_REQUEST } from './types';

export function productsRequest(context) {
  return new Promise((resolve, reject) => {
    getProducts()
      .then(data => {
        resolve(context.commit(GET_PRODUCTS_REQUEST, { products: data }));
      })
      .catch(() => {
        reject({
          error: true,
        });
      });
  });
}
