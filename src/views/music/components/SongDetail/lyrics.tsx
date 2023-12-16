import { Stack } from '@mui/material'
import { FC, memo, useEffect, useState } from 'react'
import { parse } from 'clrc'
import { ScrollView } from '@/components'
export type LyricsType = {
  key?: string
  lineNumber: number
  raw: string
  content?: string
  type: 'metadata' | 'lyric'
  startMillisecond?: number
  value?: string
}[]
const MLyrics: FC = () => {
  const [lyrics, setLyrics] = useState<LyricsType>()
  useEffect(() => {
    fetch('/1.lrc')
      .then(res => res.text())
      .then(res => {
        setLyrics(parse(res) as LyricsType)
      })
  }, [])
  return (
    <div className="w-full h-full">
      <Stack spacing={2} className="flex flex-col h-full">
        <ScrollView>
          <Stack spacing={1} className="flex-1 overflow-auto">
            {lyrics?.map((item, index) => {
              if (item?.content) {
                return (
                  <div key={index} className="text-center">
                    {item?.content}
                  </div>
                )
              }
            })}
          </Stack>
        </ScrollView>
      </Stack>
    </div>
  )
}

export const Lyrics = memo(MLyrics)
