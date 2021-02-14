<template>
  <q-dialog ref="dialogComponent" v-model="always" persistent @hide="onHideButton">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Editar produto</div>
      </q-card-section>
      <q-form @submit.prevent="onSubmit">
        <q-card-section class="q-pt-none">
          <q-input
            filled
            required
            v-model="name"
            label="Nome do Cliente"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Por favor, digite algo']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            type="text"
            v-model="address"
            required
            filled
            label="Endereço"
            lazy-rules
            :rules="[val => (val && val.length) > 0 || 'Por favor, digite um endereço válido']"
          >
            <template v-slot:prepend>
              <q-icon name="home" />
            </template>
          </q-input>

          <q-input
            maxlength="11"
            type="tel"
            required
            v-model="number_phone"
            filled
            label="Número de telefone"
            lazy-rules
            :rules="[val => val.toString().length == 11 || 'Por favor, digite um número valido']"
          >
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
        </q-card-section>
        <div class="flex text-center justify-center q-mb-md">
          <b class="text-primary">ATENÇÃO: Isso alterará pedidos antigos!</b>
        </div>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup @click="onCancelButton" />
          <q-btn type="submit" label="Editar" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { ptBR } from 'src/i18n';
import { ERROR, SUCCESS } from 'src/configs/Notify';

const { mapActions } = createNamespacedHelpers('customer');
export default {
  props: ['customer'],
  data() {
    return {
      name: this.customer.name,
      address: this.customer.address,
      number_phone: this.customer.number_phone,
      always: true,
    };
  },

  methods: {
    ...mapActions(['editCustomerRequest']),
    onHideButton() {
      this.$emit('onHideButton');
    },
    onCancelButton() {
      this.$emit('onCancelButton');
    },
    onSubmit() {
      this.$emit('onSubmit');
      this.editCustomerRequest({
        // eslint-disable-next-line no-underscore-dangle
        id: this.customer._id,
        name: this.name,
        address: this.address,
        number_phone: this.number_phone,
      })
        .then(() => {
          this.$q.notify({
            ...SUCCESS,
            message: ptBR.success.CUSTOMER_EDIT_SUCCESS,
          });
        })
        .catch(({ type }) => {
          this.$q.notify({
            ...ERROR,
            message: ptBR.errors[type],
          });
        });
      this.$refs.dialogComponent.hide();
    },
  },
};
</script>
