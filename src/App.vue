<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import Fastclick from '@quasar/fastclick';

export default {
  name: 'App',
  created() {
    Fastclick();
  },
};
</script>
