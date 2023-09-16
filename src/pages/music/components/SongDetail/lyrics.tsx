import { Stack } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { parse } from 'clrc'
type LyricsType = {
  key?: string
  lineNumber: number
  raw: string
  content?: string
  type: 'metadata' | 'lyric'
  startMillisecond?: number
  value?: string
}[]
export const Lyrics: FC = () => {
  const [lyrics, setLyrics] = useState<LyricsType>()
  useEffect(() => {
    fetch('/1.lrc')
      .then(res => res.text())
      .then(res => {
        console.log(parse(res))
        setLyrics(parse(res) as LyricsType)
      })
  }, [])
  return (
    <div className="w-full h-full p-[7.5%]">
      <Stack spacing={2} className="flex flex-col h-full">
        <h1 className="text-zinc-600">Young And Beautiful</h1>
        <Stack className="text-sm text-zinc-400" direction={'row'} spacing={1}>
          <div>歌手: Lana Del Rey</div>
          <div>专辑: YoungAnd Beautiful</div>
        </Stack>
        <Stack spacing={1} className="flex-1">
          {lyrics?.map((item, index) => {
            if (item?.content) {
              return (
                <div key={item.key} className="text-center">
                  {item?.content}
                </div>
              )
            }
          })}
        </Stack>
      </Stack>
    </div>
  )
}
