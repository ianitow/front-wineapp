<template>
  <div>
    <product-edit
      v-if="isDialogEditOpened"
      :product="productOpened"
      @:onCancelButton="toggleDialog('edit')"
    />

    <dialog-modal
      v-if="isDialogDeleteOpened"
      :message="`Deseja realmente deletar o produto? `"
      :boldMessage="`${productOpened.name}`"
      icon="person"
      @:onHideButton="toggleDialog('delete')"
      @:onSubmitButton="makeDeleteRequest"
      submitButton="Deletar"
      cancelButton="Cancelar"
    />

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
          color="warning"
          label="Editar"
          @click="toggleDialog('edit', product)"
        />
        <q-btn
          size="sm"
          dense
          color="negative"
          label="Deletar"
          @click="toggleDialog('delete', product)"
        />
      </div>
    </q-item>
  </div>
</template>

<script>
import { SUCCESS } from 'src/configs/Notify';
import { ptBR } from 'src/i18n';
import { createNamespacedHelpers } from 'vuex';

import ProductEdit from './ProductEdit.vue';
import DialogModal from '../DialogModal.vue';

const { mapActions } = createNamespacedHelpers(
  // eslint-disable-next-line comma-dangle
  'product'
);
export default {
  components: {
    ProductEdit,
    DialogModal,
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
      }).then(() => {
        this.$q.notify({
          ...SUCCESS,
          message: ptBR.success.PRODUCT_DELETED_SUCCESS,
        });
      });
      this.isDialogDeleteOpened = false;
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
