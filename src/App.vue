<template>
  <router-view />
</template>

<script setup lang="ts">
import { provide } from 'vue';

defineOptions({
  name: 'App',
});

 const api = process.env.DEV ? 'http://localhost:3000/api' : 'https://sales-admin-server.financial-growths.com/api';

provide('api', api)
</script>

