<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts" setup>
import type { Product} from 'app/types/product';
import { inject, ref, watch } from 'vue';
const props = defineProps<{ product: Product }>();
const api = inject('api')
const currentImg = ref<string>(props.product.image as string);

const images = [
  'img/featured/feature-2.jpg',
  'img/featured/feature-4.jpg',
  'img/featured/feature-3.jpg',
  'img/featured/feature-1.jpg',
  'img/featured/feature-5.jpg',
  'img/featured/feature-7.jpg',
  'img/featured/feature-6.jpg',
];

function updateImg(index: number) {
  currentImg.value = images[index];
}

watch(
  () => props.product.image,
  (newImg) => {
    currentImg.value = newImg as string;
  }
);
</script>

<template>
  <div class="">
    <div class="tw-p-5 tw-mx-auto tw-mb-5">
      <q-img :src="`${api}/assets/images/products/${currentImg}`" :alt="`Buy ${product.long_title || product.name} at 20% discount price`" />
    </div>
    <swiper-container
      class="tw-w-full q-pa-md"
      :slides-per-view="4"
      gap="5"
      :space-between="20"
      :autoplay="true"
      :speed="500"
    >
      <swiper-slide
        v-for="(img, index) in images"
        :key="index"
        class="tw-border"
      >
        <!-- <q-img :src="`/${img}`" class="" @click="() => updateImg(index)" /> -->
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style lang="css" scoped></style>
