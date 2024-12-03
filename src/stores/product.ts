
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {Product} from 'types/product'

export const useProduct = defineStore('products', () => {
  const products = ref<Product[]>([] as Product[]);
  const Featured = ref<Product[]>([] as Product[])
  const Latest = ref<Product[]>([] as Product[])
  const Rated = ref<Product[]>([] as Product[])
  const Shop =  ref<null | Product[]>(null);

  console.log(products.value)

  return {
    products,
    Shop,
    Featured,
    Latest,
    Rated
  };
});
