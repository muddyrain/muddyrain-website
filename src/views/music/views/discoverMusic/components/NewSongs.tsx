import { FC, useEffect, useState } from 'react'
import { Title } from './Title'
import { getPersonalizedNewSongApi, getSongUrlApi } from '@/api/music'
import { Grid } from '@mui/material'
import { SongsItem } from '@/views/music/types'
import { SoundQualityOptions } from '@/views/music/constant'
import { PlayArrow } from '@mui/icons-material'
import Image from 'next/image'
import { useMusicStore } from '@/views/music/store/useMusicStore'

/**
 * 最新音乐
 */
export const NewSongs: FC = () => {
  const [songs, setSongs] = useState<SongsItem[]>([])
  const setCurrentSongIndex = useMusicStore(state => state.setCurrentSongIndex)
  const setCurrentSongList = useMusicStore(state => state.setCurrentSongList)
  const currentSongList = useMusicStore(state => state.currentSongList)
  useEffect(() => {
    getPersonalizedNewSongApi().then(res => {
      setSongs(res.result || [])
    })
  }, [])
  const handleClickItem = (song: SongsItem) => {
    console.log('click item', song)
    getSongUrlApi(song.id).then(res => {
      const tmp = res.data?.[0]
      if (tmp) {
        const songItem = { ...song, url: tmp.url, type: tmp.type }
        currentSongList.push(songItem)
        setCurrentSongList([...currentSongList])
        setCurrentSongIndex(currentSongList.length - 1)
      }
    })
  }
  return (
    <div className="relative mt-4">
      <Title title="最新音乐" />
      <Grid container spacing={2} className="mt-1">
        {songs.map(item => (
          <Grid
            item
            key={item.id}
            md={6}
            lg={6}
            className="rounded-md group p-4 hover:shadow-lg hover:bg-white/25 shadow-white/50 duration-500"
          >
            <div className="flex items-center cursor-pointer">
              <div
                className="relative w-20 h-20 rounded-md overflow-hidden"
                onClick={() => handleClickItem(item)}
              >
                <Image
                  className="w-full h-full"
                  src={item.picUrl}
                  alt={item.name}
                  width={0}
                  height={0}
                />
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center group-hover:opacity-100 opacity-0 bg-black/25 duration-500">
                  <PlayArrow className="text-white scale-[1.75]" />
                </div>
              </div>
              <div className="ml-4 flex flex-col">
                <span>{item.name}</span>
                <div className="mt-2 flex items-center">
                  <div className="border border-yellow-500 border-solid rounded p-0.5 leading-none origin-left">
                    <span className="text-[10px] text-yellow-500 font-bold">
                      {
                        SoundQualityOptions.find(c => c.value === item.song.privilege.maxBrLevel)
                          ?.label
                      }
                    </span>
                  </div>
                  <div className="ml-2 text-zinc-500 text-sm">
                    {item.song.artists.map(item => item.name)}
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
