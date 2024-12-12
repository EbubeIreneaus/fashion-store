<script lang="ts" setup>
import BreadCrumbs from 'src/components/Buyer/BreadCrumbs.vue';
</script>

<template>
  <q-page>
    <BreadCrumbs title="About Us" :navs="['Home', 'About Us']" />
    <div>
      <div class="sm:tw-flex tw-items-center tw-max-w-screen-xl">
        <div class="sm:tw-w-1/2 tw-p-10">
          <div class="image tw-object-center tw-text-center">
            <img src="https://i.imgur.com/WbQnbas.png" alt="About Ireneaus Fashion Store" />
          </div>
        </div>
        <div class="sm:tw-w-1/2 tw-p-5">
          <div class="tw-text">
            <span
              class="tw-text-gray-500 tw-border-b-2 tw-border-green-600 indigo-600 tw-uppercase"
              >About us</span
            >
            <h2 class="tw-my-4 tw-font-bold tw-text-3xl tw-sm:text-4xl">
              About <span class="text-accent">Our Company</span>
            </h2>
            <p class="tw-text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
              commodi doloremque, fugiat illum magni minus nisi nulla numquam
              obcaecati placeat quia, repellat tempore voluptatum.
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
