<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <product-filter
        v-model:price-from="filter.priceFrom"
        v-model:price-to="filter.priceTo"
        v-model:category-id="filter.categoryId"
        v-model:color="filter.color"
      />
      <section class="catalog">
        <div
          v-if="loadStatus.isLoading"
          class="loader"
        >
          Загрузка товаров...
        </div>

        <div v-if="loadStatus.isFailed">
          <span>Произошла ошибка при загрузке товаров</span>
          <button @click.prevent="loadProducts()">
            Попробовать еще раз
          </button>
        </div>

        <div v-if="products.length === 0 && !loadStatus.isLoading && !loadStatus.isFailed">
          Товаров не найдено...
        </div>
        <product-list
          v-if="!loadStatus.isLoading"
          :products="products"
        />

        <base-pagination
          v-if="!loadStatus.isLoading"
          v-model="page"
          :count="countProducts"
        />
      </section>
    </div>
  </main>
</template>

<script>
import {
  defineComponent, computed, watch, ref
} from 'vue';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import useProducts from '@/hooks/useProducts';
import useFilter from '@/hooks/useFilter';

export default defineComponent({
  components: { ProductList, BasePagination, ProductFilter },
  setup() {
    const {
      productListData: productsData, fetchProductList, status: loadStatus
    } = useProducts();

    const { filter } = useFilter();

    const page = ref(1);
    const countProducts = computed(() => (productsData.value ? productsData.value.pagination.total : 0));
    const products = computed(() => (productsData.value
      ? productsData.value.items.map(product => ({
        ...product,
        image: product.image.file.url
      }))
      : []));

    const loadProducts = () => { fetchProductList(page.value, filter); };

    watch([filter], () => {
      fetchProductList(1, filter);
    });

    watch([page], () => {
      fetchProductList(page.value, filter);
    });

    loadProducts();

    return {
      products,
      countProducts,
      filter,
      page,
      loadProducts,
      loadStatus
    };
  }
});
</script>
