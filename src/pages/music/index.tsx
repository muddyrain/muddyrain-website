import { Layout } from '@/Layout'
import { winterBg1, winterBg2, winterBg3 } from '@/assets'
import { Stack } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { Slider } from './components/slider'
import { Main } from './components/main'

export default function Music() {
  const [currentBg, setCurrent] = useState(winterBg1)
  return (
    <Layout showBackground={false}>
      <div className="relative w-full h-full">
        <Image alt="bg" className="w-full h-full" src={currentBg} priority />
      </div>
      <div className="w-[70%] h-[75%] absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]  bg-white/30 drop-shadow-2xl rounded-xl backdrop-blur-xl flex overflow-hidden">
        <Slider />
        <Main />
      </div>
    </Layout>
  )
}
