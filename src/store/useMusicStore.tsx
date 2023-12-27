import { SongsItem } from '@/views/music/types'
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
  /**
   * 是否显示登录框
   */
  isShowLogin: boolean
  setShowLogin: (state: boolean) => void
  /**
   * 当前播放的歌曲
   */
  currentSong: SongsItem | null
  setCurrentSong: (song: StoreProps['currentSong']) => void
  /**
   * 当前播放的歌曲列表
   */
  currentSongList: SongsItem[]
  setCurrentSongList: (songList: StoreProps['currentSongList']) => void
}
export const useMusicStore = create<StoreProps>(set => ({
  isShowPlayList: false,
  setShowPlayList: isShow => set({ isShowPlayList: isShow }),
  isShowLogin: false,
  setShowLogin: isShow => set({ isShowLogin: isShow }),
  isShowSongDetail: false,
  setShowSongDetail: isShow => set({ isShowSongDetail: isShow }),
  currentSong: null,
  setCurrentSong: song => set({ currentSong: song }),
  currentSongList: [],
  setCurrentSongList: songList => set({ currentSongList: songList }),
}))
