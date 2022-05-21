import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({ productId, amount });
      }
    },

    updateCardProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },

    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((product) => product.productId !== productId);
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.productId),
      }));
    },

    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
});
