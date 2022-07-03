import axios from 'axios';
import BASE_API_URL from '@/config';

const PRODUCTS_API_URL = `${BASE_API_URL}/api/products`;

export default {
  getList(params) {
    return axios.get(PRODUCTS_API_URL, { params });
  },

  getById(productId) {
    return axios.get(`${PRODUCTS_API_URL}/${productId}`);
  }
};
