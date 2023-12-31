import { SongsItem, UserInfoType } from '@/views/music/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
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
   * 当前播放的歌曲列表
   */
  currentSongList: SongsItem[]
  setCurrentSongList: (songList: StoreProps['currentSongList']) => void
  /**
   * 当前播放的歌曲索引
   */
  currentSongIndex: number
  setCurrentSongIndex: (index: StoreProps['currentSongIndex']) => void
  /**
   * 当前登录用户信息
   */
  userProfile: UserInfoType | null
  setUserProfile: (userProfile: StoreProps['userProfile']) => void
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
      currentSongList: [],
      setCurrentSongList: songList => set({ currentSongList: songList }),
      currentSongIndex: -1,
      setCurrentSongIndex: index => set({ currentSongIndex: index }),
      userProfile: null,
      setUserProfile: userProfile => set({ userProfile }),
    }),
    {
      name: 'music-store',
      storage: createJSONStorage(() => window.localStorage),
    }
  )
)
