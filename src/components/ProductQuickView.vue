<template>
  <section class="item loader" v-if="productStatus.isLoading">Загрузка товара...</section>
  <section class="item" v-else-if="productStatus.isFailed">Не удалость загрузить товар.</section>
  <ProductDetails :product="product" v-else/>
</template>

<script>
import { defineComponent } from 'vue';
import useProducts from '@/hooks/useProducts';
import ProductDetails from '@/components/ProductDetails.vue';

export default defineComponent({
  props: {
    productId: { type: [Number, String], required: true },
  },

  components: { ProductDetails },

  setup(props) {
    const {
      product, fetchProduct, status: productStatus,
    } = useProducts();

    fetchProduct(props.productId);

    return { product, productStatus };
  },
});
</script>
