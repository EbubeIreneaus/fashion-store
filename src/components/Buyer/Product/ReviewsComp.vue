<template>
  <section class="tw-py-5 tw-antialiasedqy">
    <div class="tw-max-w-2xl lg:tw-px-4">
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-6">
        <h2 class="tw-text-lg lg:tw-text-2xl tw-font-bold">Discussion (20)</h2>
      </div>

      <!-- Comment Form -->
      <form class="tw-mb-6">
        <div class="tw-px-4 tw-mb-2">
          <q-rating size="medium" color="grey-5" color-selected="black" v-model="rate" />
        </div>

        <div class="tw-px-4 tw-mb-2">
          <q-editor
            class="tw-px-0 tw-w-full tw-text-sm"
            v-model="content"
            required
          />
        </div>

        <!-- Replace v-btn with q-btn from Quasar -->
        <q-btn
          type="submit"
          color="primary"
          class="tw-inline-flex tw-font-medium  tw-mx-4"
        >
          Post comment
        </q-btn>
      </form>

      <!-- Comments Section -->
      <article class="tw-p-6 tw-text-base">
        <footer class="tw-flex tw-justify-between tw-items-center tw-mb-2">
          <div class="tw-flex tw-items-center">
            <p class="tw-inline-flex tw-items-center tw-mr-3 tw-text-sm tw-font-semibold">
              <img
                class="tw-mr-2 tw-w-6 tw-h-6 tw-rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Michael Gough"
              />Michael Gough
            </p>
            <p class="tw-text-sm tw-text-gray-600 dark:tw-text-gray-400">
              <time pubdate datetime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time>
            </p>
          </div>
   
        </footer>
        <p class="tw-text-gray-500 dark:tw-text-gray-400">
          Very straight-to-point article. Really worth time reading. Thank you!
          But tools are just the instruments for the UX designers. The knowledge of the design tools is as important as the creation of the design strategy.
        </p>
        <div class="tw-flex tw-items-center tw-mt-4 tw-space-x-4">
        </div>
      </article>

      <article class="tw-p-6 tw-text-base">
        <footer class="tw-flex tw-justify-between tw-items-center tw-mb-2">
          <div class="tw-flex tw-items-center">
            <p class="tw-inline-flex tw-items-center tw-mr-3 tw-text-sm tw-font-semibold">
              <img
                class="tw-mr-2 tw-w-6 tw-h-6 tw-rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="Jese Leos"
              />Jese Leos
            </p>
            <p class="tw-text-sm">
              <time pubdate datetime="2022-02-12" title="February 12th, 2022">Feb. 12, 2022</time>
            </p>
          </div>
        
        </footer>
        <p class="tw-text-gray-500 dark:tw-text-gray-400">
          Much appreciated! Glad you liked it ☺️
        </p>
      </article>
    </div>
  </section>
</template>


<script setup>
import { ref } from 'vue';

  const rate = ref(1)
  const content = ref('<i><strong>Write your review here!</strong></i>')
</script>

<style lang="scss" scoped></style>
