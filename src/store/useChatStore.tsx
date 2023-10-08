import { create } from 'zustand'

interface StoreProps {
  /**
   *
   */
  currentActiveId: number | string
  setCurrentActiveId: (currentActiveId: number | string) => void
}
export const useChatStore = create<StoreProps>(set => ({
  currentActiveId: 0,
  setCurrentActiveId: id => set({ currentActiveId: id }),
}))
