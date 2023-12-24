import { WebSocketInstance } from '@/hooks/useWebsocket'
import { UserType } from '@/types'
import { create } from 'zustand'

interface StoreProps {
  /**
   * 当前激活的聊天窗口id 0为默认
   */
  currentActiveUser: UserType | null
  setCurrentActiveUser: (currentActiveUser: StoreProps['currentActiveUser']) => void
  /**
   * 当前socket实例
   */
  socketInstance: WebSocketInstance | null
  setSocketInstance: (socket: StoreProps['socketInstance']) => void
}
export const useChatStore = create<StoreProps>(set => ({
  currentActiveUser: null,
  setCurrentActiveUser: user => set({ currentActiveUser: user }),
  socketInstance: null,
  setSocketInstance: socketInstance => set({ socketInstance }),
}))
