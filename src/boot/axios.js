import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$axios = axios;

const api = axios.create({
  baseURL: 'https://wine-votu.herokuapp.com',
});
Vue.prototype.$api = api;

export { axios, api };
