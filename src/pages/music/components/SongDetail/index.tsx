import { useMusicStore } from '@/store/useMusicStore'
import { FC } from 'react'

export const SongDetail: FC = () => {
  const [isShowSongDetail] = useMusicStore(state => [
    state.isShowSongDetail,
    state.setShowSongDetail,
  ])
  console.log(isShowSongDetail)
  return (
    <div
      className={`absolute z-10 w-full h-full bg-red-200 duration-300 ${
        isShowSongDetail ? 'top-0' : 'top-[100%]'
      }`}
    ></div>
  )
}
