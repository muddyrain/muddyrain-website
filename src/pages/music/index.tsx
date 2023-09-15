import { Layout } from '@/Layout'
import { winterBg1, winterBg2, winterBg3 } from '@/assets'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Slider } from './components/slider'
import { Player } from './components/player'
import { RouterList } from './router'
import { Header } from './components/header'
import { PlayList } from './components/PlayList'
import { SongDetail } from './components/SongDetail'
export default function Music() {
  const [currentBg, setCurrent] = useState(winterBg1)
  const [currentPage, setCurrentPage] = useState('')
  const CurrentComponent = useMemo(() => {
    return RouterList.find(item => item.url === currentPage)?.component
  }, [currentPage])
  return (
    <Layout showBackground={false} showFixedBackground={false}>
      <div className="relative w-full h-full overflow-hidden select-none">
        <Image
          alt="bg"
          className="absolute top-[-60px] left-0 w-screen h-screen"
          src={currentBg}
          priority
        />
      </div>
      <div className="w-[1600px] h-[880px] absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]  drop-shadow-2xl rounded-xl backdrop-blur-md flex overflow-hidden flex-col select-none">
        <div className="flex flex-1 overflow-hidden relative">
          <Slider
            onChange={url => {
              setCurrentPage(url)
            }}
          />
          <div className="flex-1 p-6 bg-white/40 overflow-hidden flex flex-col relative">
            <Header />
            {CurrentComponent}
            <PlayList />
          </div>
          <SongDetail />
        </div>
        <Player />
      </div>
    </Layout>
  )
}
