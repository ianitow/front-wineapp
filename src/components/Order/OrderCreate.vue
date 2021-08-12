<template>
  <q-dialog ref="dialogComponent" v-model="always" persistent @hide="onHideButton">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">
          Criar pedido
        </div>
      </q-card-section>

      <q-form @submit.prevent="onSubmit">
        <q-card-section class="q-pt-none">
          <div class="items-center row justify-center">
            <select-customer @onCustomerSelected="onHandleCustomerSelected" />
            <select-products @onAddToCart="addItemToCart" />
          </div>

          <q-separator inset />

          <div class="text-h6">
            Itens do pedido
          </div>
          <div class="text-subtitle2 q-my-none">
            Total:
            <span class="text-bold text-positive">R$ {{ this.totalPrice }} </span>
          </div>
          <q-scroll-area style="height: 200px; ">
            <div v-for="(product, index) in this.cart" :key="index" class="flex full-width ">
              <q-slide-item
                class="full-width "
                right-color="negative"
                left-color="warning"
                @right="element => onHandleRight(element, index)"
              >
                <template v-slot:right>
                  <q-icon color="white" name="delete" />
                </template>
                <div class="flex q-pd-md">
                  <q-icon name="wine_bar" class="self-center " style="font-size: 42px;" color="primary" />

                  <q-item dense v-ripple>
                    <q-item-section side>
                      <q-item-section>
                        <q-item-label>
                          <span class="text-subtitle1"
                            ><b>{{ product.label }}</b></span
                          ></q-item-label
                        >
                        <q-item-label caption>Tamanho: {{ product.size }}L</q-item-label>
                        <q-item-label caption>Quantidade: {{ product.quantity }}L</q-item-label>
                        <q-item-label caption>Preço Un.: R${{ product.price * product.quantity }}</q-item-label>
                      </q-item-section>
                    </q-item-section>
                  </q-item>
                </div>
              </q-slide-item>
            </div>
          </q-scroll-area>
        </q-card-section>

        <q-card-actions align="right" class="q-mt-lg q-mb-xs">
          <q-btn flat label="Cancelar" color="primary" v-close-popup @click="onCancelButton" />
          <q-btn @click="onSubmit" label="Criar" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { ptBR } from 'src/i18n';
import { ERROR, SUCCESS } from 'src/configs/Notify';
import SelectCustomer from '../SelectCustomer.vue';
import SelectProducts from '../SelectProducts.vue';
// import customer from 'src/store/customer';

const { mapState } = createNamespacedHelpers('customer');
const { mapActions } = createNamespacedHelpers('order');

export default {
  components: {
    SelectCustomer,
    SelectProducts,
  },
  data() {
    return {
      cart: [],
      customer_info: null,

      always: true,
    };
  },

  computed: {
    ...mapState({
      customers: state => {
        return state.customers.map(({ name, address }) => {
          return {
            label: name,
            address,
          };
        });
      },
    }),
    totalPrice() {
      const cartValues = this.cart.map(({ price, quantity }) => {
        return price * quantity;
      });
      return cartValues.length !== 0
        ? cartValues.reduce((prev, next) => {
            return prev + next;
          })
        : 0;
    },
  },

  methods: {
    ...mapActions(['createOrderRequest']),
    onHideButton() {
      this.$emit('onHideButton');
    },
    onHandleRight(element, index) {
      this.cart.splice(index, 1);
      element.reset();
    },
    onHandleCustomerSelected(info) {
      this.customer_info = info;
    },
    addItemToCart(item) {
      this.cart.push(item);
    },
    onCancelButton() {
      this.$emit('onCancelButton');
    },
    onSubmit() {
      if (!this.customer_info) {
        this.$q.notify({
          ...ERROR,
          message: ptBR.errors.CUSTOMER_NOT_SELECTED,
        });
        return;
      }
      if (this.cart.length === 0) {
        this.$q.notify({
          ...ERROR,
          message: ptBR.errors.CART_EMPTY,
        });
        return;
      }

      this.createOrderRequest({
        // eslint-disable-next-line no-underscore-dangle
        customer_id: this.customer_info._id,
        products: this.cart,
        notes: '',
      })
        .then(() => {
          this.$q.notify({
            ...SUCCESS,
            message: ptBR.success.ORDER_CREATED_SUCCESS,
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
