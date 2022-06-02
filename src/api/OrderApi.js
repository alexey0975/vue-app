import axios from 'axios';
import BASE_API_URL from '@/config';

const ORDER_API_URL = `${BASE_API_URL}/api/orders`;

export default {
  get(orderId, params) {
    return axios.get(`${ORDER_API_URL}/${orderId}`, { params });
  },

  create(body, params) {
    return axios.post(ORDER_API_URL, body, { params });
  },
};
