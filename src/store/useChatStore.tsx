import { create } from 'zustand'

interface StoreProps {
  /**
   * 当前激活的聊天窗口id 0为默认
   */
  currentActiveId: number
  setCurrentActiveId: (currentActiveId: number) => void
  /**
   * 当前socket实体
   */
  socket: WebSocket | null
  setSocket: (socket: WebSocket | null) => void
}
export const useChatStore = create<StoreProps>(set => ({
  currentActiveId: 0,
  setCurrentActiveId: id => set({ currentActiveId: id }),
  socket: null,
  setSocket: socket => set({ socket }),
}))
