<script lang="ts" setup>
import { inject, reactive } from 'vue';
import { useProduct } from 'src/stores/product';
import { ProductCategories } from 'app/composables/ProductCategory';
const api = inject('api');

const filter = reactive<{
  category: string[] | null[];
  priceRange: { min: number; max: number };
  sizes: string[];
}>({
  category: [],
  priceRange: { min: 100, max: 100000 },
  sizes: [],
});

const Filter = async () => {
  let {
    category,
    priceRange: { min, max },
    sizes,
  } = filter;
  try {
    let searchQuery = `minAmount=${min}&maxAmount=${max}`;

    if (category.length > 0) {
      searchQuery += '&cats=' + category;
    }

    if (sizes.length > 0) {
      searchQuery += '&sizes=' + sizes;
    }

    const req = await fetch(`${api}/store/product/shopFilters?${searchQuery}`);

    const res = await req.json();
    if (res.success) {
      return (useProduct().Shop = res.data);
    }
    console.error('Failed Fetching product from api', res.msg);
  } catch (error) {
    console.error('ErrorFetching product from api', error);
  }
};
</script>

<template>
  <div class="tw-max-w-lg tw-w-full tw-bg-slate-50 tw-py-5">
    <q-toolbar class="tw-text-sm">
      <q-toolbar-title class="tw-text-sm tw-font-bold"
        >Filter By</q-toolbar-title
      >
    </q-toolbar>
    <q-card class="tw-mx-auto" flat square>
      <q-card-section class="tw-py-2">
        <q-list
          class="text-weight-bold *:tw-py-0 *:!tw-pb-0"
          v-for="category in ProductCategories"
          :key="category.title"
        >
          <q-item-label
            class="text-weight-bolder text-body1 tw-uppercase tw-px-2 !tw-py-2"
            >{{ category.title.toUpperCase() }}
          </q-item-label>
          <q-item v-for="cat in category.group" :key="cat.title">
            <q-item-section>
              <q-checkbox
                v-model="filter.category"
                :label="cat.title"
                :val="cat.title"
              />
            </q-item-section>
            <!-- <q-item-section>Grain</q-item-section> -->
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card class="tw-mx-auto" flat square>
      <q-card-section
        class="text-weight-bolder text-body1 tw-uppercase tw-px-2 !tw-py-2"
        >size</q-card-section
      >
      <q-card-section class="tw-px-10">
        <div>
          <div class="tw-flex tw-gap-x-4 tw-flex-wrap tw-items-center">
            <label>
              <input
                type="checkbox"
                value="sm"
                v-model="filter.sizes"
                class="tw-peer hidden"
              />
              <p
                class="tw-px-5 tw-py-3 tw-border tw-rounded-full tw-bg-slate-100 tw-font-semibold tw-text-black peer-checked:!tw-ring-4"
              >
                S
              </p>
            </label>
            <label>
              <input
                type="checkbox"
                value="md"
                v-model="filter.sizes"
                class="tw-peer hidden"
              />
              <p
                class="tw-px-5 tw-py-3 tw-border tw-rounded-full tw-bg-slate-100 tw-font-semibold text-black peer-checked:!tw-ring-4"
              >
                M
              </p>
            </label>
            <label>
              <input
                type="checkbox"
                value="lg"
                v-model="filter.sizes"
                class="tw-peer hidden"
              />
              <p
                class="tw-px-5 tw-py-3 tw-border tw-rounded-full tw-bg-slate-100 tw-font-semibold tw-text-black peer-checked:!tw-ring-4"
              >
                L
              </p>
            </label>
            <label>
              <input
                type="checkbox"
                value="xl"
                v-model="filter.sizes"
                class="tw-peer hidden"
              />
              <p
                class="tw-px-4 tw-py-3 tw-border tw-rounded-full tw-bg-slate-100 tw-font-semibold tw-text-black peer-checked:!tw-ring-4"
              >
                XL
              </p>
            </label>
            <label>
              <input
                type="checkbox"
                value="xxl"
                v-model="filter.sizes"
                class="tw-peer hidden"
              />
              <p
                class="tw-px-4 tw-py-4 tw-border tw-rounded-full tw-bg-slate-100 tw-font-semibold tw-text-black peer-checked:!tw-ring-4"
              >
                XXL
              </p>
            </label>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="tw-mx-auto" flat square>
      <q-card-section
        class="text-weight-bolder text-body1 tw-uppercase tw-px-2 !tw-py-2"
        >Price</q-card-section
      >
      <q-card-section class="tw-px-10">
        <q-range
          v-model="filter.priceRange"
          :min="500"
          :max="200000"
          :inner-min="500"
          :inner-max="200000"
          :step="500"
        />
        <div>
          <div class="text-caption">
            between: <span v-naira="filter.priceRange.min"></span> to
            <span v-naira="filter.priceRange.max"></span>
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="tw-my-5">
        <q-btn
          icon="filter_list"
          label="filter"
          class=""
          color="accent"
          unelevated
          @click="Filter"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
