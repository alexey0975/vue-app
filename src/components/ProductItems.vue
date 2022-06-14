<template>
  <li v-bind="$attrs" v-for="product in productsNormalized" :key="product.id">
    <div class="catalog__pic">
      <img :src="product.image" :alt="product.title" />
    </div>

    <h3 class="catalog__title">
      <router-link class="catalog__link" :to="{ name: 'product', params: { id: product.id } }">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price"> {{ product.pricePretty }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color.title" name="color" />
          <span
            class="colors__value"
            :style="{ backgroundColor: color.code, border: '1px solid #a7a7a7' }"
          >
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  inheritAttrs: false,
  props: ['products'],

  methods: {
    gotoPage,
  },
  computed: {
    productsNormalized() {
      return this.products.map((product) => ({
        ...product,
        pricePretty: numberFormat(product.price),
      }));
    },
  },
};
</script>

<style lang="stylus">
.catalog__link
  &:before
    content ''
    position absolute
    left 0
    top 0
    right 0
    bottom 0
</style>
