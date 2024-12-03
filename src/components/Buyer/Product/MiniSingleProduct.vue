<script lang="ts" setup>
import { Product } from 'app/types/product';
import { inject } from 'vue';

defineProps<{ product: Product }>();

const api = inject('api');
</script>

<template>
  <div class="q-pa-sm text-black main tw-bg-slate-50">
    <div class="image-wrapper">
      <q-img
        :src="`${api}/assets/images/products/${product.image}`"
        :alt="`${product.sub_category}: ${product.long_title || product.name}`"
        style="height: 100%; width: 100%"
        class="image"
      />
    </div>
    <div class="ctx">
      <h6 class="tw-line-clamp-2 text-capitalize text-weight-bold">
        <router-link :to="`/product/${product.id}`">{{
          product.long_title || product.name
        }}</router-link>
      </h6>
      <div>
        <div class="tw-flex tw-justify-between tw-items-center">
          <div v-naira="product.market_price" class="tw-font-semibold"></div>
          <div class="tw-flex tw-items-center tw-gap-x-3">
            <div
              class="tw-flex tw-items-center tw-gap-x-1 tw-text-xs"
              :class="product.rating.rate < 3 ? 'text-red-14' : 'text-green-14'"
            >
              <q-icon name="star" class="tw-block" />
              <span>{{ product.rating.rate.toFixed(1) }}</span>
            </div>
            <div>
              <q-btn flat dense icon="shopping_cart" color="accent" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  gap: 20px;

  &:hover .image {
    transform: scale(1.3);
  }

  .image-wrapper {
    width: 100px;
    height: 100px;
    overflow: hidden;

    .image {
      object-fit: cover;
      object-position: center;
      transition: all 0.3s linear;
    }
  }
  .ctx {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
  }
}

a {
  &:hover {
    color: $accent;
  }
}
</style>
