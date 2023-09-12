import { create } from 'zustand'

interface StoreProps {
  /**
   * 是否显示播放列表
   */
  isShowPlayList: boolean
  setShowPlayList: (isShow: boolean) => void

  /**
   * 是否显示歌曲详情
   */
  isShowSongDetail: boolean
  setShowSongDetail: (isShow: boolean) => void
}
export const useMusicStore = create<StoreProps>(set => ({
  isShowPlayList: false,
  setShowPlayList: isShow => set({ isShowPlayList: isShow }),
  isShowSongDetail: false,
  setShowSongDetail: isShow => set({ isShowSongDetail: isShow }),
}))
