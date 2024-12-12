<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { useQuasar } from 'quasar';
import { inject, ref } from 'vue';
import { date } from 'quasar';

const api = inject('api');
const $q = useQuasar();
const { formatDate, addToDate } = date;
const loading = ref(false)

const formatdDeliveryDate = (timeStamp: string) => {
  const newDate = addToDate(timeStamp, { days: 3 });
  return formatDate(newDate, 'ddd, Do MMM YYYY');
};

const orderTableColumn: QTableColumn[] = [
  {
    name: 'orderId',
    field: 'salesId',
    label: 'Order ID',
    sortable: true,
    align: 'left',
  },
  {
    name: 'amount',
    field: 'amount',
    label: 'Amount',
    align: 'left',
    sortable: true,
  },
  {
    name: 'Delivered',
    field: 'delivered',
    label: 'Delivered',
    sortable: true,
    align: 'left',
  },
  {
    name: 'date',
    field: 'createdAt',
    label: 'Date',
    sortable: true,
    align: 'left',
  },
  {
    name: 'delivery_date',
    field: '',
    label: 'Delivered On',
    sortable: true,
    align: 'left',
  },
];

const orderTableRows = ref([]);

(function getMyOrders() {
    loading.value = true
  fetch(`${api}/store/sale/orders`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${$q.cookies.get('authKey') as string}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        orderTableRows.value = data.data;
      }
    })
    .catch((error) => {
      console.error(error.messgae);
    }).finally(() => loading.value = false);
})();
</script>

<template>
  <q-page>
    <div class="tw-py-20 tw-px-5 tw-bg-slate-200">
      <q-table
        :columns="orderTableColumn"
        :rows="orderTableRows"
        square
        flat
        title="My Orders"
        separator="none"
        grid
        grid-header
        :loading="loading"
      >
        <template v-slot:body="props">
          <q-tr :props="props" :key="props.rowIndex">
            <q-td>#{{ props.row.salesId }}</q-td>

            <q-td><span v-naira="props.row.amount"></span></q-td>

            <q-td v-if="props.row.delivered"
              ><q-icon name="check_circle" color="green-14"
            /></q-td>

            <q-td v-else><q-icon name="cancel" color="red-14" /></q-td>

            <q-td>
              {{ formatDate(props.row.createdAt, 'ddd, Do MMM YYYY') }}</q-td
            >

            <q-td>
              <div class="tw-flex tw-items-center tw-gap-1">
                <span>{{ formatdDeliveryDate(props.row.createdAt) }}</span>
                <q-icon
                  v-if="props.row.delivered"
                  name="check_circle"
                  color="green-14"
                />
                <q-icon v-else name="update" color="red-14" />
              </div>
            </q-td>
          </q-tr>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card :props="props" flat>
              <q-card-section>
                <ul class="">
                  <li class="grid-title tw-text-black/50">Order Id</li>
                  <li class="grid-cnt tw-mb-3 text-accent">
                    <router-link :to="'/order/details?salesId=' + props.row.salesId"
                      >#{{ props.row.salesId }} <q-icon name="link"/></router-link
                    >
                  </li>

                  <li class="grid-title tw-text-black/50">Amount</li>
                  <li class="grid-cnt tw-mb-3">
                    <span v-naira="props.row.amount"></span>
                  </li>

                  <li class="grid-title tw-text-black/50">Delivered</li>
                  <li class="grid-cnt tw-mb-3">
                    <q-icon
                      name="check_circle"
                      color="green-14"
                      v-if="props.row.delivered"
                    />
                    <q-icon name="cancel" color="red-14" v-else />
                  </li>

                  <li class="grid-title tw-text-black/50">Date</li>
                  <li class="grid-cnt tw-mb-3">
                    {{ formatDate(props.row.createdAt, 'ddd, Do MMM YYYY') }}
                  </li>

                  <li class="grid-title tw-text-black/50">Delivered On</li>
                  <li class="grid-cnt">
                    {{ formatdDeliveryDate(props.row.createdAt) }}
                  </li>
                </ul>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<style>
header section {
  display: none !important;
}
</style>
<style scoped>
.grid-title {
  font-weight: bolder;
  text-transform: uppercase;
  font-size: small;
}
.grid-cnt {
  font-size: small;
}
</style>
