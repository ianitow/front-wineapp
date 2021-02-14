<template>
  <q-page padding>
    <div>
      <q-input bg-color="white" rounded outlined label="Search..." class="q-mb-md" />
    </div>
    <div>
      <customer-group icon="account_box" :customers="customers" />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
/** TODO
 *
 * Debounce in search
 *
 *  */
import CustomerGroup from 'src/components/Customer/CustomerGroup.vue';

import { createNamespacedHelpers } from 'vuex';
import { ptBR } from 'src/i18n';

const { mapState, mapActions } = createNamespacedHelpers('customer');
export default {
  components: {
    CustomerGroup,
  },
  data() {
    return {
      isDialogCreateOpened: false,
    };
  },
  mounted() {
    this.getCustomersRequest().catch(err => {
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
        return this.$store.state.customer.searching;
      },
      set(newValue) {
        this.$store.commit('customer/SET_SEARCH_STRING', newValue);
      },
    },
    ...mapState({
      customers: state => state.customers,
    }),
  },
  methods: {
    toggleDialogCreateOpened() {
      this.isDialogCreateOpened = !this.isDialogCreateOpened;
    },
    ...mapActions(['getCustomersRequest', 'editCustomer', 'createCustomer']),
  },
};
</script>
