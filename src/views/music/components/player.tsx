import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { IconButton, Slider } from '@mui/material'
import {
  Pause,
  PlayArrow,
  PlaylistPlay,
  UnfoldMore,
  VolumeDown,
  VolumeMute,
  VolumeUp,
} from '@mui/icons-material'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useMusicStore } from '@/store/useMusicStore'
import { PlayListToggleTrigger } from '@/constant/triggerIds'
import { millisecondToTime } from '@/utils/time'
import { errorImage } from '@/assets'

export const Player: FC = () => {
  const [volume, setVolume] = useState(100)
  const [progress, setProgress] = useState(0)
  const [maxProgress, setMaxProgress] = useState(0)
  const [volumeVisible, setVolumeVisible] = useState(false)
  const currentSong = useMusicStore(state => state.currentSong)
  const [audio] = useState(new window.Audio())
  const volumeRef = useClickOutside(() => {
    setVolumeVisible(false)
  })
  const {
    setShowPlayList,
    isShowPlayList,
    isShowSongDetail,
    setShowSongDetail,
    playState,
    setPlayState,
  } = useMusicStore(state => ({
    ...state,
  }))
  // 停止播放
  const stopPlay = () => {
    audio.pause()
  }
  // 开始播放
  const startPlay = () => {
    audio.src = currentSong?.url || ''
    // 监听音频加载完成
    audio.addEventListener('loadedmetadata', () => {
      audio.play()
    })
    // 监听音频加载失败
    audio.addEventListener('error', () => {
      audio.src = 'https://music.163.com/song/media/outer/url?id=' + currentSong?.id
    })
  }
  // 切换播放状态
  const changePlayState = () => {
    if (playState === 'playing') {
      setPlayState('paused')
    } else {
      setPlayState('playing')
    }
  }
  useEffect(() => {
    if (playState === 'playing') {
      startPlay()
    } else {
      stopPlay()
    }
  }, [playState])
  useEffect(() => {
    audio.volume = volume / 100
  }, [volume])
  useEffect(() => {
    if (audio) {
      audio.addEventListener('timeupdate', () => {
        setProgress(audio.currentTime)
        setMaxProgress(audio.duration)
      })
    }
  }, [audio])
  return (
    <div
      className={`absolute bottom-0 z-50 duration-300 w-full bg-zinc-50 ${
        currentSong ? 'h-24' : 'h-0'
      }`}
    >
      <div className="p-2 h-full flex items-center justify-between">
        <Slider
          className="w-full absolute top-[-12px] left-0"
          aria-label="Volume"
          size="small"
          max={maxProgress}
          value={progress}
          onChange={(_, value) => {
            console.log(value)
          }}
        />
        <div className="flex items-center">
          <div
            className="cursor-pointer w-[75px] h-[75px] rounded-md overflow-hidden relative group"
            onClick={() => {
              setShowSongDetail(!isShowSongDetail)
            }}
          >
            <Image
              src={currentSong?.picUrl || errorImage}
              alt="album"
              width={0}
              height={0}
              className="w-full h-full duration-300 group-hover:blur-sm"
            />
            <div className="absolute w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-100 top-0 group-hover:bg-opacity-30 duration-300 drop-shadow-md left-0 origin-center">
              <UnfoldMore className="text-white text-4xl" />
            </div>
          </div>
          <div className="ml-2 flex flex-col">
            <div className="flex items-center">
              <span className="text-xl text-zinc-800 select-none text-md">{currentSong?.name}</span>
              <span className="text-zinc-400 select-none ml-2 text-sm">
                - {currentSong?.song?.artists.map(item => item.name)}
              </span>
            </div>
            <div className="text-zinc-400 select-none text-sm mt-2">
              <span>00:00</span>
              <span>/</span>
              <span>{millisecondToTime(currentSong?.song?.duration || 0)}</span>
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
          <IconButton
            color="primary"
            size="large"
            onClick={() => {
              changePlayState()
            }}
          >
            <div className="w-12 h-12 rounded-full bg-primary border-2 shadow-lg shadow-primary text-white border-white border-solid flex justify-center items-center">
              {playState === 'playing' ? <Pause /> : <PlayArrow />}
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
              <div className="py-4 px-2 h-full">
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
    </div>
  )
}
