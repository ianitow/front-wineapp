<template>
  <q-page padding>
    <div>
      <q-input
        bg-color="white"
        rounded
        outlined
        v-model="text"
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
      <q-btn fab icon="add" color="accent" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import ProductGroup from 'src/components/ProductGroup.vue';
import { createNamespacedHelpers } from 'vuex';

import { GET_PRODUCTS_REQUEST } from '../store/product/types';

const {
  mapState,
  mapActions,
  mapMutations,
  mapGetters,
} = createNamespacedHelpers(
  // eslint-disable-next-line comma-dangle
  'product'
);
export default {
  components: { ProductGroup },
  mounted() {
    this.productsRequest();
  },
  computed: {
    ...mapGetters(['getProductsByGroup']),
    ...mapState({
      products: state => state.products,
    }),
  },
  methods: {
    ...mapMutations([GET_PRODUCTS_REQUEST]),
    ...mapActions([
      'productsRequest',
      'deleteProduct',
      'editProduct',
      'createProduct',
    ]),
  },
};
</script>
<style lang="stylus" scoped>
.item-header{
  background:blue;
  color:white;
}
</style>
