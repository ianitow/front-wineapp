<template>
  <form-layout :onSubmit="onSubmit">
    <transition-group
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div key="intern">
        <div class="row q-mb-lg">
          <span class="text-h5">Faça seu login</span>
        </div>
        <div class="row">
          <div class="col q-gutter-y-md">
            <q-input
              v-model="name"
              class="full-width "
              outlined
              label="Nome Completo"
              required
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              type="email"
              required
              maxlength="30"
              v-model="email"
              class="full-width "
              outlined
              label="Email"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
            <q-input
              v-model="password"
              maxlength="15"
              type="password"
              class="full-width"
              outlined
              required
              label="Password"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <q-input
              maxlength="40"
              v-model="address"
              class="full-width "
              outlined
              required
              label="Address"
            >
              <template v-slot:prepend>
                <q-icon name="home" />
              </template>
            </q-input>
            <q-input
              v-model="numberPhone"
              maxlength="11"
              type="tel"
              class="full-width "
              outlined
              required
              label="Number phone"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
            <q-btn
              type="submit"
              class="btn-sbmt full-width"
              color="primary"
              label="Register"
            />
          </div>
        </div>
        <div class="row q-my-xl">
          <span class="col text-subtitle2 text-center">
            Não possui login?
            <span class="text-primary link" @click="goTo"
              >Faça login</span
            ></span
          >
        </div>
      </div>
    </transition-group>
  </form-layout>
</template>

<script>
import FormLayout from 'src/layouts/FormLayout.vue';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      address: '',
      numberPhone: '',
    };
  },
  components: { FormLayout },
  methods: {
    ...mapActions('account', ['registerRequest']),
    goTo() {
      this.$router.push({ name: 'LoginForm' });
    },
    onSubmit() {
      this.registerRequest({
        name: this.name,
        email: this.email,
        password: this.password,
        address: this.address,
        numberPhone: this.numberPhone,
      })
        .then(options => {
          this.$q.notify({
            timeout: 1000,
            ...options,
          });
          this.$router.push({ name: 'Dashboard' });
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            ...err,
            timeout: 3000,
          });
        });
    },
  },
};
</script>

<style lang="stylus" scoped>

.btn-sbmt{
  border-radius:5px
  height:60px;
}
</style>
