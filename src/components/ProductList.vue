<template>
  <ul class="catalog__list">
    <ProductItems class="catalog__item" :products="products"/>
  </ul>
</template>

<script>
import ProductItems from './ProductItems.vue';

export default {
  components: { ProductItems },
  props: ['products'],
};
</script>

<style lang="stylus">
.catalog__item
  position relative
</style>
