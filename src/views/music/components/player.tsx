import Image from 'next/image'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
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
  const [volume, setVolume] = useState(10)
  const [progress, setProgress] = useState(0)
  const [maxProgress, setMaxProgress] = useState(0)
  const [volumeVisible, setVolumeVisible] = useState(false)
  const currentSong = useMusicStore(state => state.currentSong)
  const audio = useRef<HTMLAudioElement | null>(null)
  const volumeRef = useClickOutside(() => {
    setVolumeVisible(false)
  })
  const [playState, setPlayState] = useState<'playing' | 'paused'>('paused')
  const { setShowPlayList, isShowPlayList, isShowSongDetail, setShowSongDetail } = useMusicStore(
    state => ({
      ...state,
    })
  )
  // 停止播放
  const stopPlay = () => {
    audio.current?.pause()
    setPlayState('paused')
  }
  // 开始播放
  const startPlay = () => {
    if (!audio.current) return
    audio.current.src = currentSong?.url || ''
    // 监听音频加载完成
    audio.current.addEventListener('loadedmetadata', () => {
      if (!audio.current) return
      audio.current.play()
      setMaxProgress(audio.current.duration || 0)
      setPlayState('playing')
    })
    // 监听音频加载失败
    audio.current.addEventListener('error', () => {
      if (!audio.current) return
      audio.current.src = 'https://music.163.com/song/media/outer/url?id=' + currentSong?.id
    })
  }
  // 切换播放状态
  const changePlayState = () => {
    if (playState === 'playing') {
      stopPlay()
    } else {
      audio.current?.play()
      setPlayState('playing')
    }
  }
  useEffect(() => {
    if (!audio.current) return
    audio.current.currentTime = 0
    startPlay()
  }, [currentSong])
  useEffect(() => {
    if (!audio.current) return
    audio.current.volume = volume / 100
  }, [volume, audio])
  const handleWatchProgress = () => {
    if (!audio.current) return
    setProgress(audio.current.currentTime)
  }
  useEffect(() => {
    audio.current = new Audio()
    // 进行其他的 DOM 操作或事件绑定
    return () => {
      // 在组件卸载时清理资源
      audio.current?.pause()
      audio.current = null
      // 清理其他的 DOM 操作或事件绑定
    }
  }, [])
  useEffect(() => {
    if (audio.current) {
      audio.current.addEventListener('timeupdate', handleWatchProgress)
    }
    return () => {
      audio.current?.removeEventListener('timeupdate', handleWatchProgress)
    }
  }, [audio])
  const totalDuration = useMemo(() => {
    return millisecondToTime(currentSong?.song?.duration || 0)
  }, [currentSong])
  const currentDuration = useMemo(() => {
    return millisecondToTime(progress * 1000)
  }, [progress])
  return (
    <div
      className={`absolute bottom-0 z-50 duration-300 w-full bg-zinc-50 ${
        currentSong ? 'h-24' : 'h-0 overflow-hidden'
      }`}
    >
      <div className={`p-2 h-full flex items-center justify-between`}>
        <Slider
          className="w-full absolute top-[-12px] left-0"
          aria-label="Volume"
          size="small"
          max={maxProgress}
          value={progress}
          onChange={(_, value) => {
            if (!audio.current) return
            audio.current.currentTime = value as number
          }}
        />
        <div className={`flex items-center`}>
          <div
            className={`cursor-pointer w-[75px] h-[75px] rounded-md overflow-hidden relative group`}
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
              <span>{currentDuration}</span>
              <span>/</span>
              <span>{totalDuration}</span>
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
