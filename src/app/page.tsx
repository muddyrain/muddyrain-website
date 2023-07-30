'use client';
import {
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
export default function Home() {
  const list = [
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/1.jpg',
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/2.jpg',
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/3.jpg',
  ];
  return (
    <div className='w-container mx-auto p-3'>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h6'>展示风采</Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label='自动播放'
        />
      </Stack>
      <Carousel animation='slide'>
        {list.map((item, index) => {
          return (
            <div className='h-[660px]' key={index}>
              <Image
                layout='fill'
                className='w-full h-full rounded-lg'
                src={item}
                alt='Picture of the author'
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
