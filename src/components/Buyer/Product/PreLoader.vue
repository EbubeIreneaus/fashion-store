<template>
  <div class="tw-bg-slate-50 product-card tw-shadow-md">
    <q-skeleton height="200px" />
    <div class="tw-flex tw-justify-between tw-items-center tw-gap-x-3">
      <div class="tw-flex-grow"><q-skeleton type="text" /></div>
      <div><q-skeleton type="text" width="50px" /></div>
    </div>
    <br />
    <div class="tw-flex tw-justify-between tw-items-center tw-gap-x-3 tw-p-2">
      <div class="tw-flex tw-items-center tw-gap-3">
        <q-icon name="star" color="red-14" />
        <q-skeleton type="text" width="50px" />
      </div>
      <div><q-skeleton type="QBtn" width="50px" /></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.product-card {
  border-radius: 10px;
  max-width: 300px;
}
</style>
