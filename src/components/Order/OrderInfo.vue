<template>
  <q-dialog v-model="always" persistent @hide="onHideButton">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">{{ this.order.customer_id.name }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="flex full-width q-gutter-md">
          <q-input
            class="full-width"
            readonly
            disable
            filled
            v-model="this.order.customer_id.name"
            label="Nome do cliente"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            class="full-width"
            readonly
            disable
            filled
            v-model="this.order.customer_id.address"
            label="Endereço"
          >
            <template v-slot:prepend>
              <q-icon name="home" />
            </template>
          </q-input>

          <q-input
            readonly
            disable
            filled
            v-model="this.order.customer_id.number_phone"
            maxlength="11"
            type="tel"
            class="full-width "
            outlined
            required
            label="Number phone"
          >
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
        </div>
        <div class="q-my-md">
          <q-select v-model="getSelectedStatus" filled :options="options" label="Status do pedido">
            <template v-slot:prepend> <q-icon name="list_alt" /> </template
          ></q-select>
        </div>
        <q-input class="full-width" filled v-model="this.order.notes" label="Observações">
          <template v-slot:prepend>
            <q-icon name="notes" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right" class="q-mb-xs">
        <q-btn label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ['order'],

  data() {
    return {
      always: true,
      selected: { value: this.order.status },
      options: [
        { label: 'Pendente', value: 'PENDING' },
        { label: 'Ag. Pagamento', value: 'WAITING_PAYMENT' },
        { label: 'Finalizado', value: 'FINISHED' },
        { label: 'Cancelado', value: 'CANCELLED' },
      ],
    };
  },
  onMounted() {
    this.selected = this.getSelectedStatus;
  },
  computed: {
    getSelectedStatus: {
      get() {
        return [
          { label: 'Pendente', value: 'PENDING' },
          { label: 'Ag. Pagamento', value: 'WAITING_PAYMENT' },
          { label: 'Finalizado', value: 'FINISHED' },
          { label: 'Cancelado', value: 'CANCELLED' },
        ].filter(status => this.selected.value === status.value)[0];
      },
      set(selectedObject) {
        const { label, value } = selectedObject;

        this.selected = { label, value };
      },
    },
  },

  methods: {
    onHideButton() {
      this.$emit('onHideButton');
    },
  },
};
</script>
