<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
// import { onMounted } from 'vue';
import { Product } from 'app/types/product';
import { useCartStore } from 'src/stores/cart';
import { computed, inject } from 'vue';
import { useQuasar } from 'quasar';

defineProps<{ product: Product }>();

const api = inject('api');
const $q = useQuasar()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cart = computed(() => useCartStore());

const {add: cartAdd} = useCartStore()

function addToCart(product:Product) {
  cartAdd(product)
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
  <div class="tw-bg-slate-50 product-card tw-shadow-md">
    <section>
      <div class="top-image">
        <div class="image-wrapper">
          <div class="discount" v-if="product.market_price > 1000">
            <div
              class="tw-bg-red-600 tw-w-fit tw-text-white tw-px-1 tw-rounded-sm tw-rounded-tl-[8px] tw-text-sm"
            >
              -20%
            </div>
          </div>
          <q-img
            :src="`${api}/assets/images/products/${product.image}`"
            :alt="`${product.sub_category}: ${
              product.long_title || product.name
            }`"
            class="image tw-w-full"
          />
        </div>
      </div>
    </section>
    <section>
      <div class="description tw-px-1.5 tw-py-1">
        <div class="tw-flex tw-justify-between tw-h-[25px]">
          <h3 class="tw-line-clamp-2 tw-text-ellipsis tw-px-1">
           <router-link :to="`/product/${product.id}`"> {{ product.long_title ?? product.name }}</router-link>
          </h3>
          <div
            class=" tw-font-bold text-accent"
            v-naira-summerize="product.market_price"
          ></div>
        </div>
      </div>
      <div class="tw-py-1.5"></div>
      <div class="tw-py-1">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div
            class="tw-flex tw-items-center tw-gap-2"
            :class="product.rating.rate < 3 ? 'text-red-14' : 'text-green-14'"
          >
            <q-icon name="star" class="tw-ms-2 tw-block" />
            <span>{{ product.rating.rate.toFixed(1) }}</span>
          </div>
          <div>
            <q-btn flat icon="shopping_cart" color="accent" @click="addToCart(product)"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  border-radius: 10px;
  max-width: 300px;
}

.top-image {
  .image-wrapper {
    overflow: hidden;
    position: relative;

    &::before {
      content: '';
      top: 0;
      bottom: 0;
      width: 100%;
      position: absolute;
      z-index: 1;
      border-radius: 10px 10px 15px 15px;
      background-color: transparentize($color: #000000, $amount: 0.6);
    }

    &:hover .image {
      transform: scale(1.3);
    }

    .discount {
      position: absolute;
      z-index: 2;
    }

    .image {
      width: 100%;
      border-radius: 10px 10px 15px 15px;
      height: 200px;
      object-fit: cover;
      object-position: center;
      transition: transform 0.3s linear;
    }
  }
}

.description {
  h3 {
    font-size: 14px;
    height: fit-content;
    line-height: normal;
    text-transform: capitalize;
    font-weight: 700;
  }
}
</style>
