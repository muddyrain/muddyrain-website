import { useMusicStore } from '@/store/useMusicStore'
import { FC } from 'react'
import { Background } from './background'
import styles from './index.module.scss'
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
    >
      <div className="w-full h-full absolute top-0 left-0 bg-white/50 drop-shadow-lg">
        <Background />
      </div>
      <div className="w-full h-full absolute top-0 left-0 z-10">
        {/* <div className="w-1/2 absolute top-1/2 translate-y-[-50%] left-[-10%]">
          <div className="w-full h-[20rem] bg-purple-200"></div>
          <div className="w-[20rem] h-[20rem] rounded-full bg-purple-200 absolute top-1/2 right-0 translate-x-1/2 translate-y-[-50%]"></div>
        </div> */}
        <div className={`${styles.rect_container}`}></div>
      </div>
    </div>
  )
}
