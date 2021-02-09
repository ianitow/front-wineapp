<template>
  <q-page padding>
    <div v-if="false"></div>
    <div>
      <q-input bg-color="white" rounded outlined label="Search..." class="q-mb-md" />
    </div>
    <div>
      <client-group icon="person" :users="users" />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import ClientGroup from 'src/components/ClientGroup';

export default {
  components: { ClientGroup },
  data() {
    return { users: [{ name: 'Iaan Mesquita de souza' }, { name: 'Guilherme Antonio Farias' }] };
  },
};
</script>
