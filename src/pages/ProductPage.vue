<template>
  <main class="content container loader" v-if="productStatus.isLoading">Загрузка товара...</main>
  <main class="content container loader" v-else-if="productStatus.isFailed">
    Не удалость загрузить товар.
  </main>
  <main class="content container" v-else>
    <div v-if="product && category" class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
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

    <ProductDetails :product="product" />
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
      product, category, fetchProduct, status: productStatus,
    } = useProducts();

    fetchProduct(productId);

    return { product, category, productStatus };
  },
});
</script>
