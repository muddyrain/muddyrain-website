import { testImg } from '@/assets'
import { Search, NotificationsNoneOutlined, ArrowRight, PlayArrow } from '@mui/icons-material'
import { TextField, Avatar } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export const Main: FC = () => {
  return (
    <div className="flex-1 p-8 bg-white/50 overflow-hidden">
      {/* 头部栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Search className="text-4xl text-zinc-600" />
          <TextField
            className="w-[320px] ml-2 border-b-0"
            placeholder="Find and listen to your favorite music..."
            variant="standard"
          />
        </div>
        <div className="flex items-center">
          <NotificationsNoneOutlined className="text-3xl text-zinc-600" />
          <Avatar className="ml-2">H</Avatar>
        </div>
      </div>
      {/* 内容 */}
      <div className="title mt-20 flex items-center">
        <span className="text-4xl font-bold text-blue-950">Featured Albums</span>
        <div className="rounded-3xl cursor-pointer flex border border-white border-solid shadow-primary/75 shadow-lg items-center ml-8 px-4 py-2 justify-center text-white bg-primary">
          <span className="text-lg font-bold font-sans tracking-wider">play</span>
          <PlayArrow className="text-2xl mt-0.5" />
        </div>
      </div>
      {/* banner区域 */}
      <div className="flex overflow-x-auto">
        <Swiper
          spaceBetween={40}
          slidesPerView={'auto'}
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
        >
          {Array.from({ length: 12 }).map((item, index) => (
            <SwiperSlide key={index} style={{ width: 225 }}>
              <div className="flex cursor-pointer w-full h-full py-6 flex-col justify-center items-center">
                <Image
                  width={225}
                  height={225}
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
    </div>
  )
}
