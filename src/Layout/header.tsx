'use client';
import { FC } from 'react';
import { IconButton, Button, Stack, Chip } from '@mui/material';
import { Add } from '@mui/icons-material';
export const Header: FC = () => {
  return (
    <div className='flex items-center bg-background z-20 sticky top-0 h-16 shadow-md justify-between px-4'>
      {/* Logo */}
      <IconButton
        color='primary'
        onClick={() => {
          window.location.href = '/';
        }}
      >
        M
      </IconButton>
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
