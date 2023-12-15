'use client'
import { Layout } from '@/Layout'
import { SOCKET_URL } from '@/constant'
import useWebSocket from '@/hooks/useWebsocket'
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [accountInfo] = useUserStore(state => [state.accountInfo])
  const socketInstance = useWebSocket(SOCKET_URL + `?token=${accountInfo?.token}`, {
    isConnect: !!accountInfo?.token,
  })
  useEffect(() => {
    if (!accountInfo?.token) {
      socketInstance.closeServer()
    } else {
      socketInstance.connectServer()
    }
  }, [accountInfo])
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
