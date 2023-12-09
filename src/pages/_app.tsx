import { PROJECT_NAME, SOCKET_URL } from '@/constant'
import useWebSocket from '@/hooks/useWebsocket'
import { useUserStore } from '@/store/useUserStore'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Suspense, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import { Header } from '@/Layout/header'
import '@/styles/index.scss'
import { Background } from '@/Layout/background'
import { Footer } from '@/Layout/footer'
import { useRouter } from 'next/router'
import { MessageProvider } from '@/provider/messageProvider'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6060e0',
      light: '#8888e8',
      dark: '#7333ea',
      contrastText: '#f3e8ff',
    },
    secondary: {
      main: '#9a9999',
      light: '#8a9999',
      dark: '#cccccc',
      contrastText: '#f2f3f5',
    },
  },
})
const routesHideFooter = ['/music', '/articles/new', '/chat']
const routesHideBackground = ['/music']
function App({ Component, pageProps }: AppProps) {
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
  const router = useRouter()
  const { pathname } = router
  return (
    <ThemeProvider theme={theme}>
      <MessageProvider>
        <Head>
          <title>{PROJECT_NAME}</title>
          <link rel="icon" href="/logo.png" />
          <meta name="description" content={PROJECT_NAME} />
          <meta name="keywords" content={PROJECT_NAME} />
        </Head>
        <div className={`layout_container w-full h-full flex flex-col`}>
          <Header />
          <Background />
          <Suspense fallback={<div className="relative">Loading feed...</div>}>
            <div
              className={`flex-1 flex-shrink-0 relative flex flex-col ${
                !routesHideBackground.includes(pathname) ? 'bg-zinc-100' : ''
              }`}
            >
              <Component {...pageProps} accountInfo={accountInfo} {...socketInstance} />
            </div>
          </Suspense>
          {!routesHideFooter.includes(pathname) && <Footer />}
        </div>
      </MessageProvider>
    </ThemeProvider>
  )
}

export default App
