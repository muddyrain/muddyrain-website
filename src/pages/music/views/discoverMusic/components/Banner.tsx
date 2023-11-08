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
export const Banner: FC = () => {
  const [bannerList, setBannerList] = useState<BannerItem[]>([])
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  useEffect(() => {
    const colorThief = new ColorThief()
    getBannerApi().then(async res => {
      // 帮我理一下异步获取所有图片的颜色后再赋值
      const bannerItems = await Promise.all(
        (res?.banners || []).map(async (item: BannerItem) => {
          const img = document.createElement('img')
          img.src = item.imageUrl
          img.crossOrigin = 'Anonymous'

          return new Promise(resolve => {
            img.onload = () => {
              const colors = colorThief.getColor(img)
              item.bgColor = colors
              resolve(item)
            }
          })
        })
      )
      setBannerList(bannerItems)
    })
  }, [])

  const currentBannerBackgroundColor = useMemo(() => {
    if (bannerList.length) {
      const current = bannerList[currentBannerIndex]
      if (current.bgColor) {
        const colors = current.bgColor
        return `linear-gradient(to bottom, rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.9), rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 1))`
      }
    }
    // 渐变
    return '#fff'
  }, [bannerList, currentBannerIndex])
  return (
    <>
      {/* banner区域 */}
      <div
        className={`w-1/3 h-[225px] relative overflow-hidden rounded-md backdrop-blur-xl transition-all duration-300 ${$style['banner-container']} cursor-pointer`}
        style={{
          backgroundImage: currentBannerBackgroundColor,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
        }}
      >
        <Swiper
          modules={[Pagination]}
          className={`w-full h-[225px] ${$style.banner}`}
          spaceBetween={10}
          autoplay
          navigation
          onSlideChange={e => {
            setCurrentBannerIndex(e.activeIndex)
          }}
          pagination={{ clickable: true, bulletActiveClass: $style['pagination-active'] }}
        >
          {bannerList.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                className={`w-full h-[180px] select-none opacity-80 backdrop-blur-xl ${$style['banner-item-image']} `}
                src={item.imageUrl}
                priority
                width={0}
                height={200}
                alt="banner"
              />
            </SwiperSlide>
          ))}
          <div className="absolute left-3 bottom-3 z-10 bg-white/75 rounded-md text-sm">
            <div className={`scale-75 ${$style.banner_new_songs}`}>新歌首发</div>
          </div>
        </Swiper>
      </div>
    </>
  )
}
