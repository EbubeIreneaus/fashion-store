<script lang="ts" setup>
import { Product } from 'app/types/product';
import { storeToRefs } from 'pinia';
import BreadCrumbs from 'src/components/Buyer/BreadCrumbs.vue';
import { useFavStore } from 'src/stores/favourite';
import { useCartStore } from 'src/stores/cart';
// import { vAutoAnimate } from '@formkit/auto-animate'
import { inject, ref } from 'vue';
const api = inject('api');
const FavStore = useFavStore()
const { favorite } = storeToRefs(FavStore);
const { add: addToCart } = useCartStore();
const products = ref<Product[]>([]); //favorite product

(function getProducts() {
  fetch(`${api}/store/favorite/products?p=${favorite.value.toString()}`)
    .then((res) => res.json())
    .then((data) => {
      products.value = data.data;
    })
    .catch((error) => console.log(error.message));
})();

function favBtnClicked(id: number){
  const index = products.value.findIndex(pr=> pr.id == id)
  if (index != -1) {
    products.value.splice(index, 1)
    FavStore.updateFavorite(id)
  }
}
</script>

<template>
  <q-page>
    <BreadCrumbs title="Favorite" :navs="['Home', 'Shop', 'Favorite']" />
    <div class="tw-h-24 tw-mt-5" v-if="products.length < 1">
      <div class="tw-h-full tw-grid tw-place-content-center ">
        <p class="tw-text-balance tw-font-serif ">No product found. <RouterLink to="/shop" class="text-accent">Browse Product</RouterLink></p>
      </div>
    </div>

    <div class="tw-my-10 tw-mx-auto q-px-md" v-else>
      <div>
        <div class="!tw-overflow-x-auto">
          <div
            class="lg:tw-max-w-5xl md:tw-max-w-3xl tw-max-w-2xl tw-mx-auto tw-block"
            v-auto-animate
          >
            <div class="tw-w-full tw-overflow-x-auto">
              <div class="">
                <div
                  v-for="ct in products"
                  :key="ct.id"
                  class="tw-bg-slate-50 tw-rounded-lg tw-mb-3 tw-px-2"
                >
                  <div
                    class="tw-grid md:tw-grid-cols-4 tw-grid-cols-1 tw-gap-y-4 md:tw-items-center"
                  >
                    <div class="tw-py-3 tw-font-semibold">
                      <q-img
                        :src="`${api}/assets/images/products/${ct.image}`"
                        class="tw-w-16 tw-rounded-lg"
                        :alt="ct.long_title || ct.name"
                      />
                    </div>
                    <div class="md:tw-py-7 tw-font-semibold text-accent">
                      <router-link
                        :to="'/product/' + ct.id"
                        class="tw-capitalize"
                        >{{ ct.long_title || ct.name }}</router-link
                      >
                    </div>
                    <div>
                      <span v-naira="ct.market_price"></span>
                    </div>

                    <div>
                      <div
                        class="tw-flex tw-items-center tw-gap-x-2 tw-font-bold"
                      ></div>
                      <q-btn
                        label="add to cart"
                        dense
                        flat
                        no-caps
                        :ripple="false"
                        text-color="green-14"
                        @click="addToCart(ct)"
                        class="!tw-p-0"
                      >
                        <q-tooltip>add {{ ct.name }} to cart</q-tooltip>
                      </q-btn>
                      <q-btn
                        label="remove from favorite"
                        dense
                        flat
                        no-caps
                        :ripple="false"
                        text-color="red-14"
                        @click="favBtnClicked(ct.id)"
                        class="!tw-p-0 tw-block"
                      >
                        <q-tooltip
                          >remove {{ ct.name }} from favorite</q-tooltip
                        >
                      </q-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
