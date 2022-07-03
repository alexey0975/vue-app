import { ref, computed, reactive } from 'vue';
import getColors from '@/api/ColorsApi';
import getProductCategories from '@/api/ProductCategoriesApi';

export default () => {
  const filter = reactive({
    priceFrom: 0,
    priceTo: 0,
    categoryId: 0,
    color: 0
  });

  const categoriesData = ref(null);
  const colorsData = ref(null);

  const categories = computed(() => (categoriesData.value ? categoriesData.value.items : []));
  const colors = computed(() => (colorsData.value ? colorsData.value.items : []));

  const loadCategories = () => {
    getProductCategories()
      .then(resopnse => { categoriesData.value = resopnse.data; });
  };

  const loadColors = () => {
    getColors()
      .then(resopnse => { colorsData.value = resopnse.data; });
  };

  return {
    filter,
    categories,
    colors,
    loadCategories,
    loadColors
  };
};
