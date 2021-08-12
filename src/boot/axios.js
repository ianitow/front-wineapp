import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$axios = axios;

const api = axios.create({
  baseURL: 'https://wine-votu.herokuapp.com/orders',
});
Vue.prototype.$api = api;

export { axios, api };
