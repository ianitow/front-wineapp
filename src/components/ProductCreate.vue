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
            v-model="nameOfProduct"
            label="Nome do produto"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Por favor, digite algo']"
          />
          <q-input
            type="number"
            v-model="quantityInInventory"
            filled
            label="Quantidade em estoque"
            lazy-rules
            :rules="[val => val < 0 || 'Por favor, digite um valor valido']"
          />

          <q-input
            type="number"
            v-model="sizeInLiters"
            filled
            label="Tamanho em litros"
            lazy-rules
            :rules="[val => val < 0 || 'Por favor, digite um valor valido']"
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
          />
          <q-input filled v-model="notes" label="Observação (Opcional)" lazy-rules />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn label="Criar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      nameOfProduct: '',
      quantityInInventory: 0,
      sizeInLiters: 0,
      price: 0.0,
      notes: '',
      always: true,
    };
  },

  methods: {
    onCancelButton() {
      this.$emit('onCancelButton');
    },
  },
};
</script>

<style></style>
