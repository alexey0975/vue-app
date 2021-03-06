<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} {{ wordProductFormat }}
      </span>
    </div>

    <section class="cart" v-if="products.length">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem :item="item" v-for="item in products" :key="item.productId" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span> {{ totalPricePretty }} ₽</span>
          </p>

          <router-link v-slot="{ navigate }" :to="{ name: 'order' }" custom>
            <button class="cart__button button button--primery" :disabled="!totalPrice" @click="navigate">
              Оформить заказ
            </button>
          </router-link>
        </div>
      </form>
    </section>

    <section class="cart-empty" v-else>
      <h2 class="cart-empty__title">В корзине нет ни одного товара</h2>
      <router-link class="cart-empty__link" :to="{ name: 'main' }">Перейти к покупкам</router-link>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import numberFormat from '@/helpers/numberFormat';
import wordEndFormat from '@/helpers/wordEndFormat';

export default defineComponent({
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
    }),
    totalPricePretty() {
      return numberFormat(this.totalPrice);
    },
    wordProductFormat() {
      return wordEndFormat('товар', this.products.length);
    },
  },
  components: { CartItem },
});
</script>

<style>
.cart-empty__title {
  font-size: 16px;
  line-height: 22px
}

.cart-empty__link {
  font-size: 14px;
  line-height: 1;
  color: #b9b9b9;
  text-decoration: underline;
  transition: color .2s ease;
}

.cart-empty__link:hover,
.cart-empty__link:focus {
  color: #222;
}
</style>
