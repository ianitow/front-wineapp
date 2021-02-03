import { api } from '../boot/axios';

export function login(email, password) {
  return new Promise((resolve, reject) => {
    api
      .post('/users/token', { password, email })
      .then(({ data }) => {
        resolve(data.authorization);
      })
      .catch(({ response }) => {
        if (!response) {
          reject({ type: 'UNKNOWN' });
          return;
        }
        switch (response.status) {
          case 404:
            reject({ type: 'EMAIL_NOT_EXISTS' });
            break;
          case 401:
            if (response.data.message.toString().includes('Password invalid')) reject({ type: 'PASSWORD_INVALID' });

            break;
          default:
            reject({ type: 'UNKNOWN' });
            break;
        }
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
      .catch(({ response }) => {
        if (!response) {
          reject({ type: 'UNKNOWN' });
          return;
        }
        switch (response.status) {
          case 409:
            reject({ type: 'EMAIL_ALREADY_EXISTS' });
            break;

          default:
            reject({ type: 'UNKNOWN' });
            break;
        }
      });
  });
}
export default { login, register };
