<template>
  <teleport v-if="open" to="#teleport-target">
    <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
    <div class="modal-wrapper" @click="onOutsideClick">
      <div ref="content" class="modal">
        <button class="modal__close-btn" @click="doClose">X</button>
        <div class="modal__content">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
let openedCount = 0;
let atleastOneOpen = false;

export default {
  props: {
    open: { type: Boolean },
  },

  methods: {
    onOutsideClick($event) {
      if ($event.target !== this.$refs.content && $event.target.contains(this.$refs.content)) {
        this.doClose();
      }
    },

    doClose() {
      this.$emit('update:open', false);
    },

    checkBlackoutState() {
      if (!openedCount) {
        atleastOneOpen = false;
        document.body.style.overflow = null;
        document.body.style.paddingRight = null;
      } else if (!atleastOneOpen && openedCount === 1) {
        atleastOneOpen = true;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
      }
    },
  },

  watch: {
    open: {
      handler(isOpen) {
        if (isOpen) {
          openedCount += 1;
        } else {
          openedCount -= 1;
        }

        this.checkBlackoutState();
      },
    },
  },
  created() {
    if (this.open) {
      openedCount += 1;
      this.checkBlackoutState();
    }
  },
};
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
