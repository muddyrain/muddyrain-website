import { testImg } from '@/assets'
import Image from 'next/image'
import { FC, useState } from 'react'
import { IconButton, Slider } from '@mui/material'

import { PlaylistPlay, VolumeDown, VolumeMute, VolumeUp } from '@mui/icons-material'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useMusicStore } from '@/store/useMusicStore'
import { PlayListToggleTrigger } from '@/constant/triggerIds'
export const Player: FC = () => {
  const [volume, setVolume] = useState(100)
  const [progress, setProgress] = useState(100)
  const [volumeVisible, setVolumeVisible] = useState(false)
  const volumeRef = useClickOutside(() => {
    setVolumeVisible(false)
  })
  const [setShowPlayList, isShowPlayList] = useMusicStore(state => [
    state.setShowPlayList,
    state.isShowPlayList,
  ])
  return (
    <div className="h-24 bg-zinc-50/70 flex items-center justify-between p-2 relative">
      <Slider
        className="w-full absolute top-[-12px] left-0"
        aria-label="Volume"
        size="small"
        max={10000}
        value={progress}
        onChange={(_, value) => {
          setProgress(value as number)
        }}
      />
      <div className="flex items-center">
        <Image src={testImg} alt="album" width={75} height={75} />
        <div className="ml-2 flex flex-col">
          <div className="flex items-center">
            <span className="text-xl text-zinc-800 select-none text-md">Daydream</span>
            <span className="text-zinc-400 select-none ml-2 text-sm">- Tycho</span>
          </div>
          <div className="text-zinc-400 select-none text-sm mt-2">
            <span>02:17</span>
            <span>/</span>
            <span>03:16</span>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 translate-x-[-50%]">
        {/* 喜欢 */}
        <IconButton color="secondary" size="large">
          <div className="iconfont icon-like text-zinc-500 text-2xl w-8 h-8" />
        </IconButton>
        {/* 快退 */}
        <IconButton color="primary" size="large">
          <div className="iconfont  pr-1 icon-ai-rew-left text-primary text-2xl w-8 h-8" />
        </IconButton>
        {/* 播放 */}
        <IconButton color="primary" size="large">
          <div className="w-12 h-12 rounded-full bg-primary border-2 shadow-lg shadow-primary border-white border-solid flex justify-center items-center">
            <div className="iconfont ml-1 icon-play text-white text-2xl w-8 h-8" />
          </div>
        </IconButton>
        {/* 快进 */}
        <IconButton color="primary" size="large">
          <div className="iconfont pl-1 icon-ai-rew-right text-primary text-2xl w-8 h-8" />
        </IconButton>
        {/* 播放模式 */}
        <IconButton color="secondary" size="large">
          <div className="iconfont icon-random text-zinc-500 text-2xl w-8 h-8" />
        </IconButton>
      </div>
      <div className="flex items-center mr-4">
        <IconButton
          color="primary"
          size="large"
          data-trigger-id={PlayListToggleTrigger}
          onClick={() => {
            setShowPlayList(!isShowPlayList)
          }}
        >
          <PlaylistPlay data-trigger-id={PlayListToggleTrigger} />
        </IconButton>
        <div className="relative" ref={volumeRef}>
          <IconButton
            onClick={() => {
              setVolumeVisible(!volumeVisible)
            }}
            color="primary"
            size="large"
          >
            {volume > 60 ? (
              <VolumeUp className="text-primary" />
            ) : volume > 5 ? (
              <VolumeDown className="text-primary" />
            ) : (
              <VolumeMute className="text-primary" />
            )}
          </IconButton>
          <div
            className={`absolute ${
              volumeVisible ? 'h-32' : 'h-0'
            } overflow-hidden duration-300 flex justify-center items-center bg-white rounded-lg left-1/2 translate-x-[-50%] bottom-12`}
          >
            <div className="p-2 h-full">
              <Slider
                className="h-full"
                aria-label="Volume"
                size="small"
                value={volume}
                orientation="vertical"
                onChange={(_, value) => {
                  setVolume(value as number)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
