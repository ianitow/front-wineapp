<template>
  <div class="">
    <q-layout view="lHh lpr lFf">
      <q-header id="header" class="flex justify-center items-center text-center" style="height:100px;">
        <q-toolbar>
          <q-toolbar-title class="header-content">
            <router-link :to="'/'"> <img class="img-logo" src="../assets/logo.svg"/></router-link>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-page-container class="content">
        <transition appear enter-active-class="animated fadeInRight">
          <router-view />
        </transition>
      </q-page-container>
    </q-layout>
  </div>
</template>
<style lang="stylus" scoped>
#header{
  color:$primary;
  font-weight:bolder;
  background-color:white  !important;

  box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);
}
.content{
  background-color:rgba(200,200,200,0.1) !important;
}
.img-logo{
  width:50px;
}
.header-content{
  display:flex;
  align-items:center;
  justify-content:center;
}
</style>
