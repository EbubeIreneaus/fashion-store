<script setup lang="ts">
import { reactive } from 'vue';

const user = reactive({
  email: '',
  password: ''
})
</script>

<template>
  <div>
    <div class="tw-h-full tw-bg-gray-400 dark:tw-bg-gray-900">
      <!-- Container -->
      <div class="tw-mx-auto">
        <div class="tw-flex tw-justify-center tw-px-6 tw-py-12">
          <!-- Row -->
          <div class="tw-w-full xl:tw-w-3/4 lg:tw-w-11/12 tw-flex">
            <!-- Col -->
            <div
              class="tw-w-full tw-h-auto tw-bg-gray-400 dark:tw-bg-gray-800 tw-hidden lg:tw-block lg:tw-w-5/12 tw-bg-cover tw-rounded-l-lg"
              style="background-image: url('/img/bg-auth.jpg')"
            ></div>
            <!-- Col -->
            <div
              class="tw-w-full lg:tw-w-7/12 tw-bg-white dark:tw-bg-gray-700 tw-p-5 tw-rounded-lg lg:tw-rounded-l-none"
            >
              <h3
                class="tw-py-4 tw-text-2xl tw-text-center tw-text-gray-800 dark:tw-text-white"
              >
                Create an Account!
              </h3>
              <form
                class="tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4 tw-bg-white dark:tw-bg-gray-800 tw-rounded"
              >
                <div class="tw-mb-4">
                  <label
                    class="tw-block tw-mb-2 tw-text-sm tw-font-bold tw-text-gray-700 dark:tw-text-white"
                    for="email"
                  >
                    Email
                  </label>
                  <q-input
                    class="tw-w-full tw-px-3 tw-py-2 tw-mb-3 tw-text-sm tw-leading-tight tw-text-gray-700 dark:tw-text-white tw-border tw-rounded tw-shadow tw-appearance-none focus:tw-outline-none focus:tw-shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    v-model="user.email"
                    bg-color="transparent"
                    dense
                    borderless
                  />
                </div>
                <div class="tw-mb-4">
                  <div class="">
                    <label
                      class="tw-block tw-mb-2 tw-text-sm tw-font-bold tw-text-gray-700 dark:tw-text-white"
                      for="c_password"
                    >
                      Confirm Password
                    </label>
                    <q-input
                      class="tw-w-full tw-px-3 tw-py-2 tw-mb-3 tw-text-sm tw-leading-tight tw-text-gray-700 dark:tw-text-white tw-border tw-rounded tw-shadow tw-appearance-none focus:tw-outline-none focus:tw-shadow-outline"
                      id="c_password"
                      type="password"
                      placeholder="******************"
                      v-model="user.email"
                      bg-color="transparent"
                      dense
                      borderless
                    />
                  </div>
                </div>
                <div class="tw-mb-6 tw-text-center">
                  <button
                    class="tw-w-full tw-px-4 tw-py-2 tw-font-bold tw-text-white bg-accent tw-rounded-full hover:tw-bg-green-800 focus:tw-outline-none focus:tw-shadow-outline"
                    type="button"
                  >
                    Login
                  </button>
                </div>
                <hr class="tw-mb-6 tw-border-t" />
                <div class="tw-text-center">
                  <a
                    class="tw-inline-block tw-text-sm tw-align-baseline"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div class="tw-text-center">
                  <router-link
                    to="/auth/register"
                    class="tw-inline-block tw-text-sm tw-align-baseline"
                    
                  >
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
