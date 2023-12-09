import { MessageType } from '@/types'
import { useRef, useState } from 'react'

export interface WebSocketReturnType {
  socket: WebSocket | null
  sendMessage: (message: MessageType) => void
  onMessage: (callback: (message: MessageType) => void) => void
  onClose: (callback: () => void) => void
  onOpen: (callback: () => void) => void
  connectServer: () => void
  closeServer: () => void
}
const useWebSocket = (
  url: string,
  {
    isConnect = true,
  }: {
    isConnect: boolean
  }
): WebSocketReturnType => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const isInitWs = useRef(false)
  const handleOpenLog = () => {
    console.log(`%c WebSocket connection established`, 'color: green; font-weight: bold;')
  }
  const handleCloseLog = () => {
    console.log(`%c WebSocket connection closed`, 'color: red; font-weight: bold;')
  }

  const connectServer = () => {
    if (!isInitWs.current && isConnect) {
      const newSocket = new WebSocket(url)
      setSocket(newSocket)
      isInitWs.current = true
      newSocket.onopen = () => {
        handleOpenLog()
      }
      newSocket.onclose = () => {
        handleCloseLog()
      }
    }
  }

  const closeServer = () => {
    if (socket) {
      socket.close()
    }
  }

  const sendMessage = (message: MessageType) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message))
    } else {
      console.log('WebSocket not connected')
    }
  }
  const onOpen = (callback: () => void) => {
    if (socket) {
      socket.onopen = () => {
        handleOpenLog()
        callback()
      }
    }
  }
  const onClose = (callback: () => void) => {
    if (socket) {
      socket.onclose = () => {
        handleCloseLog()
        isInitWs.current = false
        callback()
      }
    }
  }
  const onMessage = (callback: (message: MessageType) => void) => {
    if (socket) {
      socket.onmessage = event => {
        const message: string = event.data
        callback(JSON.parse(message || '{}'))
      }
    }
  }

  return {
    socket,
    sendMessage,
    onMessage,
    onClose,
    onOpen,
    connectServer,
    closeServer,
  }
}

export default useWebSocket
