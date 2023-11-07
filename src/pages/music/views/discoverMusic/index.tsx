import Image from 'next/image'
import { FC, useEffect, useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { getBannerApi } from '@/api/music'
import { Pagination } from 'swiper/modules'
import $style from './index.module.scss'
import ColorThief from 'colorthief'
interface BannerItem {
  imageUrl: string
  bgColor: [number, number, number] | null
}
export const DiscoverMusic: FC = () => {
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
        return `linear-gradient(to bottom, rgb(${current.bgColor[0]}, ${current.bgColor[1]}, ${current.bgColor[2]}), rgb(${current.bgColor[0]}, ${current.bgColor[1]}, ${current.bgColor[2]}))`
      }
    }
    // 渐变
    return '#fff'
  }, [bannerList, currentBannerIndex])
  return (
    <>
      <div className="flex">
        {/* banner区域 */}
        <div
          className="w-1/3 h-full  relative rounded-lg overflow-hidden"
          style={{
            backgroundImage: currentBannerBackgroundColor,
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply',
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
                  className="w-full h-[180px] select-none"
                  src={item.imageUrl}
                  priority
                  width={0}
                  height={200}
                  alt="banner"
                />
              </SwiperSlide>
            ))}
            <div className="absolute left-2 bottom-2 z-10 bg-white rounded-md text-sm">
              <div className="scale-75">新歌首发</div>
            </div>
          </Swiper>
        </div>

        <div className="w-1/3"></div>
        <div className="w-1/3"></div>
      </div>
    </>
  )
}
