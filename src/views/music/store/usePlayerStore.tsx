import { create } from 'zustand'
interface StoreProps {
  /**
   * progress
   */
  progress: number
  setProgress: (progress: StoreProps['progress']) => void
  /**
   * 播放模式
   */
  playState: 'playing' | 'paused'
  setPlayState: (playMode: StoreProps['playState']) => void
  /**
   * audio实例
   */
  audio: HTMLAudioElement | null
  setAudio: (audio: StoreProps['audio']) => void
}
export const usePlayerStore = create<StoreProps>(set => ({
  playState: 'paused',
  setPlayState: playMode => set({ playState: playMode }),
  progress: 0,
  setProgress: progress => set({ progress }),
  audio: new Audio(),
  setAudio: audio => set({ audio }),
}))
