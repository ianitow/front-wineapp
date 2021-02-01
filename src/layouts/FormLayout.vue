<template>
  <form @submit.prevent="onSubmit" class="container">
    <img class="img-logo" src="../assets/logo.svg" />

    <div class="form q-pt-xl q-px-xl">
      <slot></slot>
    </div>
  </form>
</template>

<script>
export default {
  props: ['onSubmit'],
  name: 'FormLayout',
};
</script>
<style lang="stylus" scoped>
.img-logo{
  position:absolute;
  top:20px;
  width:25%;
}
.form{
  border-top-right-radius:20px;
  border-top-left-radius:20px;
  background-color:white;
  width:100%;
  height:100%;
}
.container{
  display:flex;
  align-items:center;
  justify-content:center;
  padding-top:50%;

  background-color:$background;
}
.link{
  user-select:none
}
</style>
