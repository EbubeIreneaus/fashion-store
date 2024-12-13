import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Buyer/IndexPage.vue') },
      { path: 'about', component: () => import('src/pages/AboutPage.vue') },
      { path: 'contact', component: () => import('src/pages/ContactPages.vue') },
      {path: 'shop', component: ()=> import('pages/Buyer/ShopPage.vue')},
      {path: 'product/:id', component: ()=> import('pages/Buyer/SingleProductPage.vue')},
      {path: 'cart', component: ()=> import('pages/Buyer/CartPage.vue')},
      {path: 'checkout', component: () => import('pages/Buyer/CheckoutPage.vue')},
      {path: 'myOrders', component: () => import('pages/Buyer/OrdersPage.vue')},
      {path: 'order/details', component: () => import('pages/Buyer/OrderDetailsPage.vue')},
      {path: 'favorite', component: () => import('pages/Buyer/FavoritePage.vue')},

    ],
  },
  {path: '/paySuccess', component: () => import('pages/Buyer/PaySuccess.vue')},
  {
    path: '/auth', 
    children: [
      {path:'login', component: () => import('pages/Auth/SignIn.vue')},
      {path:'register', component: () => import('pages/Auth/SignUp.vue')},
      {path: 'logout', component: () => import('pages/Auth/SignOut.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
