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
              required
              type="email"
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
              type="password"
              class="full-width"
              outlined
              label="Password"
              required
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <q-btn
              type="submit"
              class="btn-sbmt full-width"
              color="primary"
              label="Login"
            />
          </div>
        </div>
        <div class="row q-my-xl">
          <span class="col text-subtitle2 text-center">
            Não possui login?
            <span class="text-primary link" @click="goTo"
              >Crie uma conta</span
            ></span
          >
        </div>
      </div>
    </transition-group>
  </form-layout>
</template>

<script>
import FormLayout from 'src/layouts/FormLayout.vue';
import { QSpinnerGears } from 'quasar';
import { mapActions } from 'vuex';

export default {
  components: { FormLayout },

  data() {
    return {
      email: 'ianito@protonmail.com',
      password: '123321',
    };
  },
  methods: {
    ...mapActions('account', ['loginRequest']),
    goTo() {
      this.$router.push({ name: 'RegisterForm' });
    },
    onSubmit() {
      this.loginRequest({
        email: this.email,
        password: this.password,
      })
        .then(options => {
          const { token } = options;
          window.localStorage.setItem('token', JSON.stringify(token));

          this.$q.notify({
            spinner: QSpinnerGears,
            timeout: 1000,
            ...options,
          });
          this.$router.push({ name: 'Dashboard' });
        })
        .catch(err => {
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
