import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { getBannerApi } from '@/api/music'
import { Pagination } from 'swiper/modules'
import $style from './index.module.scss'
interface BannerItem {
  imageUrl: string
}
export const DiscoverMusic: FC = () => {
  const [bannerList, setBannerList] = useState<BannerItem[]>([])
  useEffect(() => {
    getBannerApi().then(res => {
      setBannerList(res?.banners || [])
    })
  }, [])
  return (
    <>
      <div className="flex">
        {/* banner区域 */}
        <Swiper
          modules={[Pagination]}
          className={`w-1/3 h-full ${$style.banner}`}
          spaceBetween={10}
          autoplay
          navigation
          pagination={{ clickable: true, bulletActiveClass: $style['pagination-active'] }}
        >
          {bannerList.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                className="w-full h-full rounded-lg select-none"
                src={item.imageUrl}
                priority
                width={0}
                height={0}
                alt="banner"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="w-1/3"></div>
        <div className="w-1/3"></div>
      </div>
    </>
  )
}
