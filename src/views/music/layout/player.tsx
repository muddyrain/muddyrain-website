import Image from 'next/image'
import { FC, useEffect, useMemo, useState } from 'react'
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
import { useMusicStore } from '@/views/music/store/useMusicStore'
import { PlayListToggleTrigger } from '@/constant/triggerIds'
import { millisecondToTime } from '@/utils/time'
import { errorImage } from '@/assets'
import { NeteaseMusicPrefix } from '../constant'
import { getSongUrlApi } from '../api/music'
import { usePlayerStore } from '../store/usePlayerStore'
import { useColor } from '@/hooks/useDarkenColor'

interface PlayerProps {
  theme?: 'light' | 'dark'
}

export const Player: FC<PlayerProps> = ({ theme = 'light' }) => {
  const [volume, setVolume] = useState(10)
  const [maxProgress, setMaxProgress] = useState(0)
  const [volumeVisible, setVolumeVisible] = useState(false)
  const progress = usePlayerStore(state => state.progress)
  const setProgress = usePlayerStore(state => state.setProgress)
  const audio = usePlayerStore(state => state.audio)
  const currentSongThemeColor = useMusicStore(state => state.currentSongThemeColor)
  const currentSongIndex = useMusicStore(state => state.currentSongIndex)
  const setCurrentSongIndex = useMusicStore(state => state.setCurrentSongIndex)
  const currentSongList = useMusicStore(state => state.currentSongList)
  const playState = usePlayerStore(state => state.playState)
  const setPlayState = usePlayerStore(state => state.setPlayState)
  const shouldAutoPlay = useMusicStore(state => state.shouldAutoPlay)
  const setShouldAutoPlay = useMusicStore(state => state.setShouldAutoPlay)
  const volumeRef = useClickOutside(() => {
    setVolumeVisible(false)
  })
  const { setShowPlayList, isShowPlayList, isShowSongDetail, setShowSongDetail } = useMusicStore(
    state => ({
      ...state,
    })
  )
  const currentSong = useMemo(() => {
    return currentSongList[currentSongIndex]
  }, [currentSongIndex, currentSongList])
  // 停止播放
  const stopPlay = () => {
    audio?.pause()
    setPlayState('paused')
  }
  // 获取歌曲url
  const getSongUrl = (songId: number) => {
    return new Promise<string>((resolve, reject) => {
      if (songId) {
        getSongUrlApi(songId).then(res => {
          resolve(res.data?.[0]?.url)
        })
      } else {
        reject()
      }
    })
  }
  const handlePrev = () => {
    const prevIndex = currentSongIndex - 1
    if (prevIndex < 0) {
      setCurrentSongIndex(currentSongList.length - 1)
    } else {
      setCurrentSongIndex(prevIndex)
    }
  }
  const handleNext = () => {
    const nextIndex = currentSongIndex + 1
    if (nextIndex >= currentSongList.length) {
      setCurrentSongIndex(0)
    } else {
      setCurrentSongIndex(nextIndex)
    }
  }
  // 开始播放
  const startPlay = () => {
    getSongUrl(currentSong?.id || 0).then(url => {
      if (!audio) return
      audio.src = url || ''
      // 监听音频加载完成
      audio.addEventListener('loadedmetadata', () => {
        if (!audio) return
        audio.volume = volume / 100
        setMaxProgress(() => (currentSong?.dt ? currentSong.dt / 1e3 : 0))
        audio.play().catch(() => {
          stopPlay()
        })
        setPlayState('playing')
      })
      // 监听音频加载失败
      audio.addEventListener('error', () => {
        if (!audio) return
        audio.src = NeteaseMusicPrefix + currentSong?.id
      })
    })
  }
  // 切换播放状态
  const changePlayState = () => {
    setShouldAutoPlay(true)
    if (playState === 'playing') {
      stopPlay()
    } else {
      audio?.play()
      setPlayState('playing')
    }
  }
  useEffect(() => {
    if (!audio) return
    audio.currentTime = 0
    shouldAutoPlay && startPlay()
    return () => {
      stopPlay()
      setShouldAutoPlay(false)
    }
  }, [currentSong, audio, shouldAutoPlay])

  useEffect(() => {
    if (!audio) return
    audio.volume = volume / 100
  }, [volume, audio])
  // 监听音频播放进度
  const handleWatchProgress = () => {
    if (!audio) return
    setProgress(audio.currentTime)
  }
  // 音频播放结束
  const handleAudioEnded = () => {
    if (!audio) return
    const nextIndex = currentSongIndex + 1
    if (nextIndex >= currentSongList.length) {
      stopPlay()
      return
    }
    setCurrentSongIndex(nextIndex)
  }

  useEffect(() => {
    if (audio) {
      audio.addEventListener('timeupdate', handleWatchProgress)
      audio.addEventListener('ended', handleAudioEnded)
    }
    return () => {
      audio?.removeEventListener('timeupdate', handleWatchProgress)
      audio?.removeEventListener('ended', handleAudioEnded)
    }
  }, [audio, currentSongIndex])
  const totalDuration = useMemo(() => {
    return millisecondToTime(currentSong?.dt || 0)
  }, [currentSong])
  const currentDuration = useMemo(() => {
    return millisecondToTime(progress * 1000)
  }, [progress])
  const isLightTheme = useMemo(() => {
    return theme === 'light'
  }, [theme])
  const { darkBackgroundColor } = useColor(currentSongThemeColor)

  return (
    <div
      className={`absolute bottom-0 z-50 duration-300 w-full  ${
        isLightTheme ? 'bg-zinc-50' : darkBackgroundColor
      } ${currentSong ? 'h-24' : 'h-0 overflow-hidden'}`}
    >
      <Slider
        className="w-full absolute top-[-13px] left-0"
        aria-label="Volume"
        size="small"
        max={maxProgress}
        value={progress}
        onChange={(_, value) => {
          if (!audio) return
          audio.currentTime = value as number
        }}
      />
      <div className={`p-2 w-full absolute left-0 top-0 h-full flex items-center justify-between`}>
        <div className={`flex items-center`}>
          <div
            className={`cursor-pointer w-[75px] h-[75px] rounded-md overflow-hidden relative group`}
            onClick={() => {
              setShowSongDetail(!isShowSongDetail)
            }}
          >
            <Image
              src={currentSong?.al.picUrl ? currentSong?.al.picUrl + '?param=75y75' : errorImage}
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
              <span
                className={`text-xl  select-none text-md ${
                  isLightTheme ? 'text-zinc-800' : 'text-zinc-100'
                } `}
              >
                {currentSong?.name}
              </span>
              <span
                className={` select-none ml-2 text-sm ${
                  isLightTheme ? 'text-zinc-400' : 'text-zinc-300'
                }`}
              >
                - {currentSong?.ar.map(item => item.name)}
              </span>
            </div>
            <div
              className={`select-none text-sm mt-2 ${
                isLightTheme ? 'text-zinc-400' : 'text-zinc-300'
              }`}
            >
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
          <IconButton color="primary" size="large" onClick={handlePrev}>
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
          <IconButton color="primary" size="large" onClick={handleNext}>
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
