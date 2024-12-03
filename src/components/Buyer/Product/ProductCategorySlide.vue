<script lang="ts" setup>
const categories = [
  {
    title: 'Clothings',
    img: 'clothing.jpg',
    group: [
      { title: 'men clothing', subtitle: [], href: '/shop/clothing/men' },
      { title: 'women clothing', subtitle: [], href: '/shop/clothing/women' },
      { title: 'kids clothing', subtitle: [], href: '/shop/clothing/kids' },
      { title: 'seasonal', subtitle: [], href: '/shop/clothing/season' },
    ],
  },
  {
    title: 'Footwear',
    img: 'footware.jpg',
    group: [
      { title: 'men footwear', subtitle: [], href: '/shop/footwear/men' },
      { title: 'women footwear', subtitle: [], href: '/shop/footwear/women' },
      { title: 'kids footwear', subtitle: [], href: '/shop/footwear/kids' },
    ],
  },

  {
    title: 'Accessories',
    img: 'accessories.jpg',
    group: [
      { title: 'men accessories', subtitle: [], href: '/shop/accessories/men' },
      {
        title: 'women accessories',
        subtitle: [],
        href: '/shop/accessories/women',
      },
      {
        title: 'kids accessories',
        subtitle: [],
        href: '/shop/accessories/kids',
      },
      { title: 'unisex', subtitle: [], href: '/shop/accessories/unisex' },
    ],
  },
];
</script>

<template>
  <!-- Categories Section Begin -->
  <div class="container tw-mx-auto">
    <swiper-container
      class="categories q-my-xl"
      :slides-per-view="
        $q.screen.gt.lg
          ? 5
          : $q.screen.gt.md
          ? 4
          : $q.screen.gt.sm
          ? 3
          : $q.screen.gt.xs
          ? 2
          : 1
      "
      speed="500"
      :loop="true"
      space-between="30"
      :autoplay="true"
      pagination
    >
      <swiper-slide class="" v-for="cat in categories" :key="cat.title">
        <div class="category_container">
          <div class="category_content">
            <q-img :src="`/img/categories/${cat.img}`" class="img" alt="" />

            <div class="text-content text-white">
              <h1 class="text-h5 text-uppercase text-weight-bolder ">
                {{ cat.title }}
              </h1>

              <ul class="tw-px-2 tw-py-2">
                <li v-for="sub in cat.group" :key="sub.title">
                  <q-btn
                    flat
                    dense
                    :label="sub.title"
                    icon-right="arrow_right"
                    size="md"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
  <!-- Categories Section End -->
</template>

<style scoped lang="scss">
.category_container {
  height: 260px;
  position: relative;
  overflow: hidden;

  &:hover .img {
    transform: scale(1.3);
  }
  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 60%;
    background-color: transparentize($color: $accent, $amount: 0.3);
    content: '';
    z-index: 1;
    transform: skewX(-45deg);
    -webkit-transform: skewX(-45deg);
  }

  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 1px;
    width: 100%;
    background-color: transparentize($color: $accent, $amount: 0.3);
    transform: translateX(-100%) skewX(-45deg);
    -webkit-transform: skewX(-45deg) translateX(-100%);
    content: '';
  }

  .category_content {
    height: 100%;

    .img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.3s linear;
    }

    .text-content {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;
      padding: 15px 10px;

      li {
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 600;
      }
    }
  }
}
</style>
