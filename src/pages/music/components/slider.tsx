import {
  Close as CloseIcon,
  HorizontalRule as HorizontalRuleIcon,
  OpenInFull as OpenInFullIcon,
} from '@mui/icons-material'
import { Stack } from '@mui/material'
import { FC, useEffect, useRef, useState } from 'react'
import { RouterList } from '../router'
import { ScrollView } from '@/components'

export const Slider: FC<{
  onChange: (url: string) => void
}> = ({ onChange }) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [cloud, setCloud] = useState({
    y: 0,
    height: 0,
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    onChange(RouterList[0].url)
  }, [])
  useEffect(() => {
    if (!menuRef.current) return
    const target = menuRef.current.children[currentIndex] as HTMLDivElement
    const boundingClientRect = target.getBoundingClientRect()
    setCloud({
      y: target.offsetTop,
      height: boundingClientRect.height,
    })
  }, [currentIndex])
  return (
    <div className="relative w-[240px] bg-white/60 top-0 left-0 h-full p-0">
      {/* 控制点 */}
      <Stack spacing={1} direction={'row'} className="group absolute top-8 left-8 cursor-pointer">
        <div className="w-4 h-4 flex justify-center items-center bg-red-500 rounded-full">
          <CloseIcon className="text-sm scale-75 origin-center opacity-0 group-hover:opacity-100" />
        </div>
        <div className="w-4 h-4 flex justify-center items-center bg-orange-500 rounded-full">
          <HorizontalRuleIcon className="text-sm scale-75 origin-center opacity-0 group-hover:opacity-100" />
        </div>
        <div className="w-4 h-4 flex justify-center items-center bg-green-500 rounded-full">
          <OpenInFullIcon className="text-sm scale-75 origin-center opacity-0 group-hover:opacity-100" />
        </div>
      </Stack>
      {/* Menu 导航 */}
      <div className="flex flex-col h-full pt-32 overflow-hidden">
        <span className="text-zinc-500 pl-10 tracking-wider text-lg mb-4 font-semibold select-none">
          菜单
        </span>
        <ScrollView>
          <div ref={menuRef}>
            {RouterList.map((menu, index) => (
              <div
                key={index}
                onClick={e => {
                  setCurrentIndex(index)
                  onChange(menu.url)
                }}
                className={`flex relative duration-300 hover:bg-primary/5 overflow-hidden cursor-pointer items-center py-4 pl-8 ${
                  index === currentIndex ? 'text-primary bg-primary/5' : 'text-zinc-500'
                }`}
              >
                {menu.icon}
                <span className="ml-2 select-none">{menu.name}</span>
              </div>
            ))}
          </div>

          <div
            className="absolute w-4 bg-primary left-[-8px] duration-300 rounded-xl"
            style={{
              top: cloud.y,
              height: cloud.height,
            }}
          />
        </ScrollView>
      </div>
    </div>
  )
}
