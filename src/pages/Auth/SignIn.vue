<script setup lang="ts">
import { reactive, ref, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/Authentication';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';


const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const isLoading = ref(false);
const api = inject('api');
const { r } = route.query;
const { user: authUser, redirect_to, isLoggedIn } = storeToRefs(useAuthStore());
if (r) {
  redirect_to.value = r as string;
}

const user = reactive({
  email: '',
  psw: '',
  remember_me: false,
});

function login() {
  isLoading.value = true;

  fetch(`${api}/store/auth/login`, {
    method: 'post',
    body: JSON.stringify(user),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        authUser.value = data.user;
        $q.cookies.set('authKey', data.token, { path: '/', expires: user.remember_me ? '30d' : '20h', sameSite: 'None', secure: true })
        isLoggedIn.value = true;
        if (redirect_to.value) {
          return router.push('/' + redirect_to.value);
        } else {
          return router.push('/shop');
        }
      }

      $q.notify({
        message: data.msg,
        color: 'red-14',
        icon: 'error',
      });
    })
    .catch((error) => {
      $q.notify({
        message: error.message,
        color: 'red-14',
        icon: 'error',
      });
    })
    .finally(() => (isLoading.value = false));
}
</script>

<template>
  <div>
    <div class="tw-h-full tw-bg-gray-400">
      <!-- Container -->
      <div class="tw-mx-auto">
        <div class="tw-flex tw-justify-center tw-px-6 tw-py-12">
          <!-- Row -->
          <div class="tw-w-full xl:tw-w-3/4 lg:tw-w-11/12 tw-flex">
            <!-- Col -->
            <div
              class="tw-w-full tw-h-auto tw-bg-gray-400 tw-hidden lg:tw-block lg:tw-w-5/12 tw-bg-cover tw-rounded-l-lg"
              style="background-image: url('/img/bg-auth.jpg')"></div>
            <!-- Col -->
            <div
              class="tw-w-full lg:tw-w-7/12 tw-bg-white tw-p-5 tw-rounded-lg lg:tw-rounded-l-none">
              <h3 class="tw-py-4 tw-text-2xl tw-text-center tw-text-gray-800 dark:tw-text-white">
                Create an Account!
              </h3>
              <form class="tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4 tw-bg-white tw-rounded">
                <div class="tw-mb-4">
                  <label class="tw-block tw-mb-2 tw-text-sm tw-font-bold tw-text-gray-700 dark:tw-text-white"
                    for="email">
                    Email
                  </label>
                  <q-input
                    class="tw-w-full tw-px-3 tw-py-2 tw-mb-3 tw-text-sm tw-leading-tight tw-text-gray-700 tw-border tw-rounded tw-shadow tw-appearance-none focus:tw-outline-none focus:tw-shadow-outline"
                    id="email" type="email" placeholder="Email" v-model="user.email" bg-color="transparent" dense
                    borderless />
                </div>
                <div class="tw-mb-4">
                  <div class="">
                    <label class="tw-block tw-mb-2 tw-text-sm tw-font-bold tw-text-gray-700 dark:tw-text-white"
                      for="password">
                      Password
                    </label>
                    <q-input
                      class="tw-w-full tw-px-3 tw-py-2 tw-mb-3 tw-text-sm tw-leading-tight tw-text-gray-700 dark:tw-text-white tw-border tw-rounded tw-shadow tw-appearance-none focus:tw-outline-none focus:tw-shadow-outline"
                      id="password" type="password" placeholder="******************" v-model="user.psw"
                      bg-color="transparent" dense borderless />
                  </div>
                </div>
                <div class="tw-mb-1">
                  <div class="">
                    <q-checkbox class="tw-w-full tw-px-3 tw-py-2 tw-mb-3 tw-text-sm" label="Remember me"
                      v-model="user.remember_me" color="accent" />
                  </div>
                </div>
                <div class="tw-mb-6 tw-text-center">
                  <q-btn
                    class="tw-w-full tw-px-4 tw-py-2 tw-font-bold tw-text-white bg-accent tw-rounded-full hover:tw-bg-green-800 focus:tw-outline-none focus:tw-shadow-outline"
                    type="button" @click="login" :loading="isLoading">
                    Login
                  </q-btn>
                </div>
                <hr class="tw-mb-6 tw-border-t" />
                <div class="tw-text-center">
                  <a class="tw-inline-block tw-text-sm tw-align-baseline" href="#">
                    Forgot Password?
                  </a>
                </div>
                <div class="tw-text-center">
                  <router-link to="/auth/register" class="tw-inline-block tw-text-sm tw-align-baseline">
                    Don't have an account? Sign up
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
