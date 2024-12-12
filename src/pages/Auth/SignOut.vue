<script lang="ts">
import { Cookies } from 'quasar';


export default {
  async preFetch({ ssrContext, redirect}) {
    let cookies;
    try {
      cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
        
      if (cookies.has('authKey')) {
        cookies.remove('authKey', {path: '/'});
      }

      return redirect({ path: '/auth/login' }, 301);
    } catch (error) {
      console.error('Error in preFetch hook:', error);
      
      return redirect({ path: '/auth/login' }, 301);
    }
  },
};
</script>

<style scoped></style>
<template><div></div></template>