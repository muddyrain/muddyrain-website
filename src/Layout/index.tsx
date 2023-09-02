'use client'
import { Background } from './background'
import { Header } from './header'
import React, { FC, Suspense } from 'react'
import '@/styles/index.scss'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Footer } from './footer'
import { useRouter } from 'next/router'
import { LAYOUT_SCROLLBAR_CLASSES } from '@/constant/classes'
import { useLayoutStore } from '@/store/useLayoutStore'
import './index.scss'
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
}> = ({ children, isHome = false, hiddenFooter = false }) => {
  const isShowLogin = useLayoutStore(state => state.isShowLogin)
  return (
    <ThemeProvider theme={theme}>
      <div className={`layout_container flex flex-col`}>
        <Header isHome={isHome} />
        <Background />
        <Suspense fallback={<p>Loading feed...</p>}>
          <div className="flex-1 bg-zinc-100 flex-shrink-0">{children}</div>
        </Suspense>
        {hiddenFooter && <Footer />}
      </div>
    </ThemeProvider>
  )
}
