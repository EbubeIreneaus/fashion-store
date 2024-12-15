<script setup lang="ts">
import { inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useCartStore } from 'src/stores/cart';

const api = inject('api');
const route = useRoute();
const router = useRouter();
const $q = useQuasar();


const { tx_ref: salesId, status, transaction_id } = route.query;

if (status === 'completed') {
  fetch(`${api}/store/sale/updatePayment`, {
    method: 'post',
    body: JSON.stringify({ salesId, status, transaction_id }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        $q.notify({
          color: 'green-10',
          textColor: 'white',
          icon: 'check_circle',
          iconColor: 'green-14',
          message: 'Your order has been updated. Redirecting...',
          position: 'top-right'
        });
        return true;
      }
      $q.notify({
        color: 'red-3',
        textColor: 'red-14',
        icon: 'error',
        iconColor: 'red-14',
        message: 'Unknown error occured. Redirecting...',
        position: 'top-right'
      });
      return false
    })
    .catch((error) => {
      $q.notify({
        color: 'red-3',
        textColor: 'red-14',
        icon: 'error',
        iconColor: 'red-14',
        message: 'Unknown error ' + error.message +' occured. Redirecting...',
        position: 'top-right'
      });
      return false;
    }).finally(() => {
      useCartStore().empty()
      return router.push('/shop')
    });
}
</script>
<template>
  <div class="tw-w-screen tw-h-dvh">
    <div class="tw-h-full tw-w-full">
      <q-dialog
        :model-value="true"
        v-if="status === 'completed'"
        persistent
        flat
      >
        <q-card class="tw-max-w-xl tw-w-full tw-border">
          <q-card-section>
            <div class="tw-text-center">
              <q-icon name="fas fa-spinner" size="lg" class="tw-animate-spin" />
              <p>Processing, please wait.....</p>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog :model-value="true" v-else persistent flat>
        <q-card class="tw-max-w-xl tw-w-full tw-border">
          <q-card-section>
            <div class="tw-text-center">
              <q-icon
                name="sentiment_dissatisfied"
                size="xl"
                color="red-6"
                class=""
              />

              <p class="tw-py-4">Your Payment was not successful..</p>

              <q-btn to="/cart" label="Go Back" unelevated color="accent" />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<style scoped></style>
