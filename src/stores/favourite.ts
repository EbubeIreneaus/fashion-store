import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { computed, ref } from 'vue';
import { Cookies } from 'quasar';

const api = process.env.DEV
  ? 'http://localhost:3000/api'
  : 'https://sales-admin-server.financial-growths.com/api';

export const useFavStore = defineStore('favourite', (ssrContext) => {
  const favorite = ref<number[]>([]);
  const favLength = computed(() => favorite.value.length);
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;

  const addToFavorite = (id: number) => {
    fetch(`${api}/store/favorite`, {
      method: 'put',
      body: JSON.stringify({ productId: id }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('authKey')}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err.message))
      .finally(() => {
        favorite.value.push(id);
        return Notify.create({
          message: 'Product added to favorite',
          color: 'accent',
          textColor: 'white',
          icon: 'check_circle',
          iconColor: 'white',
          position: 'top-right',
          timeout: 1000,
        });
      });
  };

  const removeFromFavorite = (id: number) => {
    fetch(`${api}/store/favorite`, {
      method: 'delete',
      body: JSON.stringify({ productId: id }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('authKey')}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err.message))
      .finally(() => {
        const index = favorite.value.findIndex((pr) => pr == id);
        if (index != -1) {
          favorite.value.splice(index, 1);
        }
        return Notify.create({
          message: 'Product removed from favorite',
          color: 'red-3',
          textColor: 'red-14',
          icon: 'cancel',
          iconColor: 'red-14',
          position: 'top-right',
          timeout: 1000,
        });
      });
  };

  function updateFavorite(id: number) {
    if (favorite.value.includes(id)) {
      removeFromFavorite(id);
    } else {
      addToFavorite(id);
    }
  }

  function getFavorite() {
    fetch(`${api}/store/favorite/productIds`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${cookies.get('authKey')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          favorite.value = data.data;
        }
      })
      .catch((err) => console.log(err.message));
  }

  if (process.env.CLIENT) {
    getFavorite();
  }

  return {
    favorite,
    favLength,
    updateFavorite,
  };
});
