import { SOCKET_URL } from '@/constant'
import useWebSocket from '@/hooks/useWebsocket'
import { useUserStore } from '@/store/useUserStore'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import '@/styles/index.scss'
import '@/styles/md/index.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const [accountInfo] = useUserStore(state => [state.accountInfo])
  const socketInstance = useWebSocket(SOCKET_URL + `?token=${accountInfo?.token}`, {
    isConnect: !!accountInfo?.token,
  })
  useEffect(() => {
    if (!accountInfo?.token) {
      socketInstance?.socket?.close()
    }
  }, [accountInfo])
  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Component {...pageProps} {...socketInstance} />
    </>
  )
}

export default MyApp
