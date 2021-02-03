<template>
  <div>
    <q-list
      bordered
      v-for="([key, value], indexTwo) in Object.entries(products)"
      :key="`${key} - ${indexTwo}`"
      class="q-mb-xs"
    >
      <q-expansion-item
        dense
        :group="`${key}`"
        :icon="iconHeader"
        :label="key"
        header-class="text-primary"
      >
        <product-item :icon="icon" :product="value" />
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['iconHeader', 'icon', 'products'],
};
</script>

<style lang="stylus" scoped></style>
