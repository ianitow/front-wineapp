<template>
  <q-dialog v-model="always" persistent @hide="() => this.$emit('onHideButton')">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Visualização do pedido</div>
      </q-card-section>
      <q-form @submit.prevent="onSubmitDialog">
        <q-card-section class="q-pt-none">
          <div class="q-gutter-md">
            <q-input readonly disable filled v-model="this.customerName" label="Nome do cliente">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input readonly disable filled v-model="this.customerAddress" label="Endereço">
              <template v-slot:prepend>
                <q-icon name="home" />
              </template>
            </q-input>

            <q-input
              readonly
              disable
              filled
              v-model="this.customerNumberPhone"
              maxlength="11"
              type="tel"
              outlined
              required
              label="Number phone"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
            <q-select v-model="getSelectedStatus" filled :options="options" label="Status do pedido">
              <template v-slot:prepend> <q-icon name="list_alt" /> </template
            ></q-select>
            <q-input type="text" filled v-model="notes" label="Observações">
              <template v-slot:prepend>
                <q-icon name="notes" />
              </template>
            </q-input>
            <q-separator inset />

            <div class="text-h6">Itens do pedido</div>
            <div class="text-subtitle2 q-my-none">
              Total: <span class="text-bold text-positive">R${{ this.total_price }}</span>
            </div>
            <q-scroll-area style="height: 120px; ">
              <div v-for="(product, index) in this.products" :key="index" class="flex items-center full-width">
                <q-icon name="wine_bar" class="" style="font-size: 42px;" color="primary" />
                <q-item>
                  <q-item-section>
                    <q-item-label>
                      <span class="text-subtitle1">{{ product.product_id.name }}</span></q-item-label
                    >
                    <q-item-label caption>Tamanho: {{ product.product_id.size }}L</q-item-label>
                    <q-item-label caption>Quantidade: {{ product.quantity }}L</q-item-label>
                    <q-item-label caption>Preço Un.: R${{ product.price }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-scroll-area>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-mb-xs">
          <q-btn :label="isSomethingChanged() ? 'Editar' : 'Fechar'" color="primary" v-close-popup type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import OrderStatus from 'src/configs/StatusOptions';
import { createNamespacedHelpers } from 'vuex';
import { SUCCESS, ERROR } from 'src/configs/Notify';
import { ptBR } from 'src/i18n';

const { mapActions } = createNamespacedHelpers(
  // eslint-disable-next-line comma-dangle
  'order'
);
export default {
  props: ['order'],

  data() {
    return {
      always: true,
      customerName: this.order.customer_id.name,
      customerAddress: this.order.customer_id.address,
      customerNumberPhone: this.order.customer_id.number_phone,
      status: this.order.status,
      notes: this.order.notes,
      products: this.order.products,
      selected: { value: this.order.status },
      total_price: this.order.total_price,
      options: [
        { label: 'Pendente', value: OrderStatus.PENDING },
        { label: 'Ag. Pagamento', value: OrderStatus.WAITING_PAYMENT },
        { label: 'Finalizado', value: OrderStatus.FINISHED },
        { label: 'Cancelado', value: OrderStatus.CANCELLED },
      ],
    };
  },
  onMounted() {
    this.selected = this.getSelectedStatus;
  },
  computed: {
    getSelectedStatus: {
      get() {
        return this.options.filter(status => {
          return this.selected.value === status.value;
        })[0];
      },
      set(selectedObject) {
        const { label, value } = selectedObject;
        this.status = value;
        this.selected = { label, value };
      },
    },
  },

  methods: {
    ...mapActions(['editOrderRequest']),
    onSubmitDialog() {
      if (this.isSomethingChanged()) {
        this.editOrderRequest({
          // eslint-disable-next-line no-underscore-dangle
          id: this.order._id,
          status: this.status,
          notes: this.notes,
        })
          .then(() => {
            this.$q.notify({
              ...SUCCESS,
              message: ptBR.success.ORDER_CHANGED_SUCESSS,
            });
          })
          .catch(({ type }) => {
            this.$q.notify({
              ...ERROR,
              message: ptBR.errors[type],
            });
          });
      }
    },
    isSomethingChanged() {
      if (this.order.notes !== this.notes || this.order.status !== this.status) {
        return true;
      }
      return false;
    },
  },
};
</script>
