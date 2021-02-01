<template>
  <div class="flex q-gutter-lg justify-center  content-start q-py-lg">
    <card-home
      v-for="(option, index) in options"
      :key="`${index} - ${option.title}`"
      :title="option.title"
      :icon="option.icon"
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
        { title: 'Products', icon: 'wine_bar', link: '' },
        { title: 'Inventory', icon: 'inventory', link: '' },
        { title: 'Clients', icon: 'supervisor_account', link: '' },
        { title: 'Users', icon: 'admin_panel_settings', link: '' },
      ],
    };
  },
};
</script>

<style></style>
