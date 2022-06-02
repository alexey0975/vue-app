import axios from 'axios';
import BASE_API_URL from '@/config';

export default function getProductCategories() {
  return axios.get(`${BASE_API_URL}/api/productCategories`);
}
