/* eslint-disable implicit-arrow-linebreak */ /* eslint-disable object-curly-newline */
<template>
  <div>
    <div class="row full-width">
      <q-select
        class="col"
        filled
        v-model="informations"
        use-input
        input-debounce="0"
        label="Digite o nome do produto"
        :options="productSearching"
        style="width: 250px"
        behavior="menu"
        @filter="filterFn"
      >
        <template v-slot:prepend>
          <q-icon name="wine_bar" />
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section avatar>
              <q-icon name="wine_bar" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
              <q-item-label caption>{{ scope.opt.size }}L</q-item-label>
              <q-item-label caption>R${{ scope.opt.price }}</q-item-label>
              <q-item-label caption>Qntd. Estoque: {{ scope.opt.quantity }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input
        class="col-4"
        min="1"
        :max="this.informations.quantity.toString()"
        type="number"
        v-model="quantitySelected"
        required
        filled
        label="Qntd."
      >
      </q-input>
    </div>
    <q-card-actions align="right" class="">
      <q-btn
        :disable="this.informations.label == '' || this.quantitySelected == 0"
        dense
        type="button"
        label="Adicionar"
        color="primary"
        @click="onAddToCart"
      />
    </q-card-actions>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import { ptBR } from 'src/i18n';
import { ERROR } from 'src/configs/Notify';

const { mapState, mapActions } = createNamespacedHelpers('product');

export default {
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

  data() {
    return {
      quantitySelected: 0,
      informations: { product_id: '', label: '', quantity: 0, size: 0 },
      productSearching: [],
    };
  },

  computed: {
    ...mapState({
      products: state => {
        return state.products.map(({ name, size, price, _id, quantity }) => {
          return { product_id: _id, label: name, size, price, quantity };
        });
      },
    }),
  },

  methods: {
    onCancelButton() {
      this.$emit('onCancelButton');
    },
    onAddToCart() {
      if (this.quantitySelected <= this.informations.quantity) {
        this.$emit('onAddToCart', { ...this.informations, quantity: Number(this.quantitySelected) });
        this.informations = { product_id: '', label: '', quantity: 0, size: 0 };
        this.productSearching = [];
        this.quantitySelected = 0;
      } else {
        this.$q.notify({
          ...ERROR,
          message: ptBR.errors.SIZE_INVALID_PRODUCT,
        });
      }
    },
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.productSearching = [...this.products];
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.productSearching = this.products.filter(({ label }) => {
          return label.toLowerCase().indexOf(needle) > -1;
        });
      });
    },
    ...mapActions(['getProductsRequest', 'editProduct', 'createProduct']),
  },
};
</script>
