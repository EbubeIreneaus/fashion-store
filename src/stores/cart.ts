/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Product } from 'app/types/product';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { Mutation, SessionStorage } from 'quasar';

type CartProduct = { product: Product; quantity: number };

export const useCartStore = defineStore('cart', () => {

  const CartItemFronStorage = JSON.parse(
    SessionStorage.getItem('cartItems') || '[]'
  ) as CartProduct[];

  const Cart = ref<CartProduct[]>([]);

  console.log(Cart.value);

  const length = computed(() => Cart.value.length);

  const add = (product: Product, quantity = 1) => {
    const { id } = product;
    for (const item of Cart.value) {
      if (item.product.id == id) {
        return (item.quantity += quantity);
      }
    }
    const newCartProduct: CartProduct = { product: { ...product }, quantity };
    return Cart.value.push(newCartProduct);
  };

  const remove = (product: Product) => {
    //
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

  watch(
    () => Cart.value,
    (newCart) => {
      SessionStorage.setItem('cartItems', JSON.stringify(newCart));
    },
    { deep: true }
  );

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
