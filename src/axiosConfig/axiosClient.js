import axios from 'axios'
import { encryptData } from '@/components/crypto/encryptData'

const axiosClient = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type':'application/json'
    }
})

// Add a request interceptor

axiosClient.interceptors.request.use(async function (config) {
  config.data = encryptData(config.data)
  return config
})

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient