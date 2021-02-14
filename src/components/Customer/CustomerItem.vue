<template>
  <div>
    <dialog-modal
      v-if="isModalExcludeOpened"
      message="Deseja realmente excluir o cliente ? "
      :boldMessage="customer.name"
      :icon="icon"
      @onHideButton="toggleModalDelete"
      @onCancelButton="resetFunction"
      @onSubmitButton="makeDeleteRequest"
    />
    <customer-info v-if="isModalInfoOpened" :customer="customer" @onHideButton="toggleModalInfo" />
    <div>
      <q-slide-item
        class="customer"
        @left="element => onHandleLeft(element)"
        @right="element => onHandleRight(element)"
        right-color="negative"
        left-color="warning"
        @click="toggleModalInfo"
      >
        <template v-slot:left>
          <q-icon color="white" name="create" />
        </template>
        <template v-slot:right>
          <q-icon color="white" name="delete" />
        </template>

        <q-item dense v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <q-icon :name="icon" color="primary" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-primary">{{ customer.name }}</q-item-section>
          <q-item-section side>
            <q-icon name="search" color="grey" />
          </q-item-section>
        </q-item>
      </q-slide-item>
    </div>
  </div>
</template>
<style lang="stylus" scoped></style>
<script>
// import customers from 'src/api/customers';

import { SUCCESS } from 'src/configs/Notify';
import { ptBR } from 'src/i18n';
import { createNamespacedHelpers } from 'vuex';
import DialogModal from './DialogModal.vue';
import CustomerInfo from './CustomerInfo';

const { mapActions } = createNamespacedHelpers(
  // eslint-disable-next-line comma-dangle
  'customer'
);
export default {
  props: ['icon', 'customer'],
  components: { DialogModal, CustomerInfo },
  data() {
    return {
      isModalEditOpened: false,
      isModalExcludeOpened: false,
      isModalInfoOpened: false,
      resetFunction: null,
    };
  },
  methods: {
    ...mapActions(['deleteCustomerRequest']),
    toggleModalEdit() {
      this.isModalEditOpened = !this.isModalEditOpened;
    },
    toggleModalDelete() {
      this.isModalExcludeOpened = !this.isModalExcludeOpened;
    },
    toggleModalInfo() {
      this.isModalInfoOpened = !this.isModalInfoOpened;
    },
    onHandleLeft({ reset }) {
      this.resetFunction = reset;
      this.toggleModalEdit();
    },
    onHandleRight({ reset }) {
      this.resetFunction = reset;
      this.toggleModalDelete();
    },

    makeDeleteRequest() {
      this.deleteCustomerRequest({
        // eslint-disable-next-line no-underscore-dangle
        id: this.customer._id,
      }).then(() => {
        this.$q.notify({
          ...SUCCESS,
          message: ptBR.success.CUSTOMER_DELETED_SUCCESS,
        });
      });
      this.isModalExcludeOpened = false;
    },
  },
};
</script>
