import { useMusicStore } from '@/store/useMusicStore'
import { FC } from 'react'
import { Background } from './background'
import { Stack } from '@mui/material'
import Image from 'next/image'
import { CD_TEST, CD_BG } from '../../assets'

import 'swiper/css'
import { Lyrics } from './lyrics'
import { ScrollView } from '@/components'

export const SongDetail: FC = () => {
  const { isShowSongDetail } = useMusicStore(state => ({
    ...state,
  }))

  return (
    <div
      className={`absolute overflow-hidden z-10 w-full h-full bg-indigo-200 duration-300 ${
        isShowSongDetail ? 'top-0' : 'top-[100%]'
      }`}
    >
      <div className="w-full h-full absolute top-0 left-0 bg-white/50 drop-shadow-lg">
        <Background />
      </div>
      <div className="w-full h-full flex flex-col absolute top-0 p-8 left-0 z-10">
        <ScrollView>
          <Stack direction={'row'} className="h-8 " alignItems={'center'} spacing={2}>
            <h1 className="text-zinc-600 cursor-pointer hover:text-zinc-400 duration-300">
              Young And Beautiful
            </h1>
            <div className="border hover:bg-red-200 duration-300 cursor-pointer border-solid flex items-center justify-center h-6 rounded-md px-2 border-red-500">
              <span className="text-sm text-red-500">MV</span>
            </div>
          </Stack>
          <Stack className="text-sm mt-4 mb-8 " direction={'row'} spacing={1}>
            <Stack spacing={1} direction={'row'}>
              <span className="text-zinc-400">歌手:</span>
              <span className="text-zinc-600 cursor-pointer hover:text-zinc-400 duration-300">
                Lana Del Rey
              </span>
            </Stack>
            <Stack spacing={1} direction={'row'}>
              <span className="text-zinc-400">专辑:</span>
              <span className="text-zinc-600 cursor-pointer hover:text-zinc-400 duration-300">
                YoungAnd Beautiful
              </span>
            </Stack>
          </Stack>
          <div className="w-full h-[480px] flex">
            <div className="w-1/2 relative">
              <Image
                className="h-full w-[480px] rounded-sm object-contain absolute left-0 z-10"
                alt="cd"
                src={CD_TEST}
              />
              <div className="absolute left-[240px] top-[10px] h-full">
                <Image
                  src={CD_BG}
                  className="w-[460px] h-[460px] animate-spin absolute"
                  alt="cd-bg"
                />
                <div className="w-36 overflow-hidden h-36 left-1/2 rounded-full top-1/2 translate-x-[-50%] translate-y-[-50%] bg-blue-200 absolute z-1">
                  <Image
                    className="h-full w-full rounded-sm object-contain absolute left-0 z-10"
                    alt="cd"
                    src={CD_TEST}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <Lyrics />
            </div>
          </div>
        </ScrollView>
      </div>
    </div>
  )
}
