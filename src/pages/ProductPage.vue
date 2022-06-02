<template>
  <main class="content container loader" v-if="productLoading">Загрузка товара...</main>
  <main class="content container" v-else-if="!productData">Не удалость загрузить товар.</main>
  <main class="content container" v-else>
    <div class="content__top">
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

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image" :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in product.colors" :key="color.id">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" :value="color.id">
                    <span class="colors__value" :style="{ backgroundColor: color.code }">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" :class="{ 'disabled': productAmount <= 1 }" aria-label="Убрать один товар"
                  @click="downProductAmount">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <label>
                  <input type="text" v-model.number="productAmount" name="count">
                </label>

                <button type="button" aria-label="Добавить один товар" @click="upProductAmount">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" :class="{ 'button--load': productAddSending }" type="submit"
                :disabled="productAddSending">
                <span v-show="!productAddSending">В корзину</span>
                <span v-show="productAddSending" class="loader loader--small"></span>
              </button>
            </div>

            <div v-show="productAdded">Товар добавлен в корзину</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            {{ product.content }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import ProductsApi from '@/api/ProductsApi';

export default {
  data() {
    return {
      productAmount: 1,

      productData: null,
      productLoading: false,
      productLoadingFailed: false,

      productAdded: false,
      productAddSending: false,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return {
        ...this.productData,
        image: this.productData.image.file.url,
      };
    },

    category() {
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),

    gotoPage,
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
          this.productAmount = 1;
        });
    },

    downProductAmount() {
      if (this.productAmount > 1) {
        this.productAmount -= 1;
      }
    },

    upProductAmount() {
      this.productAmount += 1;
    },

    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      ProductsApi.getById(this.$route.params.id)
        .then((response) => { this.productData = response.data; })
        .catch(() => { this.productLoadingFailed = true; })
        .finally(() => { this.productLoading = false; });
    },
  },

  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>

<style>
.form__counter button {
  cursor: pointer;
}

.form__counter button.disabled {
  opacity: .6;
  cursor: not-allowed;
}
</style>
