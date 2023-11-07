import { MUSIC_URL } from '@/constant'
import axios from 'axios'

export const axiosMusic = axios.create({
  baseURL: MUSIC_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json', // 设置请求头部
  },
})
// 在实例上添加拦截器
axiosMusic.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosMusic.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
