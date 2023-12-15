import { WebSocketInstance } from '@/hooks/useWebsocket'
import { create } from 'zustand'

interface StoreProps {
  /**
   * 当前激活的聊天窗口id 0为默认
   */
  currentActiveId: number
  setCurrentActiveId: (currentActiveId: number) => void
  /**
   * 当前socket实例
   */
  socketInstance: WebSocketInstance | null
  setSocketInstance: (socket: StoreProps['socketInstance']) => void
}
export const useChatStore = create<StoreProps>(set => ({
  currentActiveId: 0,
  setCurrentActiveId: id => set({ currentActiveId: id }),
  socketInstance: null,
  setSocketInstance: socketInstance => set({ socketInstance }),
}))
