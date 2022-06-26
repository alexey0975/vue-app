<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i style="background-color: #FF6B00"></i>
        Оранжевый
      </span>
    </p>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="downProductAmount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <label>
        <input type="text" v-model.number="amount" name="count">
      </label>

      <button type="button" aria-label="Добавить один товар" @click.prevent="upProductAmount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ totalPricePretty }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { defineComponent, computed } from 'vue';
import useCount from '@/hooks/useCount';
import useCartProduct from '@/hooks/useCartProduct';

export default defineComponent({
  props: ['item'],

  setup(props) {
    const { doUpdateAmount, doDelete: deleteProduct } = useCartProduct();
    const totalPricePretty = computed(() => numberFormat(props.item.product.price * props.item.amount));
    const amount = computed({
      get() {
        return props.item.amount;
      },
      set(value) {
        doUpdateAmount(props.item.productId, value);
      },
    });
    const { doUpCount: upProductAmount, doDownCount: downProductAmount } = useCount(amount);

    return {
      totalPricePretty,
      amount,
      upProductAmount,
      downProductAmount,
      deleteProduct,
    };
  },
});
</script>

<style>
.button-del {
  cursor: pointer;
}
</style>
