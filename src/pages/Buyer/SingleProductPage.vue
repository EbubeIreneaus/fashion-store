<script lang="ts" setup>
// import { useRoute } from 'vue-router';
import BreadCrumbs from 'src/components/Buyer/BreadCrumbs.vue';
import { ref } from 'vue';
import { useProduct } from 'src/stores/product';
import ProductImageSlide from 'src/components/Buyer/Product/ProductImageSlide.vue';
import ReviewsComp from 'src/components/Buyer/Product/ReviewsComp.vue';
import { useCartStore } from 'src/stores/cart';
import { storeToRefs } from 'pinia';
import { Product } from 'app/types/product';
import { useQuasar } from 'quasar';

const $q = useQuasar()
const {add: cartAdd} = useCartStore()

const { Product: product } = storeToRefs(useProduct());

const carting = ref(1);

defineOptions({
  async preFetch({ store, currentRoute }) {
    const Store = useProduct(store);
    const {id} = currentRoute.params
    const api = process.env.DEV
      ? 'http://localhost:3000/api'
      : 'https://sales-admin-server.financial-growths.com/api';

    await fetch(`${api}/store/product/single?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Store.Product = data.product;
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  },
});

function addToCart(product:Product) {
  cartAdd(product, carting.value)
  $q.notify({
    color: 'accent',
    icon: 'check_circle',
    position: 'top-right',
    textColor: 'white',
    message: 'Product added to cart.',
    timeout: 1000
  })
}
</script>

<template>
  <q-page>
    <BreadCrumbs :title="'micheal'" :navs="['shop', 'product details']" />

    <q-card flat square v-if="product">
      <q-card-section class="">
        <div
          class="tw-grid lg:tw-grid-cols-2 tw-grid-cols-1 tw-gap-y-6 container tw-mx-auto tw-my-6"
        >
          <div class="">
            <ProductImageSlide :product="product" />
          </div>
          <div class="tw-my-10 md:tw-px-5">
            <div class="">
              <h1 class="tw-text-3xl tw-font-bold tw-uppercase tw-mb-4">
                {{ product.long_title || product.name }}
              </h1>

              <div class="tw-mb-5">
                <q-rating
                  v-model="product.rating.rate"
                  size="medium"
                  readonly
                  :color="product.rating.rate >= 3 ?'green-14': 'red-14'"
                
                />
                <div class="tw-inline tw-ms-6 tw-font-semibold tw-text-lg">
                  ( {{ product.rating.count }} Reviews)
                </div>
              </div>

              <div class="tw-mb-5">
                <del class="text-h6 text-weight-bold text-grey-6"
                  ><span v-naira="product.market_price"></span
                ></del>
                <span
                  v-naira="(0.3 * product.market_price) + Number(product.market_price)"
                  class="text-h5 text-weight-bold tw-ps-5"
                ></span>
              </div>

              <div class="tw-mb-5 tw-ps-5">
                <div class="text-body1 tw-text-balance tw-font-semibold" v-html="product.desc">
                 
                </div>
              </div>

              <div class="tw-flex tw-flex-wrap tw-gap-5">
                <div class="tw-flex tw-border tw-w-fit">
                  <q-btn
                    icon="remove"
                    unelevated
                    color="red-14"
                    @click="carting--"
                    :disable="carting < 1"
                  />
                  <q-input
                    v-model="carting"
                    standout
                    borderless
                    class="tw-w-20"
                    input-style="text-align: center"
                   
                  />
                  <q-btn
                    icon="add"
                    unelevated
                    color="green-14"
                    @click="carting++"
                    :disable="carting >= product.quantity"
                  />
                </div>
                <div>
                  <q-btn
                   label="add to cart"
                    class="tw-h-full"
                    unelevated
                    color="accent"
                    @click="addToCart(product)"
                   
                  />
                </div>
                <q-btn icon="favorite" class="tw-bg-slate-100" unelevated />
              </div>
            </div>

            <q-separator class="tw-my-12" />
            <div>
              <q-list>
                <q-item>
                  <q-item-section class="text-weight-bold tw-uppercase"
                    >Stock</q-item-section
                  >
                  <q-item-section>({{ product.quantity }})</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section class="tw-uppercase tw-font-bold"
                    >Delivery</q-item-section
                  >
                  <q-item-section class="tw-capitalize"
                    >free for all user around abuja, FREE PICKUP IF YOU PLACE
                    YOUR ORDER TODAY
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section class="tw-uppercase tw-font-bold"
                    >Weight</q-item-section
                  >
                  <q-item-section class="tw-capitalize">Nill</q-item-section>
                </q-item>
                
                <q-item>
                  <q-item-section class="tw-uppercase tw-font-bold"
                    >Brand</q-item-section
                  >
                  <q-item-section class="tw-capitalize"
                    ><div class="tw-uppercase tw-font-semibold">
                     Gucci
                    </div>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section class="tw-uppercase tw-font-bold"
                    >Seller</q-item-section
                  >
                  <q-item-section class="tw-capitalize"
                    ><div class="tw-uppercase tw-font-semibold">
                     Ireneaus Fashion Store
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="md::tw-p-10">
          <div class="container tw-mx-auto">
            <h3 class="tw-font-bold tw-uppercase tw-mb-3">Reviews</h3>
            <div>
              <ReviewsComp />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="css" scoped></style>
