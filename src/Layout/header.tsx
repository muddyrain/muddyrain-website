'use client';
import { IconButton, Button, Stack, Chip, Icon } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { FC } from 'react';

const naves = [
  {
    label: '首页',
    href: '/',
  },
  {
    label: '图画',
    href: '/picture',
  },
  {
    label: '碎语',
    href: '/words',
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
  return (
    <div className='flex items-center bg-background z-20 sticky top-0 h-16 shadow-md justify-between px-4'>
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
          label='Sign Up'
          color='primary'
          onClick={() => {}}
          variant='outlined'
        />
        <Chip
          label='Login'
          color='info'
          onClick={() => {}}
          variant='outlined'
        />
      </Stack>
    </div>
  );
};
