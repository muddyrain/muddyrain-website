'use client';
import { Background } from './background';
import { Header } from './header';
import { FC } from 'react';
import '@/styles/index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
}> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Background />
      {children}
    </ThemeProvider>
  );
};
