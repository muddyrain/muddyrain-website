'use client';
import { IconButton, Button, Stack, Chip, Icon } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Login } from '@/components';
import { useLayoutStore } from '@/store/useLayoutStore';

const naves = [
  {
    label: '首页',
    href: '/',
  },
  {
    label: '好文',
    href: '/articles',
  },
  {
    label: '碎语',
    href: '/words',
  },
  {
    label: '图画',
    href: '/picture',
  },
  {
    label: '留言板',
    href: '/message',
  },
];
export const Header: FC<{
  isHome: boolean;
}> = ({ isHome }) => {
  const router = useRouter();
  const setShowLogin = useLayoutStore(state => state.setShowLogin);
  const isShowLogin = useLayoutStore(state => state.isShowLogin);
  return (
    <div className='w-screen flex items-center bg-white z-20 sticky top-0 py-2 shadow-md justify-between px-4 header_container duration-300'>
      {/* Logo */}
      <IconButton color='primary'>M</IconButton>
      {/* nav */}
      <Stack
        className='flex-1 mx-40 justify-center'
        direction='row'
        spacing={2}
      >
        {naves.map((nav, index) => {
          return (
            <Button
              key={index}
              color={router?.route === nav.href ? 'primary' : 'inherit'}
              onClick={() => {
                location.pathname = nav.href;
              }}
            >
              {nav.label}
            </Button>
          );
        })}
      </Stack>
      {/* actions */}
      <Stack spacing={2} direction='row' alignItems='center'>
        <IconButton color='inherit'>
          <Add />
        </IconButton>
        <Chip
          label='注册'
          color='primary'
          onClick={() => {}}
          variant='outlined'
        />
        <Chip
          label='登录'
          color='info'
          onClick={() => {
            setShowLogin(true);
          }}
          variant='outlined'
        />
      </Stack>
      {isShowLogin && <Login />}
    </div>
  );
};
