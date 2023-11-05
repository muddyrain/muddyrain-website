'use client'
import { Badge, IconButton, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import {
  Recommend as RecommendIcon,
  Sms as SmsIcon,
  Star as StarIcon,
  Share as ShareIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from '@mui/icons-material'
import { CodeThemes, CodeThemesType } from '@/components/CodeBlock'
import { useState } from 'react'
import { testMd } from './test'
import { Viewer } from '@/components'

export default function Page() {
  const router = useRouter()
  const [theme, setTheme] = useState<CodeThemesType>(CodeThemes.dark)
  return (
    <Stack direction={'row'} className="w-container mx-auto my-4" spacing={3}>
      {/* 操作导航 */}
      <Stack className="py-10 fixed -translate-x-12" spacing={2}>
        {/* 点赞 */}
        <Badge badgeContent={1} color="secondary">
          <IconButton size="large" className="bg-white">
            <RecommendIcon />
          </IconButton>
        </Badge>
        {/* 评论 */}
        <Badge badgeContent={4} color="secondary">
          <IconButton size="large" className="bg-white">
            <SmsIcon />
          </IconButton>
        </Badge>
        {/* 收藏 */}
        <Badge badgeContent={4} color="secondary">
          <IconButton size="large" className="bg-white">
            <StarIcon />
          </IconButton>
        </Badge>
        {/* 分享 */}
        <Badge badgeContent={4} color="secondary">
          <IconButton size="large" className="bg-white">
            <ShareIcon />
          </IconButton>
        </Badge>
      </Stack>
      <Stack className="flex-1 py-12 px-20 rounded-lg bg-white">
        <Typography variant="h4" className="">
          Javascript 事件循环
        </Typography>
        <div className="my-4 flex w-full">
          <Stack direction="row" spacing={2}>
            <span>Muddyrain</span>
            <span className="text-zinc-400">2023-03-08 09:50</span>
            <Stack direction={'row'} alignItems={'center'}>
              <RemoveRedEyeIcon fontSize="small" color="secondary" />
              <span className="ml-1 text-zinc-400">19415</span>
            </Stack>
          </Stack>
        </div>
        <Typography variant="body1" className="mb-2" component="div">
          <Viewer theme="fancy" value={testMd} />
        </Typography>
      </Stack>
    </Stack>
  )
}
