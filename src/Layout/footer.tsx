'use client';
import {
  Facebook,
  GitHub,
  Google,
  Instagram,
  Pinterest,
  Twitter,
  YouTube,
} from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import { FC } from 'react';
export const Footer: FC = () => {
  return (
    <Stack
      spacing={1}
      className='flex flex-col items-center pt-10 pb-12 justify-center'
    >
      <Typography variant='h5'>加入我们的学习吧！</Typography>
      <Typography variant='body2' color='text.secondary'>
        任何时候我也不会满足，越是读书，就越是深刻的感到不满足，越是感到自己的知识贫乏。——
        马克思
      </Typography>
      <Stack spacing={1} direction={'row'} className='pt-2'>
        <IconButton>
          <Facebook htmlColor='blue' />
        </IconButton>
        <IconButton>
          <GitHub htmlColor='black' />
        </IconButton>
        <IconButton>
          <YouTube htmlColor='red' />
        </IconButton>
        <IconButton>
          <Twitter htmlColor='skyblue' />
        </IconButton>
        <IconButton>
          <Google htmlColor='green' />
        </IconButton>
        <IconButton>
          <Instagram htmlColor='purple' />
        </IconButton>
        <IconButton>
          <Pinterest htmlColor='red' />
        </IconButton>
      </Stack>
      <div className='text-zinc-400'>
        <span className='text-purple-500'>Muddyrain</span> © . All rights
        reserved.
        <span className='text-purple-500'> Privacy Policy</span>
      </div>
    </Stack>
  );
};
