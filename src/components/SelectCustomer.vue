<template>
  <q-select
    class="full-width"
    filled
    v-model="informations"
    use-input
    input-debounce="0"
    label="Digite o nome do cliente"
    :options="customersSearching"
    style="width: 250px"
    behavior="menu"
    :rules="[val => val || 'Por favor, digite algo']"
    @filter="filterFn"
    @input="onCustomerSelected"
  >
    <template v-slot:prepend>
      <q-icon name="person" />
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>
          <q-item-label v-html="scope.opt.label" />
          <q-item-label caption>{{ scope.opt.address }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import { ptBR } from 'src/i18n';

const { mapState, mapActions } = createNamespacedHelpers('customer');

export default {
  mounted() {
    this.getCustomersRequest().catch(err => {
      this.$q.notify({
        color: 'red',
        textColor: 'white',
        icon: 'warning',
        message: ptBR.errors[err.type],
        position: 'top',
      });
    });
  },
  data() {
    return {
      informations: {
        _id: '',
        label: '',
        address: '',
      },
      customersSearching: [],
    };
  },

  computed: {
    ...mapState({
      customers: state => {
        return state.customers.map(({ _id, name, address }) => {
          return {
            _id,
            label: name,
            address,
          };
        });
      },
    }),
  },

  methods: {
    ...mapActions(['getCustomersRequest']),
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.customersSearching = this.customers.map(({ label, address, _id }) => {
            return {
              label,
              address,
              _id,
            };
          });
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.customersSearching = this.customers.filter(({ label }) => {
          return label.toLowerCase().indexOf(needle) > -1;
        });
      });
    },
    onCustomerSelected() {
      this.$emit('onCustomerSelected', this.informations);
    },
  },
};
</script>
