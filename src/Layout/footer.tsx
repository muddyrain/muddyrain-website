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
      className='flex flex-col items-center bg-background pt-10 pb-12 justify-center'
    >
      <Typography variant='h5'>Sign Up For Our Official Website!</Typography>
      <Typography variant='body2' color='text.secondary'>
        Subscribe to us to always stay in touch with us and get the latest news
        about our company and all of our activities!
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
