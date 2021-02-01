/* eslint-disable comma-dangle */
import LoginAuth from 'src/api/userAuth';
import { ptBR } from 'src/i18n/index';

export function loginRequest(state, { email, password }) {
  return new Promise((resolve, reject) => {
    LoginAuth.login(email, password)
      .then(token => {
        resolve({
          token,
          color: 'green',
          textColor: 'white',
          position: 'top',
          message: ptBR.success.LOGIN_SUCCESS,
        });
      })
      .catch(({ type }) => {
        reject({
          color: 'red',
          textColor: 'white',
          icon: 'warning',
          message: ptBR.errors[type],
          position: 'top',
        });
      });
  });
}
export function registerRequest(
  state,
  // eslint-disable-next-line object-curly-newline
  { name, email, password, address, numberPhone }
) {
  return new Promise((resolve, reject) => {
    LoginAuth.register(name, email, password, address, numberPhone)
      .then(() => {
        resolve({
          color: 'green',
          textColor: 'white',
          position: 'top',
          message: ptBR.success.REGISTER_SUCCESS,
        });
      })
      .catch(({ type }) => {
        reject({
          color: 'red',
          textColor: 'white',
          icon: 'warning',
          message: ptBR.errors[type],
          position: 'top',
        });
      });
  });
}
