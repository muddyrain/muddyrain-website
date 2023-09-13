'use client'
import { FC } from 'react'

export const Background: FC = () => {
  return (
    <div className="fixed z-[1] w-screen h-screen blur-[9rem] pointer-events-none select-none">
      <div className="absolute top-[45vh] left-[calc((100vw-1200px)/2-24rem)]">
        <div className="w-[20rem] h-[20rem] bg-blue-500 rounded-full translate-y-[12rem]"></div>
      </div>
      <div className="absolute top-[45vh] left-[calc((100vw-1200px)/2-24rem)]">
        <div className="w-[20rem] h-[20rem] bg-red-500 rounded-full translate-y-[4rem]"></div>
      </div>
      <div className="absolute top-[45vh] right-[calc((100vw-1200px)/2-24rem)]">
        <div className="w-[20rem] h-[20rem] bg-purple-500 rounded-full translate-y-[12rem]"></div>
      </div>
      <div className="absolute top-[45vh] right-[calc((100vw-1200px)/2-24rem)]">
        <div className="w-[20rem] h-[20rem] bg-indigo-500 rounded-full translate-y-[-2rem]"></div>
      </div>
    </div>
  )
}
