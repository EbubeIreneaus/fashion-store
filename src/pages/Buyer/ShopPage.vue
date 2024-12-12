<!-- eslint-disable quotes -->
<script lang="ts" setup>
import BreadCrumbs from 'src/components/Buyer/BreadCrumbs.vue';
import SingleProduct from 'src/components/Buyer/Product/SingleProduct.vue';
import ShopSidebar from 'src/components/Buyer/ShopSidebar.vue';
import { useProduct } from 'src/stores/product';
// import { vAutoAnimate } from '@formkit/auto-animate';

import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import PreLoader from 'src/components/Buyer/Product/PreLoader.vue';

// const api = inject('api');



let current = ref(1);
let sort_by = ref<
  'price_up' | 'price_down' | 'rating' | 'purchase' | 'location' | ''
>('');

// default fetch product
// async function mm() {
//   try {
//     const req = await fetch(`${api}/api/product?limit=20`);
//     const res = await req.json();
//     if (res.status != 'success') {
//       console.error('Failed Fetching product from api', res.code);
//       return;
//     }
//     useProduct().shop = res.data;
//   } catch (error) {
//     console.error('ErrorFetching product from api', error);
//   }
// };

defineOptions({
  async preFetch({ store }) {
    const api = process.env.DEV
      ? 'http://localhost:3000/api'
      : 'https://sales-admin-server.financial-growths.com/api';
    const Store = useProduct(store);
    const res = await fetch(`${api}/store/product/featured?limit=72`).then(
      (res) => res.json()
    );
    Store.Shop = res.data || [];
  },
});

const { Shop } = storeToRefs(useProduct());

const isLoading = ref(false);

function sort_product() {
  isLoading.value = true;
  const timeOut = setTimeout(() => {
    if (sort_by.value === 'rating') {
      Shop.value?.sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (sort_by.value === 'price_down') {
      Shop.value?.sort((a, b) => b.market_price - a.market_price);
    } else if (sort_by.value === 'price_up') {
      Shop.value?.sort((a, b) => a.market_price - b.market_price);
    } else {
    }
    isLoading.value = false;
    clearTimeout(timeOut);
  }, 3000);
}

watch(sort_by, () => {
  sort_product();
});

function filteringInProgress() {
  document.querySelector('#product-list')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
  isLoading.value = true;
}

function endFiltering() {
  isLoading.value = false;
}
</script>

<template>
  <q-page>
    <BreadCrumbs title="shop" :navs="['home', 'shop']" />
    <div
      class="q-mx-auto tw-py-7 sm:tw-px-7 tw-px-4 tw-grid lg:tw-grid-cols-4 tw-gap-y-10 tw-gap-x-4"
    >
      <div class="lg:tw-col-span-1 tw-order-2 lg:tw-order-1">
        <ShopSidebar
          @start-filtering="filteringInProgress"
          @end-filtering="endFiltering"
        />
      </div>

      <div class="lg:tw-col-span-3 tw-order-1 lg:tw-order-2" id="product-list">
        <q-toolbar class="tw-bg-slate-50 tw-mb-5" style="border-style: inset">
          <div class="text-subtitle1" v-if="isLoading">
            Retrieving Product...
          </div>
          <div class="text-subtitle1" v-else>
            Found {{ Shop?.length }} Results
          </div>
          <q-space />
          <q-btn-dropdown
            unelevated
            dense
            :label="`sort by: ${sort_by}`"
            dropdown-icon="keyboard_arrow_down"
            class="tw-border tw-bg-white sm:tw-px-10 tw-px-2 tw-py-2"
          >
            <q-list>
              <q-item
                clickable
                v-ripple
                v-close-popup
                @click="sort_by = 'price_up'"
              >
                <q-item-section>Price &uparrow;</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                v-close-popup
                @click="sort_by = 'price_down'"
              >
                <q-item-section>Price &downarrow;</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                v-close-popup
                @click="sort_by = 'rating'"
              >
                <q-item-section>Rating</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>

        <div v-if="isLoading">
          <div
            class="tw-grid lg:tw-grid-cols-5 md:tw-grid-cols-4 sm:tw-grid-cols-3 tw-grid-cols-2 tw-gap-x-4 tw-gap-y-6"
            v-auto-animate
          >
            <div v-for="(_, index) in Shop?.length || 24" :key="index" class="">
              <PreLoader />
            </div>
          </div>
        </div>

        <div v-else>
          <div v-if="Shop && Shop.length > 0">
            <div
              class="tw-grid lg:tw-grid-cols-5 md:tw-grid-cols-4 sm:tw-grid-cols-3 tw-grid-cols-2 tw-gap-x-4 tw-gap-y-6"
              v-auto-animate
            >
              <div v-for="product in Shop" :key="product.id" class="">
                <SingleProduct :product="product" />
              </div>
            </div>
            <div class="tw-flex tw-justify-center tw-mt-12 mb-4" v-if="Shop.length >= 24"> 
              <q-pagination
                v-model="current"
                :max="10"
                :max-pages="5"
                color="grey-10"
                active-color="green-4"
                class="tw-font-semibold"
                direction-links
                size="md"
              />
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  </q-page>
</template>
