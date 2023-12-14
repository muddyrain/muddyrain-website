import { FC, ReactNode, memo } from 'react'
import { PROJECT_NAME } from '@/constant'
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

const LayoutComponent: FC<{ children: ReactNode }> = ({ children }) => {
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
            <div className={`flex-1 flex-shrink-0 relative flex flex-col bg-zinc-100`}>
              {/* <Component {...pageProps} accountInfo={accountInfo} {...socketInstance} /> */}
              {children}
            </div>
          </Suspense>
          <Footer />
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
        </div>
      </MessageProvider>
    </ThemeProvider>
  )
}
export const Layout = memo(LayoutComponent)
