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
      <q-list
        bordered
        v-for="([key, value], indexTwo) in Object.entries(
          this.getProductsByGroup
        )"
        :key="`${key} - ${indexTwo}`"
        class="q-mb-xs"
      >
        <q-expansion-item
          dense
          :group="`${key}`"
          icon="local_bar"
          :label="key"
          header-class="text-primary"
        >
          <q-item
            dense
            v-for="(product, index) in Object.values(value)"
            :key="`${product.name} - ${index}`"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="inventory_2" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ product.name }}</q-item-label>
              <q-item-label caption>
                {{ product.size }}L - {{ product.quantity }} - R${{
                  product.price.toFixed(2)
                }}</q-item-label
              >
            </q-item-section>

            <div class="flex q-gutter-xs">
              <q-btn dense color="secondary" label="Editar" />
              <q-btn dense color="primary" label="Deletar" />
            </div>
          </q-item>
        </q-expansion-item>
      </q-list>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" />
    </q-page-sticky>
  </q-page>
</template>

<script>
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
