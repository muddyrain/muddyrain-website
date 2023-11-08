import { FC, useEffect, useState } from 'react'
import { Title } from './Title'
import { getPersonalizedNewSongApi } from '@/api/music'
import { Grid } from '@mui/material'
import { ArtistsType, SongsItem } from '@/pages/music/types'
import { SoundQualityOptions } from '@/pages/music/constant'
import { PlayArrow } from '@mui/icons-material'

/**
 * 最新音乐
 */
export const NewSongs: FC = () => {
  const [songs, setSongs] = useState<SongsItem[]>([])
  useEffect(() => {
    getPersonalizedNewSongApi().then(res => {
      console.log(res.result)
      setSongs(res.result || [])
    })
  }, [])
  return (
    <div className="relative">
      <Title title="最新音乐" />
      <Grid container spacing={2} className="mt-2">
        {songs.map(item => (
          <Grid
            item
            key={item.name}
            md={6}
            lg={6}
            className="rounded-md group p-4 hover:shadow-lg hover:bg-white/25 shadow-white/50 duration-500"
          >
            <div className="flex items-center py-2 cursor-pointer">
              <div className="relative w-20 h-20 rounded-md overflow-hidden">
                <img className="w-full h-full" src={item.picUrl} alt={item.name} />
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
