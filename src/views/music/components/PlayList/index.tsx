import { FC } from 'react'
import { Button, Divider } from '@mui/material'
import { useMusicStore } from '@/store/useMusicStore'
import { useClickOutside } from '@/hooks/useClickOutside'
import { DATA_TRIGGER_KEY, PlayListToggleTrigger } from '@/constant/triggerIds'
import { Title } from '../Title'
import { PlayArrow } from '@mui/icons-material'
import { ScrollView } from '@/components'

export const PlayList: FC = () => {
  const [setShowPlayList, isShowPlayList] = useMusicStore(state => [
    state.setShowPlayList,
    state.isShowPlayList,
  ])
  const playListRef = useClickOutside(e => {
    const element = e.target as HTMLElement
    if (element.getAttribute(DATA_TRIGGER_KEY) === PlayListToggleTrigger) return
    setShowPlayList(false)
  })
  return (
    <>
      {/* 播放列表 */}
      <div
        ref={playListRef}
        className={`absolute ${
          isShowPlayList ? 'w-[420px]' : 'w-0'
        } duration-300 top-0 right-0 h-full flex flex-col bg-white/80 drop-shadow-xl z-10`}
      >
        <div className="pt-4 px-4">
          <Title title="播放列表" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">总793首</span>
            <Button variant="text">清空列表</Button>
          </div>
        </div>
        <Divider />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <ScrollView>
            <div className="w-full h-full">
              {Array.from({ length: 40 }).map((item, index) => (
                <div
                  className={`flex py-2 px-4 text-sm items-center odd:bg-zinc-50/75 even:bg-zinc-100/75 cursor-pointer hover:bg-zinc-200 drop-shadow-lg ${
                    index === 6 && 'text-primary/75'
                  }`}
                  key={index}
                >
                  {index === 6 && <PlayArrow className="text-sm absolute left-0 text-primary" />}
                  <span className="flex-[2] select-none">多远都要在一起</span>
                  <span className="flex-1 select-none">邓紫棋</span>
                  <span className="mx-2 select-none text-zinc-400">3:54</span>
                </div>
              ))}
            </div>
          </ScrollView>
        </div>
      </div>
    </>
  )
}
