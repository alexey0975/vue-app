<template>
  <main
    v-if="productStatus.isLoading"
    class="content container loader"
  >
    Загрузка товара...
  </main>
  <main
    v-else-if="productStatus.isFailed"
    class="content container loader"
  >
    Не удалость загрузить товар.
  </main>
  <main
    v-else
    class="content container"
  >
    <div
      v-if="product && category"
      class="content__top"
    >
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{ name: 'main' }"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{ name: 'main' }"
          >
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <product-details :product="product" />
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import ProductDetails from '@/components/ProductDetails.vue';
import useProducts from '@/hooks/useProducts';

export default defineComponent({
  components: { ProductDetails },

  setup() {
    const $route = useRoute();
    const productId = $route.params.id;
    const {
      product, category, fetchProduct, status: productStatus
    } = useProducts();

    fetchProduct(productId);

    return { product, category, productStatus };
  }
});
</script>
