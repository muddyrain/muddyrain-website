import { FC } from 'react'

export const Background: FC = () => {
  return (
    <div className="w-full h-full blur-[9rem] pointer-events-none select-none">
      <div className="absolute top-[5%] left-[5%]">
        <div className="w-10rem] h-[10rem] bg-indigo-400 rounded-full translate-y-[12rem]"></div>
      </div>
      <div className="absolute top-[45%] left-[15%]">
        <div className="w-[10rem] h-[10rem] bg-sky-400 rounded-full translate-y-[4rem]"></div>
      </div>
      <div className="absolute top-[5%] right-[5%]">
        <div className="w-[10rem] h-[10rem] bg-pink-400 rounded-full translate-y-[12rem]"></div>
      </div>
      <div className="absolute top-[45%] right-[15%]">
        <div className="w-[10rem] h-[10rem] bg-cyan-300 rounded-full translate-y-[-2rem]"></div>
      </div>
    </div>
  )
}
