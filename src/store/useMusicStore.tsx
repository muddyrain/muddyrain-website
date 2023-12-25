import { SongsItem } from '@/views/music/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

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
   * 是否显示登录框
   */
  isShowLogin: boolean
  setShowLogin: (state: boolean) => void
  /**
   * 播放状态
   */
  playState: PlayStateType
  setPlayState: (state: PlayStateType) => void
  /**
   * 当前播放的歌曲
   */
  currentSong: SongsItem | null
  setCurrentSong: (song: StoreProps['currentSong']) => void
}
export const useMusicStore = create(
  persist<StoreProps>(
    set => ({
      isShowPlayList: false,
      setShowPlayList: isShow => set({ isShowPlayList: isShow }),
      isShowLogin: false,
      setShowLogin: isShow => set({ isShowLogin: isShow }),
      isShowSongDetail: false,
      setShowSongDetail: isShow => set({ isShowSongDetail: isShow }),
      playState: 'stopped',
      setPlayState: state => set({ playState: state }),
      currentSong: null,
      setCurrentSong: song => set({ currentSong: song }),
    }),
    {
      name: 'music-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
