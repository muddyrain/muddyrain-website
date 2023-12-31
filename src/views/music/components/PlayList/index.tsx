import { FC, useMemo } from 'react'
import { Button, Divider } from '@mui/material'
import { useMusicStore } from '@/views/music/store/useMusicStore'
import { useClickOutside } from '@/hooks/useClickOutside'
import { DATA_TRIGGER_KEY, PlayListToggleTrigger } from '@/constant/triggerIds'
import { Title } from '../Title'
import { PlayArrow } from '@mui/icons-material'
import { ScrollView } from '@/components'
import { millisecondToTime } from '@/utils/time'

export const PlayList: FC = () => {
  const currentSongList = useMusicStore(state => state.currentSongList)
  const [setShowPlayList, isShowPlayList] = useMusicStore(state => [
    state.setShowPlayList,
    state.isShowPlayList,
  ])
  const [currentSongIndex, setCurrentSongIndex] = useMusicStore(state => [
    state.currentSongIndex,
    state.setCurrentSongIndex,
  ])
  const setCurrentSongList = useMusicStore(state => state.setCurrentSongList)
  const playListRef = useClickOutside(e => {
    const element = e.target as HTMLElement
    if (element.getAttribute(DATA_TRIGGER_KEY) === PlayListToggleTrigger) return
    setShowPlayList(false)
  })
  const totalLength = useMemo(() => {
    return currentSongList.length
  }, [currentSongList])
  // 清空列表
  const clearList = () => {
    setCurrentSongIndex(-1)
    setCurrentSongList([])
  }
  return (
    <>
      {/* 播放列表 */}
      <div
        ref={playListRef}
        className={`absolute ${
          isShowPlayList ? 'w-[420px]' : 'w-0'
        } duration-200 ease-linear top-0 right-0 h-full flex flex-col bg-white/90 drop-shadow-xl z-50`}
      >
        <div className="pt-4 px-4">
          <Title title="播放列表" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">总{totalLength}首</span>
            <Button variant="text" onClick={clearList}>
              清空列表
            </Button>
          </div>
        </div>
        <Divider />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <ScrollView>
            <div className="w-full h-full">
              {currentSongList.map((item, index) => (
                <div
                  className={`flex py-2 px-4 text-sm items-center odd:bg-zinc-50/75 even:bg-zinc-100/75 cursor-pointer hover:bg-zinc-200 drop-shadow-lg ${
                    index === currentSongIndex && 'text-primary/75'
                  }`}
                  key={index}
                  onClick={() => {
                    setCurrentSongIndex(index)
                  }}
                >
                  {currentSongIndex === index && (
                    <PlayArrow className="text-sm absolute left-0 text-primary" />
                  )}
                  <span className="flex-[2] select-none">{item.name}</span>
                  <span className="flex-1 select-none truncate">
                    {item?.ar?.map(item => item.name)}
                  </span>
                  <span className="mx-2 select-none text-zinc-400">
                    {millisecondToTime(item?.dt || 0)}
                  </span>
                </div>
              ))}
            </div>
          </ScrollView>
        </div>
      </div>
    </>
  )
}
