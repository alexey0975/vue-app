<template>
  <ul class="catalog__list">
    <product-items
      class="catalog__item"
      :products="products"
    />
  </ul>
</template>

<script>
import { defineComponent } from 'vue';
import ProductItems from './ProductItems.vue';

export default defineComponent({
  components: { ProductItems },
  props: {
    products: { type: Array, required: true }
  }
});
</script>

<style lang="stylus">
.catalog__item
  position relative
</style>
