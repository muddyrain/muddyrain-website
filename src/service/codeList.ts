import { useUserStore } from '@/store/useUserStore'
import { IAxiosInstanceProps } from './types'

export default {
  401: () => {
    useUserStore.getState().setAccountInfo(null)
  },
  403: () => {
    useUserStore.getState().setAccountInfo(null)
  },
} as IAxiosInstanceProps['codeList']
