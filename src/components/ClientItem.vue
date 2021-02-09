<template>
  <div>
    <q-slide-item @left="onLeft" @right="onRight" right-color="primary" left-color="yellow">
      <template v-slot:right>
        <q-icon color="white" name="delete" />
      </template>
      <template v-slot:left>
        <q-icon color="white" name="delete" />
      </template>

      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-icon :name="icon" />
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ user.name }}</q-item-section>
      </q-item>
    </q-slide-item>
  </div>
</template>
<script>
export default { props: ['icon', 'user'] };
</script>
