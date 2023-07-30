'use client';
import { Background } from './background';
import { Header } from './header';
import { FC, Suspense } from 'react';
import '@/styles/index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Footer } from './footer';
import { useRouter } from 'next/router';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6060e0',
      light: '#8888e8',
      dark: '#7333ea',
      contrastText: '#f3e8ff',
    },
  },
});

export const Layout: FC<{
  children?: React.ReactNode;
  isHome?: boolean;
}> = ({ children, isHome = false }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header isHome={isHome} />
      <Background />
      <Suspense fallback={<p>Loading feed...</p>}>{children}</Suspense>
      <Footer />
    </ThemeProvider>
  );
};
