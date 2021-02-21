<template>
  <div class="button-container flex items-center justify-center" @click="onClickOnCard">
    <div class="col flex items-center justify-center">
      <div class="row full-width flex text-weight-bold items-center justify-center q-mb-xs">
        <q-icon :name="icon" size="lg"></q-icon>
      </div>
      <div class="row">
        <span class="text-weight-bold text-center text-subtitle">{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'icon', 'routeName'],
  methods: {
    onClickOnCard() {
      this.$router.push(this.routeName);
    },
  },
};
</script>

<style lang="stylus" scoped>
.button-container{
  user-select:none;
  color:$primary;
  width:120px;
  height:120px;
  border-radius:10px;
  background-color:white;
  box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);
  }
  .button-container:hover{
    cursor:pointer
    background-image: linear-gradient( 69.7deg,  rgba(216,81,82,1) 40%, $primary 100.1% );
    color:white;
    }
</style>
