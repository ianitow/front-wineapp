<template>
  <q-dialog v-model="always" persistent @hide="onHideButton">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">{{ customer.name }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="flex full-width q-gutter-md">
          <q-input
            class="full-width"
            readonly
            disable
            filled
            v-model="customer.name"
            label="Nome do cliente"
          />
          <q-input
            class="full-width"
            readonly
            disable
            filled
            v-model="customer.address"
            label="Endereço"
          />

          <q-input
            readonly
            disable
            filled
            v-model="customer.number_phone"
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
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ['customer'],
  data() {
    return { always: true };
  },
  methods: {
    onHideButton() {
      this.$emit('onHideButton');
    },
  },
};
</script>
