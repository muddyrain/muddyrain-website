import { testImg } from '@/assets'
import { PlayArrow } from '@mui/icons-material'
import { Avatar, Stack } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'

export const MyMusic: FC = () => {
  return (
    <>
      <div className="flex">
        <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden ">
          <Image src={testImg} alt="my-music" className="w-full h-full" />
          <div className="w-full h-full absolute top-0 left-0 bg-black/10">
            <div className="flex items-center justify-end mt-1 mr-1 text-yellow-50">
              <PlayArrow />
              <span>2371</span>
            </div>
          </div>
        </div>
        <div className="ml-8">
          <div className="text-2xl font-bold text-zinc-600 mb-2">我的音乐</div>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Avatar className="w-6 h-6" />
            <span className="text-zinc-400">muddyrain</span>
            <span className="text-zinc-400 text-sm">2018-02-25创建</span>
          </Stack>
        </div>
      </div>
    </>
  )
}
