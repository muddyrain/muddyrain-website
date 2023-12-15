'use client'
import { WebSocketReturnType } from '@/hooks/useWebsocket'
import ChatPage from '@/views/chat'

export default function Page(socketProps: WebSocketReturnType) {
  return <ChatPage {...socketProps} />
}
