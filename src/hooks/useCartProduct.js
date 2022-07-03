import { useStore } from 'vuex';
import { ref, computed } from 'vue';

export default () => {
  const $store = useStore();
  const isAddSending = ref(false);
  const isAdded = ref(false);
  const products = computed(() => $store.getters.cartDetailProducts);
  const totalPrice = computed(() => $store.getters.cartTotalPrice);
  const amountProducts = computed(() => $store.state.cartProducts.length);

  const doAdd = (amount, productId) => {
    isAdded.value = false;
    isAddSending.value = true;

    $store.dispatch('addProductToCart', {
      productId,
      amount
    }).then(() => {
      isAdded.value = true;
      isAddSending.value = false;
    });
  };
  const doUpdateAmount = (productId, amount) => { $store.dispatch('updateCardProductAmount', { productId, amount }); };
  const doDelete = productId => { $store.dispatch('deleteCartProduct', productId); };

  return {
    isAddSending,
    isAdded,
    products,
    totalPrice,
    amountProducts,
    doAdd,
    doUpdateAmount,
    doDelete
  };
};
