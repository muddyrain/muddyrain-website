'use client'
import { Background } from './background'
import React, { FC, Suspense, startTransition, useEffect } from 'react'
import '@/styles/index.scss'
import { Header } from './header'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Footer } from './footer'
import './index.scss'
import { MessageProvider } from '@/hooks/useMessage'
import Head from 'next/head'
import { PROJECT_NAME } from '@/constant'

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

export const Layout: FC<{
  children?: React.ReactNode
  isHome?: boolean
  hiddenFooter?: boolean
  showBackground?: boolean
  showFixedBackground?: boolean
  title?: string
  description?: string
  keywords?: string
}> = ({
  children,
  isHome = false,
  hiddenFooter = false,
  showBackground = true,
  showFixedBackground = true,
  title = PROJECT_NAME,
  description = PROJECT_NAME,
  keywords = PROJECT_NAME,
  ...props
}) => {
  return (
    <ThemeProvider theme={theme}>
      <MessageProvider>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
        </Head>
        <div className={`layout_container w-full h-full flex flex-col`}>
          <Header isHome={isHome} />
          {showFixedBackground && <Background />}
          <Suspense fallback={<div className="relative">Loading feed...</div>}>
            <div
              className={`flex-1 flex-shrink-0 relative flex flex-col ${
                showBackground ? 'bg-zinc-100' : ''
              }`}
            >
              {children}
            </div>
          </Suspense>
          {hiddenFooter && <Footer />}
        </div>
      </MessageProvider>
    </ThemeProvider>
  )
}
