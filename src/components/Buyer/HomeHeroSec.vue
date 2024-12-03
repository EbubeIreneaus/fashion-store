<script setup lang="ts"></script>

<template>
  <div class="hero__item md:tw-ps-[75px] tw-ps-7">
    <div class="hero__text text-white">
      <span>Style Yourself Confidently</span>
      <h2>Premium Quality, Affordable Prices</h2>
      <p>Free Pickup and Delivery Available</p>
      <router-link to="/" href="#" class="primary-btn">START SHOPING NOW</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero__item {
  background-image: url('/img/hero/banner.jpg');
  background-position: center;
  background-size: cover;
  position: relative !important;
  height: 431px;
  display: flex;
  align-items: center;


  &::before {
    position: absolute !important;
    top: 0;
    left: 0;
    background-color: transparentize($color: #000000, $amount: 0.3) !important;
    width: 100%;
    height: 100%;
    z-index: 0;
    content: '';
  }

  .hero__text {
    position: absolute;
    color: white !important;
    z-index: 1;
    span {
      font-size: 16px;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 4px;
      color: $accent;
    }

    h2 {
      font-size: 46px;
      line-height: 52px;
      font-weight: 700;
      margin: 10px 0;
    }
    p {
      margin-bottom: 35px;
    }
  }
}
</style>
