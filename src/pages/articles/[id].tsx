'use client';
import { Layout } from '@/Layout';
import { Badge, IconButton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import {
  Recommend as RecommendIcon,
  Sms as SmsIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from '@mui/icons-material';
export default function Page() {
  const router = useRouter();
  console.log(router);
  return (
    <Layout>
      <Stack direction={'row'} className='w-container mx-auto my-4' spacing={3}>
        <Stack className='py-10' spacing={2}>
          {/* 点赞 */}
          <Badge badgeContent={1} color='secondary'>
            <IconButton size='large' className='bg-white'>
              <RecommendIcon />
            </IconButton>
          </Badge>
          {/* 评论 */}
          <Badge badgeContent={4} color='secondary'>
            <IconButton size='large' className='bg-white'>
              <SmsIcon />
            </IconButton>
          </Badge>
        </Stack>
        <div className='flex-1 p-8 rounded-lg bg-white'>
          <Typography variant='h4' className=''>
            🍍(Pinia)不酸，保甜
          </Typography>
          <Typography variant='body1' className='my-4'>
            <Stack direction='row' spacing={2}>
              <span>前端荣耀</span>
              <span className='text-zinc-400'>2023-03-08 09:50</span>
              <Stack direction={'row'} alignItems={'center'}>
                <RemoveRedEyeIcon fontSize='small' color='secondary' />
                <span className='ml-1 text-zinc-400'>19415</span>
              </Stack>
            </Stack>
          </Typography>
          <Typography variant='body1' className='mb-2'>
            🍍(Pinia)是一个用于Vue 3的状态管理库，它使用了Vue
            3的新特性Proxy，让我们可以在Vue 3中享受到像Vuex一样的开发体验。
          </Typography>
        </div>
      </Stack>
    </Layout>
  );
}
