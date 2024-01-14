import { Stack } from '@mui/material'
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import { parse } from 'clrc'
import { ScrollView } from '@/components'
import { getLyricApi } from '../../api/music'
import { SongsItem } from '../../types'
import { useMusicStore } from '../../store/useMusicStore'
import { millisecondToTime } from '@/utils/time'
import { usePlayerStore } from '../../store/usePlayerStore'

export type LyricsType = {
  key?: string
  lineNumber: number
  raw: string
  content?: string
  type: 'metadata' | 'lyric'
  startMillisecond?: number
  value?: string
}[]
const MLyrics: FC<{
  currentSong: SongsItem
}> = ({ currentSong }) => {
  const [lyrics, setLyrics] = useState<LyricsType>()
  const highlightRef = useRef<HTMLDivElement>(null)
  const getLyricApiData = async () => {
    const res = await getLyricApi(currentSong?.id)
    setLyrics(parse(res?.lrc?.lyric) as LyricsType)
  }
  const isShowSongDetail = useMusicStore(state => state.isShowSongDetail)
  const progress = usePlayerStore(state => state.progress)
  useEffect(() => {
    if (currentSong) {
      getLyricApiData()
    }
  }, [currentSong])
  const currentLineIndex = useMemo(() => {
    if (lyrics) {
      const index = lyrics.findIndex(item => {
        if (item?.startMillisecond) {
          return item?.startMillisecond / 1000 > progress
        }
      })
      // 如果歌曲详情页展示，就滚动到当前歌词
      if (isShowSongDetail) {
        highlightRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
      return index > 0 ? index - 1 : 0
    }
  }, [progress, lyrics, currentSong, isShowSongDetail])
  return (
    <div className="w-full h-full">
      <Stack spacing={2} className="flex flex-col h-full">
        <ScrollView
          options={{
            scrollbars: {
              autoHide: 'scroll',
              clickScroll: false,
              autoHideSuspend: true,
              visibility: 'hidden',
              dragScroll: true,
            },
          }}
        >
          <Stack spacing={1} className="flex-1 overflow-auto">
            {lyrics?.map((item, index) => {
              if (item?.content) {
                return (
                  <div
                    key={index}
                    ref={index === currentLineIndex ? highlightRef : null}
                    className={`flex pr-8 justify-between py-2 ${
                      currentLineIndex === index ? 'text-white text-xl' : 'text-zinc-300'
                    }`}
                    style={{
                      transition: 'color font-size 0.3s ease-in-out',
                    }}
                  >
                    <span>{item?.content}</span>
                    <span>{millisecondToTime(item?.startMillisecond || 0)}</span>
                  </div>
                )
              }
            })}
          </Stack>
        </ScrollView>
      </Stack>
    </div>
  )
}

export const Lyrics = memo(MLyrics)
