import axios from 'axios';
import BASE_API_URL from '@/config';

const CART_API_URL = `${BASE_API_URL}/api/baskets`;

export default {
  getProduct(params) {
    return axios.get(CART_API_URL, { params });
  },

  addProduct(body, params) {
    return axios.post(`${CART_API_URL}/products`, body, { params });
  },

  updateAmountProduct(body, params) {
    return axios.put(`${CART_API_URL}/products`, body, { params });
  },

  deleteProduct(body, params) {
    return axios.delete(`${CART_API_URL}/products`, { data: body, params });
  }
};
