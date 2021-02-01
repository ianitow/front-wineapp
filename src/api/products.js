import { api } from '../boot/axios';

export function getProducts() {
  return new Promise((resolve, reject) => {
    api
      .get('/products')
      .then(({ data }) => {
        resolve(data);
      })
      .catch(({ response }) => {
        if (!response) {
          reject({ type: 'UNKNOWN' });
        }
      });
  });
}
export default { getProducts };
