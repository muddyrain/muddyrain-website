import { MUSIC_URL } from '@/constant'
import axios from 'axios'
import { dealBusinessError, dealNetworkError } from './handle'
import { INotyfOptions, Notyf } from 'notyf'

const NotyfOptions: Partial<INotyfOptions> = {
  duration: 1000,
  position: { x: 'center', y: 'top' },
}
let notyf: Notyf | undefined
if (typeof document !== 'undefined') {
  notyf = new Notyf(NotyfOptions)
}
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
const options = {
  codeList: {},
  maps: {
    msg: 'message',
    code: 'code',
    data: 'data',
  },
}
axiosMusic.interceptors.response.use(
  response => {
    const result = response.data
    if (response.status === 200) {
      return result
    } else {
      dealBusinessError(result || {}, options, notyf)
      Promise.reject(result)
      return false
    }
  },
  error => {
    dealNetworkError(error?.response || {}, options, notyf)
    return Promise.reject(error)
  }
)
