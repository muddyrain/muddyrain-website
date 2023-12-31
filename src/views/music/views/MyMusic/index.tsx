import { Download, Favorite, PlayArrow } from '@mui/icons-material'
import { Avatar, Button, IconButton, Stack } from '@mui/material'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { Search } from '../../components/Search'
import { ScrollView } from '@/components'
import { errorImage } from '@/assets'
import { getLikeListApi, getSongDetailApi } from '@/views/music/api/music'
import { useMusicStore } from '../../store/useMusicStore'
import { SongsItem } from '../../types'
import { millisecondToTime } from '@/utils/time'

export const MyMusic: FC = () => {
  const [searchIsFocus, setSearchIsFocus] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const currentProfile = useMusicStore(state => state.userProfile)
  const [list, setList] = useState<SongsItem[]>([])
  useEffect(() => {
    if (!searchValue) {
      setSearchIsFocus(false)
    }
  }, [searchValue])

  useEffect(() => {
    if (!currentProfile) return
    getLikeListApi(currentProfile.userId).then(res => {
      const ids = res.ids
      if (ids.length > 0) {
        getSongDetailApi(ids.join(',')).then(res => {
          setList(res.songs)
        })
      }
    })
  }, [])
  return (
    <>
      <div className="flex ">
        <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
          <Image src={errorImage} alt="my-music" className="w-full h-full" />
          <div className="w-full h-full absolute top-0 left-0 bg-black/10">
            <div className="flex items-center justify-end mt-1 mr-1 text-yellow-50">
              <PlayArrow />
              <span>2371</span>
            </div>
          </div>
        </div>
        <div className="ml-8 flex flex-col">
          <div className="text-2xl font-bold text-zinc-600 mb-2">我的音乐</div>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Avatar className="w-6 h-6" />
            <span className="text-zinc-400">muddyrain</span>
            <span className="text-zinc-400 text-sm">2018-02-25创建</span>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} spacing={1} className="mt-auto">
            <Button variant="contained">
              <span>播放全部</span>
              <PlayArrow className="ml-1" />
            </Button>
            <Button color="secondary" variant="outlined">
              <Download className="mr-1" />
              <span>下载</span>
            </Button>
            <span className="text-zinc-400 text-sm">累计听歌150首</span>
          </Stack>
        </div>
      </div>
      <div className="flex items-center mt-4 mb-2">
        <span className="text-lg text-zinc-600">歌曲列表</span>
        <div className="flex items-center ml-auto">
          <Search
            value={searchValue}
            onFocus={() => {
              setSearchIsFocus(true)
            }}
            onBlur={() => {
              if (!searchValue) {
                setSearchIsFocus(false)
              }
            }}
            onChange={value => {
              setSearchValue(value)
            }}
            inputClassName={`duration-300 ${searchIsFocus ? 'w-60' : 'w-20 pr-0'}`}
            placeholder={`搜索`}
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="w-full h-full flex flex-col">
          <Stack direction={'row'} spacing={1} className="py-2 px-4 flex items-center">
            <div className="w-16 relative flex justify-center">
              <span>#</span>
            </div>
            <div className="flex-[1.5]">
              <span>歌名</span>
            </div>
            <div className="flex-[1]">
              <span>专辑</span>
            </div>
            <div className="w-24">
              <span>喜欢</span>
            </div>
            <div className="w-40">
              <span>时长</span>
            </div>
          </Stack>
          <div className="flex-1 flex-col flex overflow-hidden">
            <ScrollView>
              <div className="w-full h-full">
                {list.map((item, index) => (
                  <Stack
                    direction={'row'}
                    key={index}
                    spacing={1}
                    className="py-2 px-4 flex items-center text-sm cursor-pointer rounded-md hover:bg-zinc-100/20 group"
                  >
                    <div className="w-16 relative flex justify-center">
                      <IconButton className="absolute top-1/2 translate-y-[-50%] duration-300 opacity-0 group-hover:opacity-100">
                        <PlayArrow className="text-zinc-500" />
                      </IconButton>
                      <span className="group-hover:hidden">
                        {index + 1 < 10 ? '0' + (index + 1) : index + 1}
                      </span>
                    </div>
                    <div className="flex-[1.5] flex items-center">
                      <Image
                        className="rounded-md"
                        src={item.al.picUrl}
                        width={40}
                        height={40}
                        alt={'album'}
                        loading="lazy"
                      />
                      <div className="ml-1 flex flex-col">
                        <span className="text-base">{item.name}</span>
                        <span className="text-sm text-zinc-500">
                          {item.ar.map(item => item.name)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-[1]">
                      <span>{item.al.name}</span>
                    </div>
                    <div className="w-24">
                      <IconButton>
                        <Favorite className="text-sm" color="error" />
                      </IconButton>
                    </div>
                    <div className="w-40">
                      <span>{millisecondToTime(item.dt)}</span>
                    </div>
                  </Stack>
                ))}
              </div>
            </ScrollView>
          </div>
        </div>
      </div>
    </>
  )
}
