<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': currentPage === 1 }"
        href="#"
        aria-label="Предыдущая страница"
        @click.prevent="paginatePrew()"
      >
        <svg
          width="8"
          height="14"
          fill="currentColor"
        >
          <use xlink:href="#icon-arrow-left" />
        </svg>
      </a>
    </li>

    <li
      v-for="page in pages"
      :key="page"
      class="pagination__item"
    >
      <a
        href="#"
        class="pagination__link"
        :class="{ 'pagination__link--current': page === currentPage }"
        @click.prevent="paginate(page)"
      >
        {{ page }}
      </a>
    </li>

    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': pages === currentPage }"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="paginateNext()"
      >
        <svg
          width=" 8"
          height="14"
          fill="currentColor"
        >
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
import { PRODUCTS_PER_PAGE } from '@/config';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    modelValue: { type: [Number, String], required: true },
    count: { type: [Number, String], required: true }
  },
  emits: ['update:modelValue'],

  setup(props, { emit: $emit }) {
    const currentPage = computed(() => props.modelValue);

    const pages = computed(() => Math.ceil(props.count / PRODUCTS_PER_PAGE));

    const paginate = page => {
      if (page >= 1 && page <= pages.value) {
        $emit('update:modelValue', page);
      }
    };

    const paginateNext = () => {
      if (currentPage.value >= 1 && currentPage.value < pages.value) {
        $emit('update:modelValue', currentPage.value + 1);
      }
    };

    const paginatePrew = () => {
      if (currentPage.value > 1 && currentPage.value <= pages.value) {
        $emit('update:modelValue', currentPage.value - 1);
      }
    };

    return {
      currentPage,
      pages,
      paginate,
      paginateNext,
      paginatePrew
    };
  }
});
</script>
