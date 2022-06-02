import axios from 'axios';
import BASE_API_URL from '@/config';

export default function getColors() {
  return axios.get(`${BASE_API_URL}/api/colors`);
}
