<template>
  <q-dialog v-model="always" persistent @hide="onCancelButton">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Criar novo produto</div>
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
            class="q-mb-lg"
            :rules="[val => val > 0 || 'Por favor, digite um valor valido']"
          />
          <q-input filled v-model="notes" label="Observação (Opcional)" lazy-rules />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn label="Criar" color="primary" v-close-popup @click="onClickCreateButton" />
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
  data() {
    return {
      name: '',
      sizeInLiters: 0,
      quantity: 0,
      price: 0.0,
      notes: '',
      always: true,
    };
  },

  methods: {
    ...mapActions(['createProductRequest']),
    onCancelButton() {
      this.$emit('onCancelButton');
    },
    onClickCreateButton() {
      this.createProductRequest({
        name: this.name,
        size: this.sizeInLiters,
        quantity: this.quantity,
        price: this.price,
        notes: this.notes,
      })
        .then(() => {
          this.$q.notify({
            ...SUCCESS,
            message: ptBR.success.PRODUCT_CREATED_SUCCESS,
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
