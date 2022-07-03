<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <BaseFormField
    :error="error"
    :title="title"
  >
    <textarea
      v-model="dataValue"
      class="form__input form__input--area"
      :placeholder="placeholder"
    />
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin]
};
</script>
