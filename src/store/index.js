import { createStore } from 'vuex';
import CartApi from '@/api/CartApi';
import OrderApi from '@/api/OrderApi';

export default createStore({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: null,
    orderInfo: null
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },

    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },

    updateCardProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(product => product.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },

    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(product => product.productId !== productId);
    },

    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },

    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },

    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => ({
        productId: item.product.id,
        amount: item.quantity
      }));
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const { product } = state.cartProductsData.find(p => p.product.id === item.productId);
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        };
      });
    },

    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    }
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return OrderApi.get(orderId, { userAccessKey: context.state.userAccessKey })
        .then(response => {
          context.commit('updateOrderInfo', response.data);
        });
    },

    loadCart(context) {
      return CartApi.getProduct({ userAccessKey: context.state.userAccessKey })
        .then(response => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }

          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },

    addProductToCart(context, { productId, amount }) {
      return CartApi.addProduct({ productId, quantity: amount }, { userAccessKey: context.state.userAccessKey })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },

    updateCardProductAmount(context, { productId, amount }) {
      context.commit('updateCardProductAmount', { productId, amount });
      if (amount < 1) {
        return false;
      }

      return CartApi.updateAmountProduct({
        productId, quantity: amount
      }, {
        userAccessKey: context.state.userAccessKey
      })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },

    deleteCartProduct(context, productId) {
      return CartApi.deleteProduct({ productId }, { userAccessKey: context.state.userAccessKey })
        .then(() => {
          context.commit('deleteCartProduct', productId);
        });
    }
  }
});
