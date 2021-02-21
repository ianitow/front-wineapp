<template>
  <q-page padding>
    <product-create v-if="isDialogCreateOpened" v-on:onCancelButton="toggleDialogCreateOpened" />

    <div>
      <q-input v-model="searching" bg-color="white" outlined label="Search..." class="q-mb-md">
        <template v-slot:append>
          <q-icon name="search" color="grey-6" />
        </template>
      </q-input>
      <product-group
        iconHeader="local_bar"
        icon="inventory_2"
        :products="this.getProductsByGroup"
      />
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
import ProductGroup from 'src/components/Product/ProductGroup.vue';
import { createNamespacedHelpers } from 'vuex';
import ProductCreate from 'src/components/Product/ProductCreate.vue';
import { ptBR } from 'src/i18n';

const {
  mapState,
  mapActions,

  mapGetters,
} = createNamespacedHelpers('product');
export default {
  components: {
    ProductGroup,
    ProductCreate,
  },
  data() {
    return {
      isDialogCreateOpened: false,
      searching: '',
    };
  },
  mounted() {
    this.getProductsRequest().catch(err => {
      this.$q.notify({
        color: 'red',
        textColor: 'white',
        icon: 'warning',
        message: ptBR.errors[err.type],
        position: 'top',
      });
    });
  },
  watch: {
    searching(newValue) {
      this.$store.commit('product/SET_SEARCH_STRING', newValue);
    },
  },
  computed: {
    ...mapGetters(['getProductsByGroup']),
    ...mapState({
      products: state => state.products,
    }),
  },
  methods: {
    toggleDialogCreateOpened() {
      this.isDialogCreateOpened = !this.isDialogCreateOpened;
    },
    ...mapActions(['getProductsRequest', 'editProduct', 'createProduct']),
  },
};
</script>
