<template>
  <div>
    <q-list
      class="customers q-mb-sm"
      dense
      v-for="(customer, index) in customers"
      :key="`${customer.name} - ${index}`"
    >
      <customer-item :icon="icon" :customer="customer" />
    </q-list>
  </div>
</template>
<style lang="stylus" scoped>
.customers{
  background-color:transparent;
font-weight:lighten;
font-size:10pt
}
</style>
<script>
import CustomerItem from './CustomerItem.vue';

export default {
  components: { CustomerItem },
  props: ['icon', 'customers'],
};
</script>

<style lang="stylus" scoped></style>
