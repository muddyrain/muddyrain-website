import { testImg } from '@/assets'
import Image from 'next/image'
import { FC } from 'react'
import { Left, Right, Like, Pause, Play, ShufflePlayback } from '../icons'
import { Button, IconButton } from '@mui/material'
export const Player: FC = () => {
  return (
    <div className="h-24 bg-zinc-50/70 flex items-center p-2 relative">
      <Image src={testImg} alt="album" width={75} height={75} />
      <div className="ml-2 flex flex-col">
        <span className="text-xl text-zinc-800">Daydream</span>
        <span className="text-zinc-400">Tycho</span>
      </div>
      <div className="absolute left-1/2 translate-x-[-50%]">
        {/* 喜欢 */}
        <IconButton color="secondary" size="large">
          <div className="iconfont icon-like text-zinc-500 text-2xl w-8 h-8" />
        </IconButton>
        {/* 快退 */}
        <IconButton color="primary" size="large">
          <div className="iconfont  pr-1 icon-ai-rew-left text-primary text-2xl w-8 h-8" />
        </IconButton>
        {/* 播放 */}
        <IconButton color="primary" size="large">
          <div className="w-12 h-12 rounded-full bg-primary border-2 shadow-lg shadow-primary border-white border-solid flex justify-center items-center">
            <div className="iconfont ml-1 icon-play text-white text-2xl w-8 h-8" />
          </div>
        </IconButton>
        {/* 快进 */}
        <IconButton color="primary" size="large">
          <div className="iconfont pl-1 icon-ai-rew-right text-primary text-2xl w-8 h-8" />
        </IconButton>
        {/* 播放模式 */}
        <IconButton color="secondary" size="large">
          <div className="iconfont icon-random text-zinc-500 text-2xl w-8 h-8" />
        </IconButton>
      </div>
    </div>
  )
}
