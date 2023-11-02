import { IAxiosInstanceProps } from './types'
import { Notyf, INotyfOptions } from 'notyf'
type Options = Required<Pick<IAxiosInstanceProps, 'codeList' | 'maps'>>
const NotyfOptions: Partial<INotyfOptions> = {
  duration: 1000,
  position: { x: 'center', y: 'top' },
}
/* ### 业务请求错误处理 ### */
export const dealBusinessError = (response: any = {}, { codeList, maps }: Options) => {
  if (!response[maps.code]) return
  const type = Object.prototype.toString.call(codeList?.[response?.[maps?.code]])
  if (type === '[object Function]') {
    codeList[response[maps.code]]()
  } else {
    const notyf = new Notyf(NotyfOptions)
    notyf.error(response?.[maps?.msg] || 'server error')
  }
}

/* ### 网络请求错误处理 ### */
export const dealNetworkError = (response: any = {}, { codeList = {}, maps }: Options) => {
  const type = Object.prototype.toString.call(codeList?.[response?.status])
  if (type === '[object Function]') {
    codeList[response.status]()
  } else {
    const notyf = new Notyf(NotyfOptions)
    notyf.error(response?.data?.[maps?.msg] || 'network error')
  }
}
