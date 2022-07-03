<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <BaseFormField
    :error="error"
    :title="title"
  >
    <input
      v-model="dataValue"
      class="form__input"
      :type="type"
      :placeholder="placeholder"
    >
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
  props: {
    type: {
      type: String,
      default: 'text'
    }
  }
};
</script>
