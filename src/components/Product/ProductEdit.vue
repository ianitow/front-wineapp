<template>
  <q-dialog v-model="always" persistent @hide="onCancelButton">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Editar produto</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div>
          <q-input
            filled
            required
            v-model="name"
            label="Nome do produto"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Por favor, digite algo']"
          />
          <q-input
            type="number"
            v-model="quantity"
            required
            filled
            label="Quantidade em estoque"
            lazy-rules
            :rules="[val => quantity > 0 || 'Por favor, digite um valor valido']"
          />

          <q-input
            type="number"
            required
            v-model="sizeInLiters"
            filled
            label="Tamanho em litros"
            lazy-rules
            :rules="[val => val > 0 || 'Por favor, digite um valor valido']"
          />
          <q-input
            filled
            v-model="price"
            label="Preço"
            prefix="R$"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            input-class="text-right"
            :rules="[val => val > 0 || 'Por favor, digite um valor valido']"
          />
        </div>
      </q-card-section>
      <div class="flex text-center justify-center q-mb-md">
        <b class="text-primary">ATENÇÃO: Isso alterará pedidos antigos!</b>
      </div>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn unelevated label="Editar" color="primary" v-close-popup @click="onClickEditButton" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { ptBR } from 'src/i18n';
import { ERROR, SUCCESS } from 'src/configs/Notify';

const { mapActions } = createNamespacedHelpers('product');
export default {
  props: ['product'],
  data() {
    return {
      name: this.product.name,
      sizeInLiters: this.product.size,
      quantity: this.product.quantity,
      price: this.product.price,

      always: true,
    };
  },

  methods: {
    ...mapActions(['createProductRequest', 'editProductRequest']),
    onCancelButton() {
      this.$emit('onCancelButton');
    },
    onClickEditButton() {
      this.editProductRequest({
        // eslint-disable-next-line no-underscore-dangle
        id: this.product._id,
        name: this.name,
        size: this.sizeInLiters,
        quantity: this.quantity,
        price: this.price,
        notes: this.notes,
      })
        .then(() => {
          this.$q.notify({
            ...SUCCESS,
            message: ptBR.success.PRODUCT_EDIT_SUCCESS,
          });
        })
        .catch(({ type }) => {
          this.$q.notify({
            ...ERROR,
            message: ptBR.errors[type],
          });
        });
    },
  },
};
</script>

<style></style>
