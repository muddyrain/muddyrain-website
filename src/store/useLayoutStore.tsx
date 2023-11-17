import { create } from 'zustand'

interface StoreProps {
  /**
   * 是否显示登录弹窗
   */
  isShowLogin: boolean
  setShowLogin: (isShow: boolean) => void
  /**
   * 当前页面类型
   */
  currentType: 1 | 2
  setCurrentType: (currentType: StoreProps['currentType']) => void
}
export const useLayoutStore = create<StoreProps>(set => ({
  isShowLogin: false,
  setShowLogin: isShow => set({ isShowLogin: isShow }),
  currentType: 1,
  setCurrentType: currentType => set({ currentType }),
}))
