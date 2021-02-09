<template>
  <div>
    <q-list bordered v-for="(user, index) in users" :key="`${user.name} - ${index}`">
      <client-item :icon="icon" :user="user" />
    </q-list>
  </div>
</template>

<script>
import ClientItem from './ClientItem.vue';

export default {
  components: { ClientItem },
  props: ['icon', 'users'],
};
</script>

<style lang="stylus" scoped></style>
