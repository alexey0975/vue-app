<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" :class="{ 'pagination__link--disabled': page === 1 }" href="#"
        aria-label="Предыдущая страница" @click.prevent="paginatePrew(page)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>

    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link" :class="{ 'pagination__link--current': pageNumber === page }"
        @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>

    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" :class="{ 'pagination__link--disabled': pages === page }"
        href="#" aria-label="Следующая страница" @click.prevent="paginateNext(page)">
        <svg width=" 8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['modelValue', 'count', 'perPage'],
  computed: {
    page() {
      return this.modelValue;
    },
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      if (page >= 1 && page <= this.pages) {
        this.$emit('update:modelValue', page);
      }
    },
    paginateNext(page) {
      if (page >= 1 && page <= this.pages) {
        this.$emit('update:modelValue', page + 1);
      }
    },
    paginatePrew(page) {
      if (page >= 1 && page <= this.pages) {
        this.$emit('update:modelValue', page - 1);
      }
    },
  },
};
</script>
