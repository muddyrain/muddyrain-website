import { testBG, testImg } from '@/assets'
import { PlayArrow, PlayArrowOutlined } from '@mui/icons-material'
import Image from 'next/image'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'overlayscrollbars/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { Title } from '../components/Title'
export const DiscoverMusic: FC = () => {
  return (
    <>
      {/* 内容 */}
      <div className="title flex items-center">
        <Title title="推荐歌单" />
        {/* 播放按钮 */}
        <div className="rounded-3xl cursor-pointer flex border border-white border-solid shadow-primary/75 shadow-lg items-center ml-8 px-4 py-2 justify-center text-white bg-primary group">
          <span className="text-md font-bold font-sans tracking-wider select-none">播放</span>
          <PlayArrow className="text-2xl" />
        </div>
      </div>
      {/* banner区域 */}
      <div className="flex overflow-x-auto">
        <Swiper spaceBetween={10} slidesPerView={'auto'} autoplay>
          {Array.from({ length: 12 }).map((item, index) => (
            <SwiperSlide key={index} style={{ width: 160 }}>
              <div className="flex cursor-pointer w-full h-full py-6 flex-col justify-center items-center">
                <Image
                  width={150}
                  height={150}
                  className="rounded-lg shadow-lg shadow-primary/50 select-none"
                  src={testImg}
                  alt="banner"
                />
                <div className="mt-3 justify-center flex items-center">
                  <span className="text-md text-zinc-600 font-sans select-none">
                    Loud · Rihanna {index + 1}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* 日常组合 */}
      <div className="flex-1 flex justify-between overflow-hidden">
        <div className="w-3/5 flex flex-col">
          <Title title="推荐歌曲" />
          <div className="flex-1 mt-2 flex flex-col overflow-hidden">
            <OverlayScrollbarsComponent
              element="div"
              defer
              options={{ scrollbars: { autoHide: 'scroll', autoHideSuspend: true } }}
            >
              <div className={`w-full h-full`}>
                {Array.from({ length: 20 }).map((item, index) => (
                  <div
                    className="flex p-2 items-center text-base text-zinc-600 cursor-pointer hover:bg-white/30 duration-300 rounded-md"
                    key={index}
                  >
                    <Image
                      className="mr-2 rounded-lg select-none"
                      src={testImg}
                      width={45}
                      height={45}
                      alt="daily mix image"
                    />
                    <span className="flex-1 select-none">Mask Off111</span>
                    <span className="flex-1 select-none">Future</span>
                    <span className="flex-1 select-none">Dive</span>
                    <span className="flex-1 select-none">3:54</span>
                  </div>
                ))}
              </div>
            </OverlayScrollbarsComponent>
          </div>
        </div>
        <div className="w-2/5 flex flex-col">
          <Title title="推荐MV" />
          <div className="flex-1 mt-2 flex flex-col overflow-hidden">
            <OverlayScrollbarsComponent
              element="div"
              defer
              options={{ scrollbars: { autoHide: 'scroll', autoHideSuspend: true } }}
            >
              <div className="w-full h-full flex flex-wrap pr-2">
                {Array.from({ length: 20 }).map((item, index) => (
                  <div className="flex flex-col w-[48%] mx-[1%] pb-2" key={index}>
                    <div className="w-full h-[125px] relative cursor-pointer group ">
                      <Image
                        className="w-full rounded-md select-none"
                        height={125}
                        alt="mv-bg"
                        src={testBG}
                      />
                      <div className="absolute w-full h-full drop-shadow-xl bg-black/10 top-0 p-1 right-0 group-hover:bg-black/0 duration-300">
                        <div className="flex items-center text-sm justify-end text-zinc-100">
                          <PlayArrowOutlined />
                          <span className="select-none">239万</span>
                        </div>
                      </div>
                    </div>
                    <span className="mt-1 text-zinc-800 select-none">Monster</span>
                    <span className="text-zinc-500 text-sm select-none">
                      Shawn Mendes / Justin Bieber
                    </span>
                  </div>
                ))}
              </div>
            </OverlayScrollbarsComponent>
          </div>
        </div>
      </div>
    </>
  )
}
