<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label class="form__label">
    <slot />
    <span class="form__value">{{ title }}</span>
    <span
      v-if="error"
      class="form__error"
    >{{ error }}</span>
  </label>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    error: { type: String, default: null }
  }
};
</script>
