import axios, { AxiosInstance } from 'axios'
import { dealBusinessError, dealNetworkError } from './handle'
import { IAxiosInstanceProps } from './types'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { useUserStore } from '@/store/useUserStore'
import { INotyfOptions, Notyf } from 'notyf'

const NotyfOptions: Partial<INotyfOptions> = {
  duration: 1000,
  position: { x: 'center', y: 'top' },
}
export class CreateAxiosInstance {
  private whiteList: IAxiosInstanceProps['whiteList'] = []
  private codeList: IAxiosInstanceProps['codeList'] = {}
  private maps: IAxiosInstanceProps['maps']
  public fetch: AxiosInstance
  public notyf: Notyf | undefined
  constructor({
    baseURL,
    whiteList = [],
    codeList = {},
    maps,
    timeout = 60000,
  }: IAxiosInstanceProps) {
    if (typeof document !== 'undefined') {
      this.notyf = new Notyf(NotyfOptions)
    }
    this.whiteList = whiteList
    this.codeList = codeList
    this.maps = maps
    this.fetch = axios.create({
      baseURL,
      timeout,
    })
    this.fetch.interceptors.request.use(
      config => {
        const accountInfo = useUserStore.getState().accountInfo
        NProgress.start()
        if (accountInfo?.token) {
          config.headers['Authorization'] = accountInfo.token
        }
        const type = Object.prototype.toString.call(config.data)
        const UPMethod = config.method?.toUpperCase()
        if (type === '[object Object]' && UPMethod === 'FORMDATA') {
          const formData = new FormData()
          for (const key in config.data) {
            formData.append(key, config.data[key])
          }
          config.method = 'POST'
          config.data = formData
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    const options = { codeList: this.codeList, maps: this.maps }
    this.fetch.interceptors.response.use(
      response => {
        NProgress.done()
        const requestUrl = response.config.url || ''
        // 白名单
        const isWhite = this.whiteList?.some(item => item.includes(requestUrl))
        const result = response.data
        if (isWhite) {
          return result
        } else if (result?.[this.maps?.code] === 200) {
          return result?.[this.maps?.data] ?? {}
        } else {
          dealBusinessError(result || {}, options, this.notyf)
          Promise.reject(result)
          return false
        }
      },
      error => {
        NProgress.done()
        dealNetworkError(error?.response || {}, options, this.notyf)
        return Promise.reject(error)
      }
    )
  }
}
