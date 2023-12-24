import { FC, ReactElement, ReactNode, cloneElement, memo, useEffect, useRef } from 'react'
import { PROJECT_NAME, SOCKET_URL } from '@/constant'
import Head from 'next/head'
import { Suspense } from 'react'
import { IconButton, ThemeProvider } from '@mui/material'
import { Header } from '@/Layout/header'
import '@/styles/index.scss'
import { Background } from '@/Layout/background'
import { Footer } from '@/Layout/footer'
import { MessageProvider } from '@/provider/messageProvider'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { theme } from './theme'
import { useUserStore } from '@/store/useUserStore'
import useWebSocket from '@/hooks/useWebsocket'
import { useChatStore } from '@/store/useChatStore'
import { usePathname } from 'next/navigation'
import { useLayoutStore } from '@/store/useLayoutStore'

const FixedComponent = memo(() => {
  return (
    <IconButton
      className="fixed right-10 bottom-10 bg-primary z-50"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }}
    >
      <KeyboardArrowUpIcon className="text-white" />
    </IconButton>
  )
})
FixedComponent.displayName = 'FixedComponent'

const showFooterPath = ['/', '/articles/', '/words/', '/picture/']

const LayoutComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const [accountInfo] = useUserStore(state => [state.accountInfo])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const setSocketInstance = useChatStore(state => state.setSocketInstance)
  const socketInstance = useWebSocket(SOCKET_URL + `?token=${accountInfo?.token}`, {
    isConnect: !!accountInfo?.token,
  })
  const isScrollDisabled = useLayoutStore(state => state.isScrollDisabled)
  const setAccountInfo = useUserStore(state => state.setAccountInfo)
  useEffect(() => {
    if (isScrollDisabled) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isScrollDisabled])
  const pathname = usePathname()
  useEffect(() => {
    if (socketInstance?.onClose) {
      socketInstance.onClose(() => {
        setAccountInfo(null)
      })
    }
  }, [socketInstance])
  useEffect(() => {
    if (!accountInfo?.token) {
      setSocketInstance(null)
      socketInstance.closeServer()
    } else {
      setSocketInstance(socketInstance)
      socketInstance.connectServer()
    }
  }, [accountInfo, socketInstance])
  return (
    <ThemeProvider theme={theme}>
      <MessageProvider>
        <Head>
          <title>{PROJECT_NAME}</title>
          <link rel="icon" href="/logo.png" />
          <meta name="description" content={PROJECT_NAME} />
          <meta name="keywords" content={PROJECT_NAME} />
        </Head>
        <div ref={wrapperRef} className={`layout_container w-full h-full flex flex-col`}>
          <Header />
          <Background />
          <Suspense fallback={<div className="relative">Loading feed...</div>}>
            <div className={`flex-1 flex-shrink-0 relative flex flex-col bg-zinc-100`}>
              {cloneElement(children as ReactElement, { accountInfo, ...socketInstance })}
            </div>
          </Suspense>
          {showFooterPath.includes(pathname) && <Footer />}
          <FixedComponent />
        </div>
      </MessageProvider>
    </ThemeProvider>
  )
}
export const Layout = memo(LayoutComponent)
