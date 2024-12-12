<script setup lang="ts">
import { date } from 'quasar';
import { inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { salesId } = useRoute().query;
const router = useRouter();
const api = inject('api');
const {formatDate, addToDate} = date
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sale = ref({} as any);

const formatdDeliveryDate = (timeStamp: string) => {
  const newDate = addToDate(timeStamp, { days: 3 });
  return formatDate(newDate, 'ddd, Do MMM YYYY');
};

if (!salesId) {
  router.back();
};

(function getSale() {
  fetch(`${api}/store/sale/orderDetails?salesId=${salesId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        return sale.value = data.data;
      }
    })
    .catch((err) => console.error(err.message));
})()
</script>
<template>
  <q-page>
    <div class="tw-py-12 tw-bg-slate-200">
        <q-card class="tw-max-w-xl tw-w-full tw-mx-auto">
            <q-card-section>
                <ul class="tw-grid tw-grid-cols-2">
                  <li class="grid-title tw-text-black/50">Order Id</li>
                  <li class="grid-cnt tw-mb-3 text-accent">
                     #{{ sale.salesId }}
                  </li>

                  <li class="grid-title tw-text-black/50">Amount</li>
                  <li class="grid-cnt tw-mb-3">
                    <span v-naira="sale.amount"></span>
                  </li>

                  <li class="grid-title tw-text-black/50">Paid</li>
                  <li class="grid-cnt tw-mb-3">
                    <q-icon
                      name="check_circle"
                      color="green-14"
                      v-if="sale.paid"
                    />
                    <q-icon name="cancel" color="red-14" v-else />
                  </li>

                  <li class="grid-title tw-text-black/50">Delivered</li>
                  <li class="grid-cnt tw-mb-3">
                    <q-icon
                      name="check_circle"
                      color="green-14"
                      v-if="sale.delivered"
                    />
                    <q-icon name="cancel" color="red-14" v-else />
                  </li>

                  <li class="grid-title tw-text-black/50">Date</li>
                  <li class="grid-cnt tw-mb-3">
                    {{ formatDate(sale.createdAt, 'ddd, Do MMM YYYY') }}
                  </li>

                  <li class="grid-title tw-text-black/50">Delivered On</li>
                  <li class="grid-cnt" v-if="sale.paid">
                    {{ formatdDeliveryDate(sale.createdAt) }}
                  </li>
                  <li class="grid-cnt" v-else>Nill</li>
                </ul>
            </q-card-section>
            <q-card-section>
                <div>
                    <p  class="tw-font-bold text-body1">Product Details</p>
                    <ol>
                        <li v-for="sp, index in sale.sold_products" :key="index" class="tw-mb-3">
                            <div class="tw-flex tw-gap-3">
                                <span class="text-capitalize tw-font-semibold">{{ sp.product.name }} x {{ sp.quantity }}</span>
                                <span v-naira="sp.amount"></span>
                            </div>

                        </li>
                    </ol>
                </div>
            </q-card-section>
            <q-card-actions>
                <q-btn icon="reviews" label="rate our service" flat dense color="accent" href="#"></q-btn>
            </q-card-actions>
        </q-card>
    </div>
</q-page>
</template>

<style scoped>
.grid-title {
  font-weight: bolder;
  text-transform: uppercase;
  font-size: small;
}
.grid-cnt {
  font-size: small;
}

ol{
    list-style-type: disc;
    padding: 0 20px;
}
</style>
