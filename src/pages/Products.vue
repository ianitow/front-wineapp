<template>
  <q-page padding>
    <div v-if="isDialogCreateOpened">
      <product-create v-on:onCancelButton="toggleDialogCreateOpened" />
    </div>
    <div>
      <q-input bg-color="white" rounded outlined label="Search..." class="q-mb-md" />
      <product-group iconHeader="local_bar" icon="inventory_2" :products="this.getProductsByGroup" />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="toggleDialogCreateOpened" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import ProductGroup from 'src/components/ProductGroup.vue';
import { createNamespacedHelpers } from 'vuex';
import ProductCreate from 'src/components/ProductCreate.vue';

const {
  mapState,
  mapActions,

  mapGetters,
} = createNamespacedHelpers(
  // eslint-disable-next-line comma-dangle
  'product'
);
export default {
  components: { ProductGroup, ProductCreate },
  data() {
    return { isDialogCreateOpened: false };
  },
  mounted() {
    this.getProductsRequest();
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
<style lang="stylus" scoped>
.item-header{
  background:blue;
  color:white;
}
</style>
