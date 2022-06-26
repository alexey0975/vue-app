<template>
  <teleport v-if="open" to="#teleport-target">
    <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
    <div class="modal-wrapper" @click="onOutsideClick">
      <div ref="contentElement" class="modal">
        <button class="modal__close-btn" @click="doClose">X</button>
        <div class="modal__content">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import useModal from '@/hooks/useModal';

export default defineComponent({
  props: {
    open: { type: Boolean },
  },

  setup(props, { emit: $emit }) {
    const contentElement = ref(null);
    const { doOpen, doClose } = useModal();

    const doCloseModal = () => {
      $emit('update:open', false);
    };

    const onOutsideClick = ($event) => {
      if ($event.target !== contentElement.value && $event.target.contains(contentElement.value)) {
        doCloseModal();
      }
    };

    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        doOpen();
      } else {
        doClose();
      }
    }, { immediate: true });

    return {
      doClose: doCloseModal,
      onOutsideClick,
      contentElement,
    };
  },
});
</script>

<style lang="stylus">
.modal-wrapper
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  display flex
  align-items center
  justify-content center
  background-color rgba(0, 0, 0, 0.7)
  z-index 99

.modal
  position relative
  max-width: 90%
  max-height: 90%
  display: flex
  padding 40px
  border-radius 15px
  background-color #fff

.modal__content
  position: relative
  max-height 100%
  overflow: auto

.modal__close-btn
  position absolute
  top 10px
  right 10px
  border-radius 5px
  color #fff
  background-color #000
  cursor pointer
  &:hover
    opacity .7
</style>
