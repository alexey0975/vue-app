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
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
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

    <section class="cart">
      <div v-if="orderLoading" class="ghost">
        <div class="loader">Загрузка...</div>
      </div>

      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО" :error="formError.name" v-model="formData.name"
              placeholder="Введите ваше полное имя" />

            <BaseFormText title="Адрес доставки" :error="formError.address" v-model="formData.address"
              placeholder="Введите ваш адрес" />

            <BaseFormText title="Телефон" :error="formError.phone" v-model="formData.phone" type="'tel"
              placeholder="Введите ваш телефон" />

            <BaseFormText title="Email" :error="formError.email" v-model="formData.email" type="'email"
              placeholder="Введите ваш Email" />

            <BaseFormTextarea title="Комментарий к заказу" :error="formError.comment" v-model="formData.comment"
              placeholder="Ваши пожелания" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderItem :item="item" v-for="item in products" :key="item.productId" />
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ products.length }}</b> {{ wordProductFormat }} на сумму <b>{{ totalPricePretty }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import { mapGetters } from 'vuex';
import OrderApi from '@/api/OrderApi';
import numberFormat from '@/helpers/numberFormat';
import wordEndFormat from '@/helpers/wordEndFormat';

export default {
  components: { BaseFormText, BaseFormTextarea, OrderItem },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderLoading: false,
    };
  },

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

  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.orderLoading = true;

      OrderApi.create({ ...this.formData }, { userAccessKey: this.$store.state.userAccessKey })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        })
        .finally(() => {
          this.orderLoading = false;
        });
    },
  },
};
</script>

<style lang="stylus">
.cart
  position relative
.ghost
  position absolute
  left 0
  top 0
  bottom 0
  right 0
  background-color #fff
  opacity .9
  z-index 99
</style>
