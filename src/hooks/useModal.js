import {
  ref, getCurrentInstance, computed, watch
} from 'vue';

const openModalCount = ref(new Set());

export default () => {
  const { uid } = getCurrentInstance();
  const isOpen = ref(false);

  const doOpen = () => {
    isOpen.value = true;
    openModalCount.value.add(uid);
  };
  const doClose = () => {
    isOpen.value = false;
    openModalCount.value.delete(uid);
  };

  const isSomeOpen = computed(() => openModalCount.value.size);

  const checkBlackoutState = () => {
    if (!isSomeOpen.value) {
      document.body.style.overflow = null;
      document.body.style.paddingRight = null;
    } else {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    }
  };

  watch(isSomeOpen, () => {
    checkBlackoutState();
  });

  return {
    doOpen,
    doClose,
    isOpen,
    isSomeOpen
  };
};
