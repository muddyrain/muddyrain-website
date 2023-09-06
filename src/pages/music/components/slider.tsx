import {
  Close as CloseIcon,
  HorizontalRule as HorizontalRuleIcon,
  OpenInFull as OpenInFullIcon,
  Search,
} from '@mui/icons-material'
import { Stack } from '@mui/material'
import { FC, use, useLayoutEffect, useMemo, useRef, useState } from 'react'

export const Slider: FC = () => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [menus] = useState([
    {
      name: 'Explore',
      icon: <Search />,
    },
    {
      name: 'Genres',
      icon: <Search />,
    },
    {
      name: 'Radios',
      icon: <Search />,
    },
    {
      name: 'Artists',
      icon: <Search />,
    },
    {
      name: 'Albums',
      icon: <Search />,
    },
    {
      name: 'Settings',
      icon: <Search />,
    },
  ])
  const [cloud, setCloud] = useState({
    y: 0,
    height: 0,
  })
  const [currentIndex, setCurrentIndex] = useState(0)

  useLayoutEffect(() => {
    if (!menuRef.current) return
    const target = menuRef.current.children[currentIndex] as HTMLDivElement
    const boundingClientRect = target.getBoundingClientRect()
    setCloud({
      y: target.offsetTop,
      height: boundingClientRect.height,
    })
  }, [currentIndex])
  return (
    <div className="relative w-[240px] border-0 border-r border-zinc-100 border-solid top-0 left-0 h-full p-0">
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
      <div className="flex flex-col mt-32">
        <span className="font-bold text-zinc-500 pl-10 tracking-wider text-lg mb-4">MENU</span>
        <div className="relative overflow-x-hidden">
          <div ref={menuRef}>
            {menus.map((menu, index) => (
              <div
                key={index}
                onClick={e => {
                  setCurrentIndex(index)
                }}
                className={`flex relative duration-300 hover:bg-primary/5 overflow-hidden cursor-pointer items-center py-4 font-bold pl-8 ${
                  index === currentIndex ? 'text-primary bg-primary/5' : 'text-zinc-500'
                }`}
              >
                {menu.icon}
                <span className="ml-2">{menu.name}</span>
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
        </div>
      </div>
    </div>
  )
}
