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
        { title: 'Orders', icon: 'list_alt', routeName: 'Orders' },
        { title: 'Inventory', icon: 'wine_bar', routeName: 'Products' },

        { title: 'Clients', icon: 'supervisor_account', routeName: 'Customers' },
        { title: 'Users', icon: 'admin_panel_settings', routeName: '' },
        { title: 'Logout', icon: 'logout', routeName: '' },
      ],
    };
  },
};
</script>

<style></style>
