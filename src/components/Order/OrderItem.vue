<template>
  <div>
    <!-- <customer-edit
      v-if="isModalEditOpened"
      :customer="order"
      @onHideButton="toggleModalEdit"
      @onCancelButton="resetFunction"
      @onSubmit="resetFunction"
    />
    <dialog-modal
      v-if="isModalExcludeOpened"
      message="Deseja realmente excluir o cliente ? "
      :boldMessage="order.name"
      :icon="icon"
      @onHideButton="toggleModalDelete"
      @onCancelButton="resetFunction"
      @onSubmitButton="makeDeleteRequest"
    />
    <customer-info v-if="isModalInfoOpened" :customer="order" @onHideButton="toggleModalInfo" /> -->
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
import { SUCCESS } from 'src/configs/Notify';
import { ptBR } from 'src/i18n';
import { createNamespacedHelpers } from 'vuex';
// import DialogModal from '../DialogModal.vue';

const { mapActions } = createNamespacedHelpers(
  // eslint-disable-next-line comma-dangle
  'order'
);
export default {
  props: ['options', 'order'],
  components: {},
  data() {
    return {
      isModalEditOpened: false,
      isModalExcludeOpened: false,
      isModalInfoOpened: false,
      resetFunction: null,
    };
  },
  computed: {
    transformIconStatus() {
      switch (this.order.status) {
        case 'PENDING':
          return { icon: 'circle_notifications', color: 'warning' };
        case 'WAITING_PAYMENT':
          return { icon: 'paid', color: 'info' };
        case 'FINISHED':
          return { icon: 'check_circle', color: 'positive' };
        default:
          return { icon: 'unpublished', color: 'negative' };
      }
    },
  },
  methods: {
    ...mapActions(['deleteOrderRequest']),
    toggleModalEdit() {
      console.log(this.order);
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
      this.deleteOrderRequest({
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
