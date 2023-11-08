import Image from 'next/image'
import { FC, useEffect, useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { getBannerApi } from '@/api/music'
import { Pagination } from 'swiper/modules'
import $style from '../index.module.scss'
import ColorThief from 'colorthief'
interface BannerItem {
  imageUrl: string
  bgColor: [number, number, number] | null
}

/**
 * 轮播图
 */
export const Banner: FC = () => {
  const [bannerList, setBannerList] = useState<BannerItem[]>([])
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  useEffect(() => {
    const colorThief = new ColorThief()
    getBannerApi().then(async res => {
      const bannerItems = res?.banners || []
      setBannerList(bannerItems)
    })
  }, [])

  return (
    <>
      {/* banner区域 */}
      <div
        className={`w-full relative transition-all duration-300 ${$style['banner-container']} cursor-pointer`}
      >
        <Swiper
          modules={[Pagination]}
          className={`w-full h-[225px] ${$style.banner}`}
          spaceBetween={10}
          slidesPerView={3}
          autoplay
          navigation
          onSlideChange={e => {
            setCurrentBannerIndex(e.activeIndex)
          }}
          pagination={{ clickable: true, bulletActiveClass: $style['pagination-active'] }}
        >
          {bannerList.map((item, index) => (
            <SwiperSlide className="group" key={index}>
              <Image
                className={`w-full h-[180px] select-none rounded-md opacity-95 backdrop-blur-xl ${$style['banner-item-image']} `}
                src={item.imageUrl}
                priority
                width={0}
                height={200}
                alt="banner"
              />
              <div className="w-full h-[180px] absolute top-0 left-0 rounded-md bg-black/25 opacity-0 duration-500 group-hover:opacity-100"></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
