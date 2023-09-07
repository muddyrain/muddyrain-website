import { create } from 'zustand'

interface StoreProps {
  /**
   * 是否显示播放列表
   */
  isShowPlayList: boolean
  setShowPlayList: (isShow: boolean) => void
}
export const useMusicStore = create<StoreProps>(set => ({
  isShowPlayList: false,
  setShowPlayList: isShow => set({ isShowPlayList: isShow }),
}))
