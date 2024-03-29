import { winterBg1 } from '@/assets'
import Image from 'next/image'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { Slider } from './components/slider'
import { Player } from './layout'
import { RouterList } from './router'
import { Header } from './layout/header'
import { PlayList } from './components/PlayList'
import { SongDetail } from './layout/SongDetail'
import { Login } from './components/Login'
import { useMusicStore } from '@/views/music/store/useMusicStore'
import { Loading } from '@/components'
import { usePlayerStore } from './store/usePlayerStore'
const NoLoad = React.lazy(() => import('./NoLoad').then(module => ({ default: module.NoLoad })))
const MusicLoading = () => (
  <div className="w-full h-full flex justify-center items-center">
    <Loading />
  </div>
)
export default function Music() {
  const [currentPage, setCurrentPage] = useState('')
  const isShowLogin = useMusicStore(state => state.isShowLogin)
  const currentSongIndex = useMusicStore(state => state.currentSongIndex)
  const CurrentComponent = useMemo(() => {
    const component = RouterList.find(item => item.url === currentPage)?.component || NoLoad
    return component
  }, [currentPage])
  const [audio, setAudio] = usePlayerStore(state => [state.audio, state.setAudio])

  useEffect(() => {
    if (!audio && window) {
      setAudio(new window.Audio())
    }
  }, [audio])
  return (
    <>
      {isShowLogin && <Login />}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden select-none">
        <Image
          alt="bg"
          className="absolute top-[-60px] left-0 w-screen h-screen"
          src={winterBg1}
          priority
        />
      </div>
      <div className="w-full h-full relative z-10">
        <div className="w-[1600px] h-[880px] absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]  drop-shadow-2xl rounded-xl backdrop-blur-sm flex overflow-hidden flex-col select-none">
          <div className="flex flex-1 overflow-hidden relative">
            <Slider
              onChange={url => {
                setCurrentPage(url)
              }}
            />
            <div className="flex-1 p-6 bg-white/40 overflow-hidden flex flex-col relative">
              <Header />
              <div
                className={`flex-1 overflow-hidden duration-300 flex flex-col ${
                  currentSongIndex > -1 ? 'pb-24' : ''
                }`}
              >
                <Suspense fallback={<MusicLoading />}>{<CurrentComponent />}</Suspense>
              </div>
            </div>
          </div>
          <Player />
          <PlayList />
          <SongDetail />
        </div>
      </div>
    </>
  )
}
