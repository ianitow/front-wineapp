<template>
  <div>
    <div v-if="isDialogEditOpened">
      <product-edit :product="productOpened" v-on:onCancelButton="toggleDialog('edit')" />
    </div>
    <q-dialog v-model="isDialogDeleteOpened" persistent>
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
    <q-item
      dense
      v-for="(product, index) in Object.values(product)"
      :key="`${product.name} - ${index}`"
    >
      <q-item-section avatar>
        <q-icon color="primary" :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ product.name }}</q-item-label>
        <q-item-label caption>
          {{ product.size }}L - {{ product.quantity }} - R${{
            product.price.toFixed(2)
          }}</q-item-label
        >
      </q-item-section>

      <div class="flex align-center q-gutter-xs justify-center">
        <q-btn
          dense
          size="sm"
          color="secondary"
          label="Editar"
          @click="toggleDialog('edit', product)"
        />
        <q-btn
          size="sm"
          dense
          color="primary"
          label="Deletar"
          @click="toggleDialog('delete', product)"
        />
      </div>
    </q-item>
  </div>
</template>

<script>
import { SUCCESS } from 'src/configs/Notify';
import { createNamespacedHelpers } from 'vuex';
import { ptBR } from 'src/i18n';
import ProductEdit from './ProductEdit.vue';

const { mapActions } = createNamespacedHelpers(
  // eslint-disable-next-line comma-dangle
  'product'
);
export default {
  components: {
    ProductEdit,
  },
  data() {
    return {
      isDialogDeleteOpened: false,
      isDialogEditOpened: false,
      productOpened: {},
    };
  },
  methods: {
    ...mapActions(['deleteProductRequest']),
    toggleDialog(type, product) {
      switch (type) {
        case 'delete':
          this.isDialogDeleteOpened = !this.isDialogDeleteOpened;
          break;
        case 'edit':
          this.isDialogEditOpened = !this.isDialogEditOpened;
          break;
        default:
          break;
      }
      this.productOpened = {
        ...product,
      };
    },

    makeDeleteRequest() {
      this.deleteProductRequest({
        // eslint-disable-next-line no-underscore-dangle
        id: this.productOpened._id,
      })
        .then(() => {
          this.$q.notify({
            ...SUCCESS,
            message: ptBR.success.PRODUCT_DELETED_SUCCESS,
          });
        })
        .catch(err => {
          console.log('ERR', err);
        });
    },
  },
  watch: {
    toggleDialog(newState) {
      if (!newState) {
        this.productOpened = {};
      }
    },
  },

  props: ['product', 'icon'],
};
</script>

<style></style>
