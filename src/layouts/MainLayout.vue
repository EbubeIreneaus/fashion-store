<template>
  <q-layout view="lhh lpR lff">
    <q-header class="tw-bg-[#FFFFFF] text-black">
      <!-- toppest side -->
      <div class="tw-bg-[#F5F5F5]">
        <div
          class="tw-flex tw-justify-end md:tw-justify-between tw-max-w-[90%] tw-mx-auto tw-py-3 text-black"
        >
          <div class="tw-hidden md:tw-flex tw-justify-between tw-gap-5">
            <div>care@ireneausfs.com.ng</div>
            <q-separator vertical  />
            <div class="tw-hidden lg:tw-inline-block">Free Shipping for all Order of ₦10,000.00</div>
          </div>

          <div class="tw-flex  justify-end lg:tw-justify-between tw-gap-5">
            <ul class="tw-hidden lg:tw-flex tw-gap-4">
              <a href=""
                ><li><q-icon name="fa-brands fa-facebook" /></li
              ></a>
              <a href=""
                ><li><q-icon name="fa-brands fa-tiktok" /></li
              ></a>
              <a href=""
                ><li><q-icon name="fa-brands fa-instagram" /></li
              ></a>
              <a href=""
                ><li><q-icon name="fa-brands fa-linkedin" /></li
              ></a>
            </ul>
            <!-- <q-separator vertical /> -->
            <div v-if="!isLoggedIn">
              <router-link to="/auth/login">
                <q-icon name="account_circle" /> &nbsp;
                <span>Login</span>
              </router-link>
            </div>
            <div v-else>
              <q-btn-dropdown size="md" icon="account_circle" :label="user.firstname" flat dense>
                  <q-list>
                    <q-item to="/">
                      <q-item-section>Settings</q-item-section>
                    </q-item>
                    <q-item to="/favorite">
                      <q-item-section>Favourites</q-item-section>
                    </q-item>
                    <q-item to="/myOrders">
                      <q-item-section>Orders</q-item-section>
                    </q-item>
                    <q-item to="/auth/logout">
                      <q-item-section>Signout</q-item-section>
                    </q-item>
                  </q-list>
              </q-btn-dropdown>
            </div>
          </div>
        </div>
      </div>

      <!-- header nav -->
      <nav>
        <div
          class="container tw-flex tw-justify-between tw-items-center tw-mx-auto lg:tw-py-4 tw-p-4"
        >
          <div class="tw-w-24"><q-img src="/img/logo/1-tr.png" style="transform: scale(1.8);" alt="Ireneaus Fashion Store Logo" /></div>

          <ul class="*:tw-inline *:tw-px-4 tw-hidden lg:tw-block">
            <li
              v-for="menu in MenuLinks"
              :key="menu.title"
              class="text-weight-bold spacing"
            >
              <RouterLink
                :to="menu.href"
                exact-active-class="text-grey-6"
                class="hover:tw-text-gray-500"
                >{{ menu.title }}</RouterLink
              >
            </li>
          </ul>

          <div class="*:tw-inline-block tw-hidden lg:tw-block">
            <q-btn
              icon="favorite"
              flat
              size="sm"
              :ripple="false"
              class="!tw-text-black focus:!tw-bg-transparent"
              to="/favorite"
            >
              <q-badge :label="favLength > 10? '10+': favLength" class="btn" floating rounded ></q-badge>
            </q-btn>

            <q-btn
              icon="shopping_cart"
              flat
              size="sm"
              :ripple="false"
              class="!tw-text-black focus:!tw-bg-transparent"
              to="/cart"
            >
              <q-badge
                :label="CartLength > 9 ? '9+' : CartLength"
                floating
                class="btn"
                rounded
              ></q-badge>
            </q-btn>

            &nbsp;&nbsp;
            <div>
              items:
              <span v-naira="Number(total_price)" class=" text-weight-bold"></span>
            </div>
          </div>

          <div class="tw-border tw-rounded-md lg:tw-hidden">
            <q-btn icon="menu" @click="toggleLeftDrawer" unelevated />
          </div>
        </div>
      </nav>

      <div class="*:tw-inline-block tw-my-1 tw-text-center lg:tw-hidden">
        <q-btn
          icon="favorite"
          flat
          size="sm"
          :ripple="false"
          class="!tw-text-black focus:!tw-bg-transparent"
          to="/favorite"
        >
          <q-badge :label="favLength > 9 ?'9+' :favLength" class="btn" floating rounded></q-badge>
        </q-btn>

        <q-btn
          icon="shopping_cart"
          flat
          size="sm"
          :ripple="false"
          class="!tw-text-black focus:!tw-bg-transparent"
          to="/cart"
        >
          <q-badge :label="CartLength > 9 ? '9+': CartLength" floating class="btn" rounded></q-badge>
        </q-btn>

        &nbsp;&nbsp;
        <div>
          items:
          <span v-naira="total_price" class="text-weight-bold"></span>
        </div>
      </div>

      <HeroCompnent />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <SidebarComp :menu="MenuLinks" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="tw-bg-[#F3F6FA] tw-text-gray-600">
      <FooterComp />
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import HeroCompnent from 'src/components/Buyer/HeroCompnent.vue';
import SidebarComp from 'src/components/Buyer/SidebarComp.vue';
import FooterComp from 'src/components/FooterComp.vue';
import { useAuthStore } from 'src/stores/Authentication';
import { useCartStore } from 'src/stores/cart';
import { useFavStore } from 'src/stores/favourite';
import { ref, onMounted} from 'vue';
import { useQuasar } from 'quasar';
import { Product } from 'app/types/product';

defineOptions({
  name: 'MainLayout',
});

const {total_price, length: CartLength, Cart} = storeToRefs(useCartStore());
const {favLength} = storeToRefs(useFavStore())

const {isLoggedIn, user} = storeToRefs(useAuthStore())
const $q = useQuasar()

const MenuLinks = [
  { title: 'HOME', href: '/', icon: '', sublink: [] },
  { title: 'SHOP', href: '/shop', icon: '', sublink: [] },
  { title: 'ABOUT', href: '/about', icon: '', sublink: [] },
  { title: 'BLOG', href: '/blog', icon: '', sublink: [] },
  { title: 'CONTACT', href: '/contact', icon: '', sublink: [] },
];

const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onMounted(() => {
  if ($q.sessionStorage.has('cartItems')) {
    Cart.value = $q.sessionStorage.getItem('cartItems') as unknown as {product: Product, quantity: number}[]
  }
})

</script>
