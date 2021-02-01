<template>
  <Fragment>
    <q-item
      dense
      v-for="(product, index) in Object.values(product)"
      :key="`${product.name} - ${index}`"
    >
      <q-item-section avatar>
        <q-icon color="primary" :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ product.name }}</q-item-label>
        <q-item-label caption>
          {{ product.size }}L - {{ product.quantity }} - R${{
            product.price.toFixed(2)
          }}</q-item-label
        >
      </q-item-section>

      <div class="flex q-gutter-xs">
        <q-btn dense color="secondary" label="Editar" />
        <q-btn dense color="primary" label="Deletar" />
      </div>
    </q-item>
  </Fragment>
</template>

<script>
export default {
  props: ['product', 'icon'],
};
</script>

<style></style>
