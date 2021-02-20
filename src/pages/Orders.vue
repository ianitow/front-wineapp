<template>
  <q-page padding>
    <!-- <customer-create v-if="isDialogCreateOpened" @onHideButton="toggleDialogCreateOpened" /> -->
    <div class="q-mb-md">
      <q-input v-model="searching" bg-color="white" outlined label="Search..." />
    </div>

    <div>
      <order-group icon="account_box" :orders="this.getOrdersWithSearching" />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="toggleDialogCreateOpened" />
    </q-page-sticky>
  </q-page>
</template>

<script>
/** TODO
 *
 * Debounce in search
 *
 *  */

import { createNamespacedHelpers } from 'vuex';
import { ptBR } from 'src/i18n';
// import OrderCreate from 'src/components/Order/OrderCreate.vue';
import OrderGroup from 'src/components/Order/OrderGroup.vue';

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('order');
export default {
  components: {
    OrderGroup,
  },
  data() {
    return {
      isDialogCreateOpened: false,
    };
  },
  mounted() {
    this.getOrdersRequest().catch(err => {
      this.$q.notify({
        color: 'red',
        textColor: 'white',
        icon: 'warning',
        message: ptBR.errors[err.type],
        position: 'top',
      });
    });
  },
  computed: {
    searching: {
      get() {
        return this.$store.state.order.searching;
      },
      set(newValue) {
        this.$store.commit('order/SET_SEARCH_STRING', newValue);
      },
    },
    ...mapState({
      orders: state => state.orders,
    }),
    ...mapGetters(['getOrdersWithSearching']),
  },
  methods: {
    toggleDialogCreateOpened() {
      this.isDialogCreateOpened = !this.isDialogCreateOpened;
    },

    ...mapActions(['getOrdersRequest', 'createOrderRequest']),
  },
};
</script>
