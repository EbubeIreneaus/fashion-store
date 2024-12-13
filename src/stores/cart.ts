/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Product } from 'app/types/product';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { colors, Mutation, SessionStorage } from 'quasar';
import { Notify } from 'quasar';

type CartProduct = { product: Product; quantity: number };

export const useCartStore = defineStore('cart', () => {
  // Reactive cart state
  const Cart = ref<CartProduct[]>([] as CartProduct[]);

  const length = computed(() => Cart.value.length);

  const add = (product: Product, quantity = 1) => {
    const { id } = product;
    for (const item of Cart.value) {
      if (item.product.id == id) {
        item.quantity += quantity;
        return Notify.create({
          color: 'accent',
          icon: 'check_circle',
          position: 'top-right',
          textColor: 'white',
          message: 'Product quantity increased by ' + quantity,
          timeout: 1000,
        });
      }
    }
    const newCartProduct: CartProduct = { product: { ...product }, quantity };
    Cart.value.push(newCartProduct);
    return Notify.create({
      color: 'accent',
      icon: 'check_circle',
      position: 'top-right',
      textColor: 'white',
      message: 'Product added to cart.',
      timeout: 1000,
    });
  };

  const remove = (product: Product) => {
    //
    const { id } = product;
    const index = Cart.value.findIndex((pr) => (pr.product.id = id));
    Cart.value.splice(index, 1);
    return Notify.create({
      message: 'Product removed from cart',
      color: 'red-3',
      textColor: 'red-14',
      icon: 'cancel',
      iconColor: 'red-14',
      position: 'top-right',
    });
  };

  // async function get_latest_cart_product(id: number, item_count = 1) {
  //   try {
  //     const req = await fetch(
  //       `${api}/api/cart_product?cart_ids=${id}`
  //     );
  //     const res = await req.json();
  //     if (res.status === 'success') {
  //       cart_product.value.push(
  //         Object.create({ product: res.data[0], no_of_item: item_count })
  //       );
  //       return true;
  //     }

  //     console.error('Error Geting single cart product', res.code);
  //     return false;
  //   } catch (error) {
  //     return false;
  //   }
  // }

  const total_price = computed(() => {
    const price = Cart.value.reduce(
      (x: number, y: CartProduct) => x + y.quantity * y.product.market_price,
      0
    );

    // console.log(price)
    return price;
  });

  const initializeWatcher = ref(false);
  if (process.env.CLIENT) {
    watch(
      () => Cart.value,
      (newVal) => {
        if (initializeWatcher.value) {
          return SessionStorage.set('cartItems', newVal);
        }
        initializeWatcher.value = true;
      },
      { deep: true }
    );
  }

  return {
    Cart,
    length,
    add,
    total_price,
    remove,
  };
});
// onMounted(() => {
//   useCartStore().$subscribe((Mutation, cart) => {
//     LocalStorage.setItem('cartIds', [...cart.cart]);
//   });
// })
