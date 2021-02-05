<template>
  <div class="flex q-gutter-lg justify-center  content-start q-py-lg">
    <card-home
      v-for="(option, index) in options"
      :key="`${index} - ${option.title}`"
      :title="option.title"
      :icon="option.icon"
      :routeName="option.routeName"
    />
  </div>
</template>

<script>
import CardHome from './CardHome.vue';

export default {
  components: { CardHome },
  data() {
    return {
      options: [
        { title: 'Inventory', icon: 'wine_bar', routeName: 'Products' },
        { title: 'Orders', icon: 'list_alt', routeName: '' },
        { title: 'Clients', icon: 'supervisor_account', routeName: '' },
        { title: 'Users', icon: 'admin_panel_settings', routeName: '' },
      ],
    };
  },
};
</script>

<style></style>
