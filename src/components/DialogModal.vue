<template>
  <q-dialog v-model="always" persistent @hide="onHideButton">
    <q-card>
      <q-card-section class="row items-center no-wrap">
        <q-avatar :icon="icon" color="primary" text-color="white" />
        <span class="q-ml-sm">
          {{ message }}<b>{{ boldMessage }} </b></span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="cancelButton" @click="onCancelButton" color="primary" v-close-popup />
        <q-btn flat :label="submitButton" @click="onSubmitButton" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ['message', 'icon', 'boldMessage', 'submitButton', 'cancelButton'],
  data() {
    return { always: true };
  },
  methods: {
    onHideButton() {
      this.$emit('onHideButton');
    },
    onCancelButton() {
      this.$emit('onCancelButton');
    },
    onSubmitButton() {
      this.$emit('onSubmitButton');
    },
  },
};
</script>

<style></style>
