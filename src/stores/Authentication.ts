import { Person } from './../../types/Person';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Cookies } from 'quasar';

export const useAuthStore = defineStore('authentication', () => {
  const api = process.env.DEV
    ? 'http://localhost:3000/api'
    : 'https://sales-admin-server.financial-growths.com/api';

  const user = ref<Person>(null as unknown as Person);
  const isLoggedIn = ref(false);

  const redirect_to = ref(null as unknown as string);

  function getUser() {
    fetch(`${api}/store/user/m`, {
      method: 'get',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          isLoggedIn.value = true
          return (user.value = data.user);
        }
        isLoggedIn.value = false;
        Cookies.remove('authKey');
      })
      .catch((err) => {
        isLoggedIn.value = false;
        console.error(err.message);
      });
  }

  if (process.env.CLIENT) {
    if (Cookies.has('authKey')) {
      isLoggedIn.value = true;      
      getUser();
    };
  };

  return{
    user,
    redirect_to,
    isLoggedIn
  }
});
