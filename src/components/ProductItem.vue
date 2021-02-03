<template>
  <div>
    <q-dialog v-model="isDialogOpened" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="do_not_disturb_on" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >Deseja deletar o produto? <br /><b>{{ productOpened.name }}</b>
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Deletar" @click="makeDeleteRequest" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-item dense v-for="(product, index) in Object.values(product)" :key="`${product.name} - ${index}`">
      <q-item-section avatar>
        <q-icon color="primary" :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ product.name }}</q-item-label>
        <q-item-label caption>
          {{ product.size }}L - {{ product.quantity }} - R${{ product.price.toFixed(2) }}</q-item-label
        >
      </q-item-section>

      <div class="flex q-gutter-xs">
        <q-btn dense color="secondary" label="Editar" />
        <q-btn dense color="primary" label="Deletar" @click="toggleDialogExclude(product)" />
      </div>
    </q-item>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers(
  // eslint-disable-next-line comma-dangle
  'product'
);
export default {
  data() {
    return {
      isDialogOpened: false,
      productOpened: {},
    };
  },
  methods: {
    ...mapActions(['deleteProductRequest']),
    toggleDialogExclude(product) {
      this.isDialogOpened = !this.isDialogOpened;
      this.productOpened = { ...product };
    },
    makeDeleteRequest() {
      // eslint-disable-next-line no-underscore-dangle
      this.deleteProductRequest({ id: this.productOpened._id })
        .then(() => {
          console.log('deletado');
        })
        .catch(err => {
          console.log('ERR', err);
        });
    },
  },
  watch: {
    isDialogOpened(newState) {
      if (!newState) this.productOpened = {};
    },
  },
  props: ['product', 'icon'],
};
</script>

<style></style>
