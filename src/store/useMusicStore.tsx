import { create } from 'zustand'

type PlayStateType = 'stopped' | 'paused' | 'playing'
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
  /**
   * 播放状态
   */
  playState: PlayStateType
  setPlayState: (state: PlayStateType) => void
}
export const useMusicStore = create<StoreProps>(set => ({
  isShowPlayList: false,
  setShowPlayList: isShow => set({ isShowPlayList: isShow }),
  isShowSongDetail: true,
  setShowSongDetail: isShow => set({ isShowSongDetail: isShow }),
  playState: 'stopped',
  setPlayState: state => set({ playState: state }),
}))
