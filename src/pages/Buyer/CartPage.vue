<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import BreadCrumbs from 'src/components/Buyer/BreadCrumbs.vue';
import { useCartStore } from 'src/stores/cart';
// import { vAutoAnimate } from '@formkit/auto-animate'
import { inject, ref } from 'vue';

const api = inject('api');
const { Cart: items, total_price } = storeToRefs(useCartStore());
const { remove } = useCartStore();

const couponCode = ref('');
</script>

<template>
  <q-page>
    <BreadCrumbs title="Cart" :navs="['Home', 'Shop', 'Cart Section']" />
    <div class="tw-my-10 tw-mx-auto q-px-md">
      <div>
        <div class="!tw-overflow-x-auto">
          <div
            class="lg:tw-max-w-5xl md:tw-max-w-3xl tw-max-w-2xl tw-mx-auto tw-block"
            v-auto-animate
          >
           <div class="tw-w-full tw-overflow-x-auto">
            <div class="">
              <div
                v-for="ct in items"
                :key="ct.product.id"
                class="tw-bg-slate-50 tw-rounded-lg tw-mb-3 tw-px-2"
              >
                <div class="tw-grid md:tw-grid-cols-4 tw-grid-cols-1 tw-gap-y-4 md:tw-items-center">
                  <div class="tw-py-3 tw-font-semibold">
                    <q-img
                      :src="`${api}/assets/images/products/${ct.product.image}`"
                      class="tw-w-16 tw-rounded-lg"
                      :alt="ct.product.long_title || ct.product.name"
                    />
                  </div>
                  <div class="md:tw-py-7 tw-font-semibold">
                    <span class="tw-capitalize">{{
                      ct.product.long_title || ct.product.name
                    }}</span>
                  </div>
                  <div>
                    <div class="tw-flex tw-items-center tw-w-fit">
                      <q-btn
                        icon="remove"
                        unelevated
                        color="red-10"
                        @click="ct.quantity--"
                        dense
                        size="sm"
                      />
                      <q-input
                        v-model="ct.quantity"
                        :error="ct.quantity < 1"
                        standout
                        borderless
                        class="tw-w-16 tw-h-7 "
                        dense
                        input-style="text-align: center; height: 28px;"
                        :disable="ct.quantity <= 1"
                        
                      />
                      <q-btn
                        icon="add"
                        unelevated
                        color="green-10"
                        dense
                        @click="ct.quantity++"
                        :disable="ct.quantity >= ct.product.quantity"
                        size="sm"
                      />
                    </div>
                  </div>

                  <div>
                    <div class="tw-flex tw-items-center tw-gap-x-2 tw-font-bold">
                      <span v-naira="ct.product.market_price"></span>
                      <q-icon name="close" />
                      <span>{{ ct.quantity }}</span>
                    </div>
                    <q-btn
                      label="remove product"
                      dense
                      flat
                      no-caps
                      :ripple="false"
                      text-color="red-14"
                      @click="remove(ct.product)"
                      class="!tw-p-0"
                    >
                      <q-tooltip
                        >remove {{ ct.product.name }} from cart</q-tooltip
                      >
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>
           </div>

            <div class="tw-my-10 lg:tw-flex tw-justify-between">
              <div class="tw-w-full">
                <input
                  v-model="couponCode"
                  placeholder="coupon code"
                  class="tw-inline-block tw-border tw-py-2.5 tw-px-3 tw-w-[250px]"
                />
                &nbsp;
                <q-btn
                  label="apply"
                  unelevated
                  square
                  class="tw-px-14 tw-py-2.5"
                  color="accent"
                />
              </div>

              <div class="tw-w-full tw-mt-10">
                <q-card
                  class="tw-max-w-lg tw-w-full tw-bg-slate-100 tw-py-7"
                  flat
                  square
                >
                  <q-card-section>
                    <q-list>
                      <div class="tw-text-xl tw-font-extrabold">Cart Total</div>
                      <q-item class="tw-font-semibold text-body1">
                        <q-item-section>Amount</q-item-section>
                        <q-item-section side
                          ><span v-naira="total_price"></span
                        ></q-item-section>
                      </q-item>
                      <q-item class="tw-font-semibold text-body1">
                        <q-item-section>Delevery</q-item-section>
                        <q-item-section side
                          ><span v-naira="2500"></span
                        ></q-item-section>
                      </q-item>
                      <q-item class="tw-font-bold text-h6">
                        <q-item-section>Total (+VAT)</q-item-section>
                        <q-item-section side
                          ><span
                            v-naira="total_price + 2500 "
                          ></span
                        ></q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section>
                    <div class="tw-flex tw-justify-end">
                      <q-btn
                        label="checkout"
                        to="/checkout"
                        unelevated
                        square
                        color="accent"
                        class="tw-px-14 tw-p-2 tw-text-white"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
