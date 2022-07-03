<template>
  <li
    v-for="product in productsNormalized"
    v-bind="$attrs"
    :key="product.id"
  >
    <a
      href="#"
      class="catalog__pic"
      @click.prevent="openQuickView(product.id)"
    >
      <img
        :src="product.image"
        :alt="product.title"
      >
    </a>

    <h3 class="catalog__title">
      <router-link
        class="catalog__link"
        :to="{ name: 'product', params: { id: product.id } }"
      >
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price"> {{ product.pricePretty }} ₽ </span>

    <ul class="colors colors--black">
      <li
        v-for="color in product.colors"
        :key="color.id"
        class="colors__item"
      >
        <label
          class="colors__label"
          for="color"
        >
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="color.title"
            name="color"
          >
          <span
            class="colors__value"
            :style="{ backgroundColor: color.code, border: '1px solid #a7a7a7' }"
          />
        </label>
      </li>
    </ul>
  </li>

  <base-modal v-model:open="IsQuickViewOpen">
    <product-quick-view :product-id="currentProductId" />
  </base-modal>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import BaseModal from '@/components/BaseModal.vue';
import { defineAsyncComponent, h } from 'vue';

export default {
  components: {
    BaseModal,
    ProductQuickView: defineAsyncComponent({
      loader: () => import('@/components/ProductQuickView.vue'),
      delay: 0,
      loadingComponent: () => h('div', 'Загрузка...')
    })
  },
  inheritAttrs: false,
  props: {
    products: { type: Object, required: true }
  },

  data() {
    return {
      currentProductId: null
    };
  },

  computed: {
    IsQuickViewOpen: {
      get() {
        return !!this.currentProductId;
      },
      set(isOpen) {
        if (!isOpen) {
          this.currentProductId = null;
        }
      }
    },
    productsNormalized() {
      return this.products.map(product => ({
        ...product,
        pricePretty: numberFormat(product.price)
      }));
    }
  },

  methods: {

    openQuickView(productId) {
      this.currentProductId = productId;
    }
  }
};
</script>

<style lang="stylus">
/*
.catalog__link
  &:before
    content ''
    position absolute
    left 0
    top 0
    right 0
    bottom 0
*/
</style>
