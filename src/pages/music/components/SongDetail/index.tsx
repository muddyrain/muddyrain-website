import { useMusicStore } from '@/store/useMusicStore'
import { FC, useRef, useState } from 'react'
import { Background } from './background'
import styles from './index.module.scss'
import { KeyboardArrowDown, KeyboardArrowUp, Pause, PlayArrow } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import { testImg } from '@/assets'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export const SongDetail: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const { isShowSongDetail, playState, setPlayState } = useMusicStore(state => ({
    ...state,
  }))
  const swiperRef = useRef<SwiperRef>(null)
  const handleClick = (index: number) => {
    swiperRef.current?.swiper.slideTo(index)
  }
  return (
    <div
      className={`absolute overflow-hidden z-10 w-full h-full bg-red-200 duration-300 ${
        isShowSongDetail ? 'top-0' : 'top-[100%]'
      }`}
    >
      <div className="w-full h-full absolute top-0 left-0 bg-white/50 drop-shadow-lg">
        <Background />
      </div>
      <div className="w-full h-full absolute top-0 left-0 z-10">
        <div className={`${styles.rect_container} flex`}>
          <div className="flex flex-col w-1/2 justify-center items-center">
            <IconButton
              onClick={() => {
                if (currentIndex > 0) {
                  swiperRef.current?.swiper.slideTo(currentIndex - 1)
                }
              }}
            >
              <KeyboardArrowUp className="text-[64px]" />
            </IconButton>
            <IconButton color="primary">
              <div className="w-24 h-24 bg-white/30 bg-opacity-50 p-[10px] rounded-full cursor-pointer">
                <div className="w-full h-full rounded-full bg-white flex justify-center items-center">
                  {playState === 'playing' ? (
                    <Pause className="text-4xl" />
                  ) : (
                    <PlayArrow className="text-4xl" />
                  )}
                </div>
              </div>
            </IconButton>
            <IconButton
              onClick={() => {
                if (currentIndex < 10) {
                  swiperRef.current?.swiper.slideTo(currentIndex + 1)
                }
              }}
            >
              <KeyboardArrowDown className="text-[64px]" />
            </IconButton>
          </div>
        </div>
        <div className="w-1/4 group absolute flex flex-col items-center justify-center h-full left-1/4">
          <Swiper
            ref={swiperRef}
            className="w-full mx-auto"
            slidesPerView={3}
            initialSlide={currentIndex}
            centeredSlides={true}
            direction={'vertical'}
            onSlideChange={e => {
              setCurrentIndex(e.activeIndex)
            }}
          >
            {Array.from({ length: 10 }).map((item, index) => {
              return (
                <SwiperSlide
                  className="h-1/3 flex justify-center items-center"
                  key={index}
                  virtualIndex={index}
                >
                  {({ isActive, isNext, isPrev }) => (
                    <div className="w-full h-full flex justify-center items-center">
                      <div
                        onClick={() => handleClick(index)}
                        className={`mx-auto rounded-full  cursor-pointer duration-300 ${
                          isActive ? styles.ball_container : null
                        } ${
                          isActive
                            ? 'w-64 h-64 opacity-100 bg-gradient-to-br p-4 from-pink-400 to-purple-300'
                            : 'w-40 h-40 opacity-50 bg-gradient-to-br p-1 from-pink-400 to-purple-300'
                        } ${isNext ? 'translate-y-8' : ''} ${isPrev ? '-translate-y-8' : ''}`}
                      >
                        <Image
                          src={testImg}
                          className="w-full h-full rounded-full opacity-75"
                          alt="ball_img"
                        />
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
