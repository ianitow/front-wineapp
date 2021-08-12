<template>
  <q-page padding>
    <customer-create v-if="isDialogCreateOpened" @onHideButton="toggleDialogCreateOpened" />
    <div>
      <q-input
        v-model="searching"
        bg-color="white"
        outlined
        debounce="200"
        label="Search..."
        class="q-mb-md"
      >
        <template v-slot:append>
          <q-icon name="search" color="grey-6" />
        </template>
      </q-input>
    </div>
    <div>
      <customer-group icon="account_box" :customers="this.getCustomersWithSearching" />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="toggleDialogCreateOpened" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import CustomerGroup from 'src/components/Customer/CustomerGroup.vue';

import { createNamespacedHelpers } from 'vuex';
import { ptBR } from 'src/i18n';
import CustomerCreate from 'src/components/Customer/CustomerCreate.vue';

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('customer');
export default {
  components: {
    CustomerGroup,
    CustomerCreate,
  },
  data() {
    return {
      isDialogCreateOpened: false,
      searching: '',
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
    ...mapState({
      customers: state => {
        return state.customers;
      },
    }),
    ...mapGetters(['getCustomersWithSearching']),
  },
  watch: {
    searching(newValue) {
      this.$store.commit('customer/SET_SEARCH_STRING', newValue);
    },
  },
  methods: {
    toggleDialogCreateOpened() {
      this.isDialogCreateOpened = !this.isDialogCreateOpened;
    },

    ...mapActions(['getCustomersRequest', 'editCustomer', 'createCustomer']),
  },
};
</script>
