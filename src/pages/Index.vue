<template>
  <q-page class="flex justify-center">
    <card-home-group />
  </q-page>
</template>

<script>
import CardHomeGroup from 'src/components/CardHomeGroup.vue';
import { setHeaderInterceptorInAxios } from 'src/api/userAuth';

export default {
  mounted() {
    setHeaderInterceptorInAxios(localStorage.getItem('token'));
  },
  components: { CardHomeGroup },
};
</script>
