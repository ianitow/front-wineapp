<template>
  <div>
    <q-list
      class="orders q-mb-sm"
      dense
      v-for="(order, index) in orders"
      :key="`${order.name} - ${index}`"
    >
      <order-item :order="order" />
    </q-list>
  </div>
</template>
<style lang="stylus" scoped>
.orders
{
  background-color:transparent;
  font-weight:lighten;
  font-size:10pt
}
</style>
<script>
import OrderItem from './OrderItem.vue';

export default {
  components: { OrderItem },
  props: ['orders'],
  methods: {},
};
</script>

<style lang="stylus" scoped></style>
