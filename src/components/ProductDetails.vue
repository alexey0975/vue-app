<template>
  <section class="item">
    <div class="item__pics pics">
      <div class="pics__wrapper">
        <img
          :src="product.image"
          :alt="product.title"
        >
      </div>
    </div>

    <div class="item__info">
      <span class="item__code">Артикул: {{ product.id }}</span>
      <h2 class="item__title">
        {{ product.title }}
      </h2>
      <div class="item__form">
        <form
          class="form"
          action="#"
          method="POST"
          @submit.prevent="doAddToCart"
        >
          <b class="item__price"> {{ product.pricePretty }} ₽ </b>

          <fieldset class="form__block">
            <legend class="form__legend">
              Цвет:
            </legend>
            <ul class="colors">
              <li
                v-for="color in product.colors"
                :key="color.id"
                class="colors__item"
              >
                <label
                  class="colors__label"
                  for="color-item"
                >
                  <input
                    class="colors__radio sr-only"
                    type="radio"
                    name="color-item"
                    :value="color.id"
                  >
                  <span
                    class="colors__value"
                    :style="{ backgroundColor: color.code }"
                  />
                </label>
              </li>
            </ul>
          </fieldset>

          <div class="item__row">
            <div class="form__counter">
              <button
                type="button"
                :class="{ disabled: productAmount <= 1 }"
                aria-label="Убрать один товар"
                @click="doDownProductAmount"
              >
                <svg
                  width="12"
                  height="12"
                  fill="currentColor"
                >
                  <use xlink:href="#icon-minus" />
                </svg>
              </button>

              <label for="count">
                <input
                  v-model.number="productAmount"
                  type="text"
                  name="count"
                >
              </label>

              <button
                type="button"
                aria-label="Добавить один товар"
                @click="doUpProductAmount"
              >
                <svg
                  width="12"
                  height="12"
                  fill="currentColor"
                >
                  <use xlink:href="#icon-plus" />
                </svg>
              </button>
            </div>

            <button
              class="button button--primery"
              :class="{ 'button--load': isProductAddSending }"
              type="submit"
              :disabled="isProductAddSending"
            >
              <span v-show="!isProductAddSending">В корзину</span>
              <span
                v-show="isProductAddSending"
                class="loader loader--small"
              />
            </button>

            <base-modal v-model:open="isProductAdded">
              Товар добавлен в корзину
            </base-modal>
          </div>
        </form>
      </div>
    </div>

    <div class="item__desc">
      <ul class="tabs">
        <li class="tabs__item">
          <a class="tabs__link tabs__link--current"> Описание </a>
        </li>
        <li class="tabs__item">
          <a
            class="tabs__link"
            href="#"
          > Характеристики </a>
        </li>
        <li class="tabs__item">
          <a
            class="tabs__link"
            href="#"
          > Гарантия </a>
        </li>
        <li class="tabs__item">
          <a
            class="tabs__link"
            href="#"
          > Оплата и доставка </a>
        </li>
      </ul>

      <div class="item__content">
        <p>
          {{ product.content }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import useCount from '@/hooks/useCount';
import useCartProduct from '@/hooks/useCartProduct';

export default defineComponent({

  components: { BaseModal },
  props: {
    product: { type: [Object], required: true }
  },

  setup(props) {
    const {
      count: productAmount, doUpCount: doUpProductAmount, doDownCount: doDownProductAmount
    } = useCount(1);

    const {
      isAddSending: isProductAddSending, isAdded: isProductAdded, doAdd
    } = useCartProduct();

    const doAddToCart = () => {
      doAdd(productAmount.value, props.product.id);
      productAmount.value = 1;
    };

    return {
      isProductAddSending,
      isProductAdded,
      productAmount,
      doDownProductAmount,
      doUpProductAmount,
      doAddToCart
    };
  }
});
</script>

<style lang="stylus" scoped>
img
  height: 500px
</style>
