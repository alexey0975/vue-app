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
      <div v-if="orderLoader" class="loader">Загрузка</div>
      <div v-if="orderErrorLoad" class="loader">Не удалось загрузить информацию о заказе</div>

      <h1 v-if="orderData" class="content__title">
        Заказ оформлен <span>№ {{ order.id }}</span>
      </h1>
    </div>
    <section v-if="orderData" class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ order.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ order.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ order.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ order.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderItem :item="item" v-for="item in order.basket.items" :key="item.id" />
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ order.basket.items.length }}</b> {{ wordProductFormat }} на
              сумму <b>{{ totalPricePretty }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue';
import { mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import wordEndFormat from '@/helpers/wordEndFormat';

export default {

  components: { OrderItem },

  data() {
    return {
      orderLoader: false,
      orderErrorLoad: false,
      orderData: null,
    };
  },

  computed: {
    order() {
      return {
        ...this.orderData,
        basket: {
          ...this.orderData.basket,
          items: this.orderData.basket.items.map((item) => ({
            ...item,
            amount: item.quantity,
          })),
        },
      };
    },
    totalPricePretty() {
      return numberFormat(this.order.totalPrice);
    },
    wordProductFormat() {
      return wordEndFormat('товар', this.order.basket.items.length);
    },
  },

  methods: {
    ...mapActions(['loadOrderInfo']),
  },
  created() {
    this.orderLoader = true;
    this.orderErrorLoad = false;

    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      this.orderData = this.$store.state.orderInfo;
      this.orderLoader = false;
      return;
    }
    this.loadOrderInfo(this.$route.params.id)
      .then(() => {
        this.orderData = this.$store.state.orderInfo;
      })
      .catch(() => {
        this.orderErrorLoad = true;
      })
      .finally(() => {
        this.orderLoader = false;
      });
  },
};
</script>
