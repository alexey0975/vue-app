<template>
  <aside class="filter">
    <h2 class="filter__title">
      Фильтры
    </h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">
          Цена
        </legend>
        <label
          class="form__label form__label--price"
          for="min-price"
        >
          <input
            v-model.number="currentPriceFrom"
            class="form__input"
            type="text"
            name="min-price"
          >
          <span class="form__value">От</span>
        </label>
        <label
          class="form__label form__label--price"
          for="max-price"
        >
          <input
            v-model.number="currentPriceTo"
            class="form__input"
            type="text"
            name="max-price"
          >
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Категория
        </legend>
        <label
          class="form__label form__label--select"
          for="category"
        >
          <select
            v-model.number="currentCategoryId"
            class="form__select"
            name="category"
          >
            <option value="0">Все категории</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Цвет
        </legend>
        <ul class="colors">
          <li
            v-for="colorValue in colors"
            :key="colorValue.id"
            class="colors__item"
          >
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label
              class="colors__label"
            >
              <input
                v-model="currentColor"
                class="colors__radio sr-only"
                type="radio"
                name="color"
                :value="colorValue.id"
              >
              <span
                class="colors__value"
                :style="{ backgroundColor: colorValue.code, }"
              />
            </label>
          </li>
        </ul>
      </fieldset>

      <button
        class="filter__submit button button--primery"
        type="submit"
      >
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import useFilter from '@/hooks/useFilter';
import {
  defineComponent, ref
} from 'vue';

export default defineComponent({
  props: {
    priceFrom: { type: [Number, String], required: true, name: 'priceFrom' },
    priceTo: { type: [Number, String], required: true },
    categoryId: { type: [Number, String], required: true },
    color: { type: [Number, String], required: true }
  },
  emits: ['update:priceFrom', 'update:priceTo', 'update:categoryId', 'update:color'],

  setup(props, { emit: $emit }) {
    const currentPriceFrom = ref(0);
    const currentPriceTo = ref(0);
    const currentCategoryId = ref(0);
    const currentColor = ref(0);

    const {
      categories, colors, loadCategories, loadColors
    } = useFilter();

    const submit = () => {
      $emit('update:priceFrom', currentPriceFrom.value);
      $emit('update:priceTo', currentPriceTo.value);
      $emit('update:categoryId', currentCategoryId.value);
      $emit('update:color', currentColor.value);
    };

    const reset = () => {
      $emit('update:priceFrom', 0);
      $emit('update:priceTo', 0);
      $emit('update:categoryId', 0);
      $emit('update:color', 0);
    };

    loadCategories();
    loadColors();

    return {
      currentPriceFrom,
      currentPriceTo,
      currentCategoryId,
      currentColor,
      categories,
      colors,
      submit,
      reset
    };
  }
});
</script>
