import { useMusicStore } from '@/views/music/store/useMusicStore'
import { FC, useMemo } from 'react'
import { Stack } from '@mui/material'
import Image from 'next/image'
import { CD_BG } from '../../assets'
import 'swiper/css'
import { Lyrics } from './lyrics'
import { RingImage } from '@/components/RingImage'
import { errorImage } from '@/assets'

export const SongDetail: FC = () => {
  const { isShowSongDetail } = useMusicStore(state => ({
    ...state,
  }))
  const currentSongIndex = useMusicStore(state => state.currentSongIndex)
  const currentSongList = useMusicStore(state => state.currentSongList)
  const currentSong = useMemo(() => {
    return currentSongList[currentSongIndex]
  }, [currentSongIndex, currentSongList])
  const cover = useMemo(() => {
    return currentSong?.al.picUrl ? currentSong?.al.picUrl + '?param=200y200' : errorImage
  }, [currentSong])
  return (
    <div
      className={`absolute overflow-hidden z-50 w-full h-full bg-zinc-700 duration-300 ${
        isShowSongDetail ? 'top-0' : 'top-[100%]'
      }`}
    >
      <div className="w-full h-full flex  absolute top-0 p-8 left-0 z-10 overflow-hidden">
        <div className="w-1/2 relative h-full">
          <div className="absolute w-full h-full flex justify-center items-center">
            <Image src={CD_BG} className="w-[460px] h-[460px] animate-spin absolute" alt="cd-bg" />
            <RingImage
              ringWidth={17}
              className="w-56 overflow-hidden h-56 left-1/2 rounded-full top-1/2 translate-x-[-50%] translate-y-[-50%] absolute z-1"
              src={cover + '?param=400y400'}
            />
          </div>
        </div>
        <div className="w-1/2 h-full overflow-hidden flex flex-col">
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
          <div className="flex-1 overflow-hidden">
            <Lyrics />
          </div>
        </div>
      </div>
    </div>
  )
}
