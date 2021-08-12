import {
  api,
} from '../boot/axios';

export const setHeaderInterceptorInAxios = token => {
  api.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return token;
};

export function login(email, password) {
  return new Promise((resolve, reject) => {
    api
      .post('/users/token', {
        password, email,
      })
      .then(({
        data,
      }) => {
        resolve(setHeaderInterceptorInAxios(data.authorization));
      })
      .catch(({
        response,
      }) => {
        if (!response) {
          reject({
            type: 'UNKNOWN',
          });
          return;
        }
        reject(response.data);
      });
  });
}
export function register(name, email, password, address, numberPhone) {
  return new Promise((resolve, reject) => {
    api
      .post('/users', {
        name,
        password,
        email,
        address,
        number_phone: numberPhone,
      })
      .then(() => {
        resolve(true);
      })
      .catch(({
        response,
      }) => {
        if (!response) {
          reject({
            type: 'UNKNOWN',
          });
          return;
        }
        reject(response.data);
      });
  });
}
export default {
  login, register,
};
