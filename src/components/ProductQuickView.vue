<template>
  <section
    v-if="productStatus.isLoading"
    class="item loader"
  >
    Загрузка товара...
  </section>
  <section
    v-else-if="productStatus.isFailed"
    class="item"
  >
    Не удалость загрузить товар.
  </section>
  <product-details
    v-else
    :product="product"
  />
</template>

<script>
import { defineComponent } from 'vue';
import useProducts from '@/hooks/useProducts';
import ProductDetails from '@/components/ProductDetails.vue';

export default defineComponent({

  components: { ProductDetails },
  props: {
    productId: { type: [Number, String], required: true }
  },

  setup(props) {
    const {
      product, fetchProduct, status: productStatus
    } = useProducts();

    fetchProduct(props.productId);

    return { product, productStatus };
  }
});
</script>
