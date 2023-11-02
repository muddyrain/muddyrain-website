import { SOCKET_URL } from '@/constant'
import useWebSocket from '@/hooks/useWebsocket'
import { useUserStore } from '@/store/useUserStore'
import type { AppProps } from 'next/app'
import { startTransition, useEffect, useRef, useState, useTransition } from 'react'
function MyApp({ Component, pageProps }: AppProps) {
  const [accountInfo] = useUserStore(state => [state.accountInfo])
  const socketRes = useWebSocket(SOCKET_URL + `?token=${accountInfo?.token}`, {
    isConnect: !!accountInfo?.token,
  })
  return <Component {...pageProps} {...socketRes} />
}

export default MyApp
