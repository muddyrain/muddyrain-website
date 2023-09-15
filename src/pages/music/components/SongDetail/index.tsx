import { useMusicStore } from '@/store/useMusicStore'
import { FC } from 'react'
import { Background } from './background'
import styles from './index.module.scss'
import { KeyboardArrowDown, KeyboardArrowUp, Pause, PlayArrow } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import { testImg } from '@/assets'
export const SongDetail: FC = () => {
  const { isShowSongDetail, playState, setPlayState } = useMusicStore(state => ({
    ...state,
  }))
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
            <IconButton>
              <KeyboardArrowUp className="text-2xl" />
            </IconButton>
            <IconButton color="primary">
              <div className="w-16 h-16 bg-white/30 bg-opacity-50 p-[10px] rounded-full cursor-pointer">
                <div className="w-full h-full rounded-full bg-white flex justify-center items-center">
                  {playState === 'playing' ? <Pause /> : <PlayArrow />}
                </div>
              </div>
            </IconButton>
            <IconButton>
              <KeyboardArrowDown className="text-2xl" />
            </IconButton>
          </div>
        </div>
        <div className="w-1/4 absolute flex flex-col items-center justify-center h-full left-1/4">
          <div
            className={`w-52 h-52 absolute top-[0] translate-y-[-25%] rounded-full p-4 cursor-pointer`}
          >
            <Image src={testImg} className="w-full h-full rounded-full opacity-75" alt="ball_img" />
          </div>
          <div
            className={`w-64 h-64 rounded-full p-4 cursor-pointer bg-gradient-to-br from-pink-400 to-purple-300 ${styles.ball_container}`}
          >
            <Image
              src={testImg}
              className="w-full h-full rounded-full opacity-75 hover:animate-spin"
              alt="ball_img"
            />
          </div>
          <div
            className={`w-52 h-52 absolute top-[100%] translate-y-[-75%] rounded-full p-4 cursor-pointer`}
          >
            <Image src={testImg} className="w-full h-full rounded-full opacity-75" alt="ball_img" />
          </div>
        </div>
      </div>
    </div>
  )
}
