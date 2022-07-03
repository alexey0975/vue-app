<template>
  <router-link
    class="header__cart"
    :to="{ name: 'cart' }"
    aria-label="Корзина с товарами"
  >
    <svg
      width="30"
      height="21"
      fill="currentColor"
    >
      <use xlink:href="#icon-cart" />
    </svg>
    <span
      v-show="amountProducts"
      class="header__count"
      aria-label="Количество товаров"
    >{{ amountProducts }}</span>
  </router-link>
</template>

<script>
import { defineComponent } from 'vue';
import useCartProduct from '@/hooks/useCartProduct';

export default defineComponent({
  setup() {
    const { amountProducts } = useCartProduct();
    return {
      amountProducts
    };
  }
});
</script>
