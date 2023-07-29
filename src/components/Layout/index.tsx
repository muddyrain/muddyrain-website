import { Background } from './background';
import { Header } from './header';
import { FC } from 'react';
import '@/styles/index.css';

export const Layout: FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Header />
      <Background />
      {children}
    </>
  );
};
