import { Notyf } from 'notyf'
import { IAxiosInstanceProps } from './types'

type Options = Required<Pick<IAxiosInstanceProps, 'codeList' | 'maps'>>

/* ### 业务请求错误处理 ### */
export const dealBusinessError = (
  response: any = {},
  { codeList, maps }: Options,
  notyf?: Notyf
) => {
  if (!response[maps.code]) return
  const type = Object.prototype.toString.call(codeList?.[response?.[maps?.code]])
  if (type === '[object Function]') {
    codeList[response[maps.code]]()
  } else {
    if (typeof response?.[maps?.msg] === 'object') {
      notyf?.error('server error')
      return
    }
    notyf?.error(response?.[maps?.msg] || 'server error')
  }
}

/* ### 网络请求错误处理 ### */
export const dealNetworkError = (
  response: any = {},
  { codeList = {}, maps }: Options,
  notyf?: Notyf
) => {
  const type = Object.prototype.toString.call(codeList?.[response?.status])
  if (type === '[object Function]') {
    codeList[response.status]()
  } else {
    notyf?.error(response?.data?.[maps?.msg] || 'network error')
  }
}
