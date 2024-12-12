import { defineStore, storeToRefs } from 'pinia';
import { Notify } from 'quasar';
import { computed, ref } from 'vue';


export const useFavStore = defineStore('favourite', () => {
 
  const favorite = ref<number[]>([]);
  const favLength = computed(()=> favorite.value.length)
 

  const addToFavorite = (id: number) => {
    favorite.value.push(id);
    return Notify.create({
      message: 'Product added to favorite',
      color: 'accent',
      textColor: 'white',
      icon: 'check_circle',
      iconColor: 'white',
      position: 'top-right'
    })
 
  };

  const removeFromFavorite = (id: number) => {
    if (favorite.value.includes(id)) {
      const index = favorite.value.findIndex(id => id==id);
      favorite.value.splice(index, 1)
      return Notify.create({
        message: 'Product removed from favorite',
        color: 'red-3',
        textColor: 'red-14',
        icon: 'cancel',
        iconColor: 'red-14',
        position: 'top-right'
      })
    }
  };



  return {
    favLength,
    favorite,
    removeFromFavorite,
    addToFavorite
  }
});
