import ProductsApi from '@/api/ProductsApi';
import numberFormat from '@/helpers/numberFormat';
import { ref, computed, reactive } from 'vue';
import { PRODUCTS_PER_PAGE } from '@/config';

export default () => {
  const productData = ref(null);
  const productListData = ref(null);
  const category = computed(() => productData.value.category);

  const productListFilter = reactive({
    priceFrom: 0,
    priceTo: 0,
    categoryId: 0,
    color: 0,
  });

  const fetchStatus = reactive({
    isLoading: false,
    isFailed: false,
  });

  const fetchProduct = (productId) => {
    fetchStatus.isLoading = true;
    fetchStatus.isFailed = false;
    ProductsApi.getById(productId)
      .then((response) => {
        const product = response.data;
        productData.value = Object.assign(response.data, {
          pricePretty: numberFormat(product.price),
          image: product.image.file.url,
        });
      })
      .catch(() => {
        fetchStatus.isFailed = true;
      })
      .finally(() => {
        fetchStatus.isLoading = false;
      });
  };

  const fetchProductList = (page) => {
    fetchStatus.isLoading = true;
    fetchStatus.isFailed = false;

    ProductsApi.getList({
      page,
      limit: PRODUCTS_PER_PAGE,
      categoryId: productListFilter.categoryId,
      minPrice: productListFilter.priceFrom,
      maxPrice: productListFilter.priceTo,
      colorId: productListFilter.color,
    })
      .then((response) => {
        productListData.value = response.data;
      })
      .catch(() => {
        fetchStatus.isFailed = true;
      })
      .finally(() => {
        fetchStatus.isLoading = false;
      });
  };

  return {
    product: productData,
    category,
    productListData,
    productListFilter,
    fetchProduct,
    fetchProductList,
    status: fetchStatus,
  };
};
