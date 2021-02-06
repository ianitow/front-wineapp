<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { setHeaderInterceptorInAxios } from 'src/api/userAuth';

export default {
  name: 'App',
  beforeMount() {
    setHeaderInterceptorInAxios(localStorage.getItem('token'));
  },
};
</script>
