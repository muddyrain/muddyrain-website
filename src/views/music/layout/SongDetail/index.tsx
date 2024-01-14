import { useMusicStore } from '@/views/music/store/useMusicStore'
import { FC, useEffect, useMemo } from 'react'
import { Button, Stack } from '@mui/material'
import Image from 'next/image'
import { CD_BG } from '../../assets'
import 'swiper/css'
import { Lyrics } from './lyrics'
import { RingImage } from '@/components/RingImage'
import { errorImage } from '@/assets'
import { KeyboardArrowDownOutlined, FullscreenOutlined } from '@mui/icons-material'
import { usePlayerStore } from '../../store/usePlayerStore'
import { Player } from '../player'
import ColorThief from 'colorthief'
import { useColor } from '@/hooks/useDarkenColor'

const Header = () => {
  const setShowSongDetail = useMusicStore(state => state.setShowSongDetail)
  const currentSongThemeColor = useMusicStore(state => state.currentSongThemeColor)
  const { darkBackgroundColor } = useColor(currentSongThemeColor, 200)
  const ButtonClassName = `border-zinc-300 outline-none hover:border-zinc-300 hover:bg-[${darkBackgroundColor}] text-zinc-100 min-w-fit w-8 h-8 px-2 mr-2`
  return (
    <div className="h-16">
      {/* 关闭 */}
      <Button
        className={ButtonClassName}
        onClick={() => {
          setShowSongDetail(false)
        }}
        variant="outlined"
      >
        <KeyboardArrowDownOutlined />
      </Button>
      {/* 全屏 */}
      <Button
        className={ButtonClassName}
        onClick={() => {
          setShowSongDetail(false)
        }}
        variant="outlined"
      >
        <FullscreenOutlined />
      </Button>
    </div>
  )
}
export const SongDetail: FC = () => {
  const isShowSongDetail = useMusicStore(state => state.isShowSongDetail)
  const currentSongIndex = useMusicStore(state => state.currentSongIndex)
  const currentSongList = useMusicStore(state => state.currentSongList)
  const setCurrentSongThemeColor = useMusicStore(state => state.setCurrentSongThemeColor)
  const currentSongThemeColor = useMusicStore(state => state.currentSongThemeColor)
  const playState = usePlayerStore(state => state.playState)
  const currentSong = useMemo(() => {
    return currentSongList[currentSongIndex]
  }, [currentSongIndex, currentSongList])
  const cover = useMemo(() => {
    return currentSong?.al.picUrl ? currentSong?.al.picUrl + '?param=200y200' : errorImage
  }, [currentSong])
  // 识别图片的主色调
  useEffect(() => {
    if (!cover) return
    const colorThief = new ColorThief()
    const img = document.createElement('img')
    img.src = cover as string
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const color = colorThief.getColor(img)
      color && setCurrentSongThemeColor(color)
    }
  }, [cover])
  // 背景色
  const { darkBackgroundColor } = useColor(currentSongThemeColor)
  return (
    <div
      className={`absolute overflow-hidden z-50 w-full h-full flex flex-col duration-300 ${
        isShowSongDetail ? 'top-0' : 'top-[100%]'
      }`}
      style={{
        background: darkBackgroundColor,
      }}
    >
      <div
        className="w-full flex flex-col p-8 z-10 overflow-hidden"
        style={{
          height: 'calc(100% - 6rem)',
        }}
      >
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 relative h-full">
            <div className="absolute w-full h-full flex justify-center items-center">
              <Image
                src={CD_BG}
                className={`w-[460px] h-[460px]  absolute ${
                  playState === 'playing' ? 'animate-spin' : ''
                }`}
                alt="cd-bg"
              />
              <RingImage
                ringWidth={17}
                className="w-56 overflow-hidden h-56 left-1/2 rounded-full top-1/2 translate-x-[-50%] translate-y-[-50%] absolute z-1"
                src={cover + '?param=400y400'}
              />
            </div>
          </div>
          <div className="w-1/2 h-full overflow-hidden flex flex-col">
            <Stack direction={'row'} className="h-8 " alignItems={'center'} spacing={2}>
              <h1 className="text-zinc-200 cursor-pointer hover:text-zinc-300 duration-300 mix-blend-difference">
                {currentSong?.name}
              </h1>
              <div className="border hover:bg-red-200 duration-300 cursor-pointer border-solid flex items-center justify-center h-6 rounded-md px-2 border-red-500">
                <span className="text-sm text-red-500">MV</span>
              </div>
            </Stack>
            <Stack className="text-sm mt-4 mb-8 " direction={'row'} spacing={1}>
              <Stack spacing={1} direction={'row'}>
                <span className="text-zinc-200">歌手:</span>
                <span className="text-zinc-200 cursor-pointer hover:text-zinc-300 duration-300">
                  {currentSong?.ar.map(item => item.name).join('/')}
                </span>
              </Stack>
              <Stack spacing={1} direction={'row'}>
                <span className="text-zinc-200">专辑:</span>
                <span className="text-zinc-200 cursor-pointer hover:text-zinc-300 duration-300">
                  {currentSong?.al.name}
                </span>
              </Stack>
            </Stack>
            <div className="flex-1 overflow-hidden">
              <Lyrics currentSong={currentSong} />
            </div>
          </div>
        </div>
      </div>
      <Player theme="dark" />
    </div>
  )
}
