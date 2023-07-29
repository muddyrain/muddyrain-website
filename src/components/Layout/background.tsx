import { FC } from 'react';

export const Background: FC = () => {
  return (
    <div className='fixed w-full h-full blur-[9rem]  top-[-10rem] pointer-events-none select-none'>
      <div className='absolute top-[50vh] left-[calc((100vw-1200px)/2-24rem)]'>
        <div className='w-[20rem] h-[20rem] bg-[#009FFF] rounded-full translate-y-[12rem]'></div>
      </div>
      <div className='absolute top-[50vh] left-[calc((100vw-1200px)/2-24rem)]'>
        <div className='w-[20rem] h-[20rem] bg-[#ec2F4B] rounded-full translate-y-[4rem]'></div>
      </div>
      <div className='absolute top-[50vh] right-[calc((100vw-1200px)/2-24rem)]'>
        <div className='w-[20rem] h-[20rem] bg-[#8E2DE2] rounded-full translate-y-[12rem]'></div>
      </div>
      <div className='absolute top-[50vh] right-[calc((100vw-1200px)/2-24rem)]'>
        <div className='w-[20rem] h-[20rem] bg-[#4A00E0] rounded-full translate-y-[-2rem]'></div>
      </div>
    </div>
  );
};
