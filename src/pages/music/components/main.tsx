import { testImg } from '@/assets'
import { Search, NotificationsNoneOutlined, ArrowRight, PlayArrow } from '@mui/icons-material'
import { TextField, Avatar } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'overlayscrollbars/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

export const Main: FC = () => {
  return (
    <div className="flex-1 pt-8 px-4 bg-white/40 overflow-hidden flex flex-col">
      {/* 头部栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Search className="text-4xl text-zinc-600" />
          <TextField
            className="w-[320px] ml-2 border-b-0"
            placeholder="Find and listen to your favorite music..."
            variant="standard"
            name="search_key"
          />
        </div>
        <div className="flex items-center">
          <NotificationsNoneOutlined className="text-3xl text-zinc-600" />
          <Avatar className="ml-2">H</Avatar>
        </div>
      </div>
      {/* 内容 */}
      <div className="title mt-10 flex items-center">
        <span className="text-3xl pl-6 font-bold text-blue-950">Featured Albums</span>
        {/* 播放按钮 */}
        <div className="rounded-3xl cursor-pointer flex border border-white border-solid shadow-primary/75 shadow-lg items-center ml-8 px-4 py-1 justify-center text-white bg-primary group">
          <span className="text-lg font-bold font-sans tracking-wider">play</span>
          <PlayArrow className="text-2xl mt-0.5" />
        </div>
      </div>
      {/* banner区域 */}
      <div className="flex overflow-x-auto">
        <Swiper spaceBetween={10} slidesPerView={'auto'}>
          {Array.from({ length: 12 }).map((item, index) => (
            <SwiperSlide key={index} style={{ width: 200 }}>
              <div className="flex cursor-pointer w-full h-full py-6 flex-col justify-center items-center">
                <Image
                  width={180}
                  height={180}
                  className="rounded-2xl shadow-md shadow-amber-300"
                  src={testImg}
                  alt="banner"
                />
                <div className="mt-3 justify-center flex items-center">
                  <span className="text-lg text-zinc-600 font-sans">Loud · Rihanna</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* 日常组合 */}
      <div className="flex-1 flex justify-between overflow-hidden">
        <div className="w-3/5 flex flex-col">
          <span className="text-3xl pl-6 font-bold text-blue-950">Daily Mix</span>
          <div className="flex-1 mt-2 flex flex-col overflow-hidden">
            <OverlayScrollbarsComponent
              element="div"
              options={{ scrollbars: { autoHide: 'scroll', autoHideSuspend: true } }}
            >
              <div className={`w-full h-full`}>
                {Array.from({ length: 20 }).map((item, index) => (
                  <div
                    className="flex p-2 items-center font-mono text-lg text-zinc-600 cursor-pointer hover:bg-white/30 duration-300 rounded-md"
                    key={index}
                  >
                    <Image
                      className="mr-2 rounded-lg"
                      src={testImg}
                      width={45}
                      height={45}
                      alt="daily mix image"
                    />
                    <span className="flex-1">Mask Off111</span>
                    <span className="flex-1">Future</span>
                    <span className="flex-1">Dive</span>
                    <span className="flex-1">3:54</span>
                  </div>
                ))}
              </div>
            </OverlayScrollbarsComponent>
          </div>
        </div>
        <div className="w-2/5 bg-blue-200">
          <span className="text-3xl font-bold text-blue-950">Playlists</span>
        </div>
      </div>
    </div>
  )
}
