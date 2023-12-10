import { create } from 'zustand'

interface StoreProps {
  /**
   * 当前页面类型
   */
  currentCommentId: number
  setCurrentCommentId: (current: StoreProps['currentCommentId']) => void
}
export const useArticleStore = create<StoreProps>(set => ({
  currentCommentId: 0,
  setCurrentCommentId: (current = 0) => set({ currentCommentId: current }),
}))
