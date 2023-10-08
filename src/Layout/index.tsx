'use client'
import { Background } from './background'
import { Header } from './header'
import React, { FC, Suspense } from 'react'
import '@/styles/index.scss'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Footer } from './footer'
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
  showBackground?: boolean
  showFixedBackground?: boolean
}> = ({
  children,
  isHome = false,
  hiddenFooter = false,
  showBackground = true,
  showFixedBackground = true,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <div className={`layout_container w-full h-full flex flex-col`}>
        <Header isHome={isHome} />
        {showFixedBackground && <Background />}
        <Suspense fallback={<p>Loading feed...</p>}>
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
    </ThemeProvider>
  )
}
