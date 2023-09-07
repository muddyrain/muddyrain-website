import { Layout } from '@/Layout'
import { winterBg1, winterBg2, winterBg3 } from '@/assets'
import Image from 'next/image'
import { useState } from 'react'
import { Slider } from './components/slider'
import { Main } from './components/main'
import { Player } from './components/player'

export default function Music() {
  const [currentBg, setCurrent] = useState(winterBg1)
  return (
    <Layout showBackground={false}>
      <div className="relative w-full h-full overflow-hidden">
        <Image
          alt="bg"
          className="absolute top-[-60px] left-0 w-screen h-screen"
          src={currentBg}
          priority
        />
      </div>
      <div className="w-[1600px] h-[960px] absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]  drop-shadow-2xl rounded-xl backdrop-blur-md flex overflow-hidden">
        <Slider />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Main />
          <Player />
        </div>
      </div>
    </Layout>
  )
}
