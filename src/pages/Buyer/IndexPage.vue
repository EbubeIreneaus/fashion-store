<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import ProductCategorySlide from 'src/components/Buyer/Product/ProductCategorySlide.vue';
import SingleProduct from 'src/components/Buyer/Product/SingleProduct.vue';
import MiniSingleProduct from 'src/components/Buyer/Product/MiniSingleProduct.vue';
import { onMounted, ref } from 'vue';
import { useProduct } from 'src/stores/product';
// import type { Product } from 'app/types/product';
import HomeHeroSec from 'src/components/Buyer/HomeHeroSec.vue';
import { storeToRefs } from 'pinia';

const latest_slide_ref: any = ref(null);

const top_slide_ref: any = ref(null);

const review_slide_ref: any = ref(null);
// const api = inject('api');

// get product from server
defineOptions({
  async preFetch({ store }) {
    try {
      const api = process.env.DEV ? 'http://localhost:3000/api' : 'https://sales-admin-server.financial-growths.com/api';
      let Store = useProduct(store);

      const featured = await fetch(`${api}/store/product/featured?limit=24`, {
        credentials: 'include',
      }).then((res) => res.json());

      const latest = await fetch(`${api}/store/product/latest?limit=8`, {
        credentials: 'include',
      }).then((res) => res.json());

      const rated = await fetch(`${api}/store/product/rated?limit=8`, {
        credentials: 'include',
      }).then((res) => res.json());


      Store.Featured = featured.data || []
      Store.Latest = latest.data || []
      Store.Rated = rated.data || []

    } catch (error: any) {
      console.log(error.message);
    }
  },
});

const { Featured, Latest, Rated } = storeToRefs(useProduct());

function latest_slide_next() {
  latest_slide_ref.value.swiper.slideNext();
}
function latest_slide_prev() {
  latest_slide_ref.value.swiper.slidePrev();
}

function top_slide_next() {
  top_slide_ref.value.swiper.slideNext();
}
function top_slide_prev() {
  top_slide_ref.value.swiper.slidePrev();
}

function review_slide_next() {
  review_slide_ref.value.swiper.slideNext();
}
function review_slide_prev() {
  review_slide_ref.value.swiper.slidePrev();
}
onMounted(() => {
  console.log('all product', useProduct().products);
});
</script>

<template>
  <q-page class="">
    <HomeHeroSec />

    <product-category-slide />

    <!-- Featured Section Begin -->
    <section class="featured spad">
      <div class="container tw-mx-auto">
        <div class="tw-flex tw-justify-center">
          <div class="col-lg-12">
            <div class="section-title">
              <h2>Featured Product</h2>
            </div>
          </div>
        </div>
        <div
          class="tw-grid lg:tw-grid-cols-6 md:tw-grid-cols-4 sm:tw-grid-cols-3 tw-grid-cols-2 lg:tw-gap-6 md:tw-gap-4 tw-gap-3 tw-p-3 lg:tw-p-0"
        >
          <single-product
            :product="product"
            v-for="product in Featured"
            :key="product.id"
          />
        </div>
      </div>
    </section>
    <!-- Featured Section End -->

    <!-- Banner Begin -->
    <div class="banner">
      <div class="container tw-mx-auto">
        <div class="tw-grid md:tw-grid-cols-2 tw-gap-3">
          <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="banner__pic">
              <q-img src="img/banner/banner-1.jpg" alt="" />
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="banner__pic">
              <q-img src="img/banner/banner-2.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Banner End -->

    <!-- Latest Product Section Begin -->
    <section class="tw-mt-20">
      <div class="container tw-mx-auto">
        <div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-2">
          <div class="">
            <div class="latest-product__text">
              <div class="tw-flex tw-justify-between q-px-md">
                <h4>Latest Products</h4>
                <div>
                  <q-btn
                    icon="arrow_back_ios"
                    dense
                    unelevated
                    size="sm"
                    @click="latest_slide_prev"
                  ></q-btn>
                  &nbsp;
                  <q-btn
                    icon="arrow_forward_ios"
                    dense
                    unelevated
                    size="sm"
                    @click="latest_slide_next"
                  ></q-btn>
                </div>
              </div>
              <swiper-container
                :loop="true"
                :autoplay="true"
                slides-per-view="1"
                :speed="1000"
                class=""
                ref="latest_slide_ref"
              >
                <swiper-slide class="">
                  <mini-single-product
                    v-for="product in Latest?.slice(0, 4)"
                    :key="product.id"
                    :product="product"
                  />
                </swiper-slide>
                <swiper-slide class="">
                  <mini-single-product
                    v-for="product in Latest?.slice(4, 8)"
                    :key="product.id"
                    :product="product"
                  />
                </swiper-slide>
              </swiper-container>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="latest-product__text">
              <div class="latest-product__text">
                <div class="row justify-between q-px-md">
                  <h4>Top Rated</h4>
                  <div>
                    <q-btn
                      icon="arrow_back_ios"
                      dense
                      unelevated
                      size="sm"
                      @click="top_slide_prev"
                    ></q-btn>
                    &nbsp;
                    <q-btn
                      icon="arrow_forward_ios"
                      dense
                      unelevated
                      size="sm"
                      @click="top_slide_next"
                    ></q-btn>
                  </div>
                </div>
                <swiper-container
                  :loop="true"
                  :autoplay="true"
                  slides-per-view="1"
                  :speed="1000"
                  class="latest-product__slider"
                  ref="top_slide_ref"
                >
                  <swiper-slide class="">
                    <mini-single-product
                      v-for="product in Rated?.slice(0, 4)"
                      :key="product.id"
                      :product="product"
                    />
                  </swiper-slide>
                  <swiper-slide>
                    <mini-single-product
                      v-for="product in Rated?.slice(4, 8)"
                      :key="product.id"
                      :product="product"
                    />
                  </swiper-slide>
                </swiper-container>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="latest-product__text">
              <div class="latest-product__text">
                <div class="row justify-between q-px-md">
                  <h4>Review Products</h4>
                  <div>
                    <q-btn
                      icon="arrow_back_ios"
                      unelevated
                      size="sm"
                      dense
                      @click="review_slide_prev"
                    ></q-btn>
                    &nbsp;
                    <q-btn
                      icon="arrow_forward_ios"
                      unelevated
                      size="sm"
                      dense
                      @click="review_slide_next"
                    ></q-btn>
                  </div>
                </div>
                <swiper-container
                  :loop="true"
                  :autoplay="true"
                  slides-per-view="1"
                  :speed="1000"
                  class="latest-product__slider"
                  ref="review_slide_ref"
                >
                  <swiper-slide class="">
                    <mini-single-product
                      v-for="product in Featured?.slice(8, 12)"
                      :key="product.id"
                      :product="product"
                    />
                  </swiper-slide>
                  <swiper-slide class="">
                    <mini-single-product
                      v-for="product in Featured?.slice(12, 16)"
                      :key="product.id"
                      :product="product"
                    />
                  </swiper-slide>
                </swiper-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Latest Product Section End -->
  </q-page>
</template>

<style lang="scss" scoped></style>
