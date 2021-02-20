<template>
  <div>
    <dialog-modal
      v-if="isModalCompletedOpened"
      message="Deseja realmente finalizar o pedido ? "
      :boldMessage="order.customer_id.name"
      icon="check_circle"
      @onHideButton="toggleModalCompleted"
      @onCancelButton="resetFunction"
      @onSubmitButton="makeFinishedRequest"
      cancelButton="Cancelar"
      submitButton="Finalizar"
    />

    <dialog-modal
      v-if="isModalExcludeOpened"
      message="Deseja realmente cancelar o pedido ? "
      :boldMessage="order.customer_id.name"
      icon="block"
      @onHideButton="toggleModalDelete"
      @onCancelButton="resetFunction"
      @onSubmitButton="makeCancelRequest"
      cancelButton="Cancelar"
      submitButton="Cancelar Pedido"
    />
    <order-info v-if="isModalInfoOpened" :order="order" @onHideButton="toggleModalInfo" />

    <div>
      <q-slide-item
        class="customer"
        @left="element => onHandleLeft(element)"
        @right="element => onHandleRight(element)"
        right-color="negative"
        left-color="positive"
        @click="toggleModalInfo"
      >
        <template v-slot:left>
          <q-icon color="white" name="check_circle" />
        </template>
        <template v-slot:right>
          <q-icon color="white" name="block" />
        </template>

        <q-item :class="['order-item', this.transformIconStatus.color]" dense v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <q-icon
                size="34px"
                :name="transformIconStatus.icon"
                :color="transformIconStatus.color"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-primary">{{ order.customer_id.name }}</q-item-section>
          <q-item-section side>
            <q-icon name="search" color="grey" />
          </q-item-section>
        </q-item>
      </q-slide-item>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.order-item{
  border-left:2px solid;
}
.warning{
  border-color:$warning;
}
.positive{
  border-color:$positive;
}
.negative{
  border-color:$negative;
}
.info{
  border-color:$info;
}
</style>

<script>
import OrderStatus from 'src/configs/StatusOptions';
import { SUCCESS } from 'src/configs/Notify';
import { ptBR } from 'src/i18n';
import { createNamespacedHelpers } from 'vuex';
import DialogModal from '../DialogModal.vue';
import OrderInfo from './OrderInfo';

const { mapActions } = createNamespacedHelpers(
  // eslint-disable-next-line comma-dangle
  'order'
);
export default {
  props: ['options', 'order'],
  components: { DialogModal, OrderInfo },
  data() {
    return {
      isModalCompletedOpened: false,
      isModalExcludeOpened: false,
      isModalInfoOpened: false,
      resetFunction: null,
    };
  },
  computed: {
    transformIconStatus() {
      switch (this.order.status) {
        case OrderStatus.PENDING:
          return { icon: 'circle_notifications', color: 'warning' };
        case OrderStatus.WAITING_PAYMENT:
          return { icon: 'paid', color: 'info' };
        case OrderStatus.FINISHED:
          return { icon: 'check_circle', color: 'positive' };
        default:
          return { icon: 'unpublished', color: 'negative' };
      }
    },
  },
  methods: {
    ...mapActions(['deleteOrderRequest', 'patchStatusOrderRequest']),
    toggleModalCompleted() {
      this.isModalCompletedOpened = !this.isModalCompletedOpened;
    },
    toggleModalDelete() {
      this.isModalExcludeOpened = !this.isModalExcludeOpened;
    },
    toggleModalInfo() {
      this.isModalInfoOpened = !this.isModalInfoOpened;
    },
    onHandleLeft({ reset }) {
      this.resetFunction = reset;
      this.toggleModalCompleted();
    },
    onHandleRight({ reset }) {
      this.resetFunction = reset;
      this.toggleModalDelete();
    },

    makeFinishedRequest() {
      this.patchStatusOrderRequest({
        // eslint-disable-next-line no-underscore-dangle
        id: this.order._id,
        status: OrderStatus.FINISHED,
      }).then(() => {
        this.$q.notify({
          ...SUCCESS,
          message: ptBR.success.ORDER_FINISHED_SUCCESS,
        });
        this.resetFunction();
      });
      this.isModalExcludeOpened = false;
    },
    makeCancelRequest() {
      this.patchStatusOrderRequest({
        // eslint-disable-next-line no-underscore-dangle
        id: this.order._id,
        status: OrderStatus.CANCELLED,
      }).then(() => {
        this.$q.notify({
          ...SUCCESS,
          message: ptBR.success.ORDER_CANCELLED_SUCCESS,
        });
        this.resetFunction();
      });
      this.isModalExcludeOpened = false;
    },
  },
};
</script>
