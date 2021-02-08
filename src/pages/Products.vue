<template>
  <q-page padding>
    <div v-if="isDialogCreateOpened">
      <product-create v-on:onCancelButton="toggleDialogCreateOpened" />
    </div>
    <div>
      <q-input
        v-model="searching"
        bg-color="white"
        rounded
        outlined
        label="Search..."
        class="q-mb-md"
      />
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
import ProductGroup from 'src/components/ProductGroup.vue';
import { createNamespacedHelpers } from 'vuex';
import ProductCreate from 'src/components/ProductCreate.vue';
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
  computed: {
    searching: {
      get() {
        return this.$store.state.product.searching;
      },
      set(newValue) {
        this.$store.commit('product/SET_SEARCH_STRING', newValue);
      },
    },
    ...mapGetters(['getProductsByGroup', 'getSearchString']),
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
<style lang="stylus" scoped>
.item-header{
  background:blue;
  color:white;
}
</style>
