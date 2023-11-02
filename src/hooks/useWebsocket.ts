import { useEffect, useRef, useState } from 'react'

export interface WebSocketReturnType {
  socket: WebSocket | null
  sendMessage: (message: any) => void
  onMessage: (callback: (message: string) => void) => void
  onClose: (callback: () => void) => void
  onOpen: (callback: () => void) => void
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
  useEffect(() => {
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
  }, [url, isConnect])

  const sendMessage = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message)
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
  const onMessage = (callback: (message: string) => void) => {
    if (socket) {
      socket.onmessage = event => {
        const message: string = event.data
        callback(message)
      }
    }
  }

  return {
    socket,
    sendMessage,
    onMessage,
    onClose,
    onOpen,
  }
}

export default useWebSocket
