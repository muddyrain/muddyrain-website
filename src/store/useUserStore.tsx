import { UserType } from '@/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * 用户信息存储KEY
 */
export const USER_STORE_KEY = 'userStore'
interface State {
  accountInfo: UserType | null
  setAccountInfo: (accountInfo: State['accountInfo']) => void
}
export const useUserStore = create(
  persist<State>(
    set => ({
      accountInfo: null,
      setAccountInfo: accountInfo => {
        set({
          accountInfo,
        })
      },
    }),
    {
      name: USER_STORE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
)
