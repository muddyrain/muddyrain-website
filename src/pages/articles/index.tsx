'use client';
import { Layout } from '@/Layout';
import { Article } from '@/components';
import { Button, Card, Stack } from '@mui/material';
import {
  Assistant as AssistantIcon,
  Star as StarIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon,
} from '@mui/icons-material';
import { useState } from 'react';
export default function Page() {
  const typeList = [
    {
      label: '关注',
      type: 0,
      icon: StarIcon,
    },
    {
      label: '推荐',
      type: 1,
      icon: AssistantIcon,
    },
    {
      label: '前端',
      type: 2,
      icon: CodeIcon,
    },
    {
      label: '后端',
      type: 3,
      icon: TerminalIcon,
    },
  ];
  const [currentType, setCurrentType] = useState(2);
  return (
    <Layout>
      <Stack direction={'row'} spacing={2} className='w-container mx-auto my-4'>
        {/* 类型列表 */}
        <Stack
          spacing={1}
          className='shadow-sm rounded-lg border border-solid bg-white border-zinc-100 w-[180px] p-4'
        >
          {typeList.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.type}
                variant={'text'}
                color={currentType === item.type ? 'primary' : 'inherit'}
                className={`justify-start py-3 duration-300 px-6  ${
                  currentType === item.type
                    ? 'bg-purple-50 border border-purple-100 border-solid'
                    : 'border border-transparent border-solid text-zinc-500'
                }`}
                onClick={() => {
                  setCurrentType(item.type);
                }}
                startIcon={<Icon />}
              >
                {item.label}
              </Button>
            );
          })}
        </Stack>
        {/* 文章列表 */}
        <div className='shadow-sm rounded-lg flex-1 border border-solid bg-white border-zinc-100 w-[180px] p-4'>
          {Array.from({ length: 10 }).map((item, index) => {
            return <Article key={index} className='mb-4' />;
          })}
        </div>
        <div className='w-[240px]'>
          <Card className='shadow-lg rounded-lg'>
            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              justifyContent={'space-between'}
              className='p-4'
            >
              <div className='flex flex-col justify-center '>
                <span>连续签到100天</span>
                <span className='text-sm mt-2 text-zinc-400'>点亮每一天</span>
              </div>
              <div>
                <Button variant='outlined' size='small'>
                  签到
                </Button>
              </div>
            </Stack>
          </Card>
        </div>
      </Stack>
    </Layout>
  );
}
