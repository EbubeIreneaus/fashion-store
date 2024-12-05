import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('authentication', () => {
  const AuthKey = ref<string>(null as unknown as string)
  const isLoggedIn = computed(() => {
    return AuthKey.value? true: false
  })

  return {
    isLoggedIn
  }
});
