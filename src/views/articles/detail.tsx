'use client'
import { Badge, IconButton, Stack, Typography } from '@mui/material'
import {
  Recommend as RecommendIcon,
  Sms as SmsIcon,
  Star as StarIcon,
  Share as ShareIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from '@mui/icons-material'
import { Viewer } from '@/components'
import { useEffect, useState } from 'react'
import { getArticleByIdApi } from '@/api'
import { useRouter } from 'next/router'
import { ArticleType, THEME_TYPES } from '@/types'

export default function Page() {
  const router = useRouter()
  const { id } = router.query
  const [article, setArticle] = useState<ArticleType | null>(null)
  useEffect(() => {
    if (id) {
      getArticleByIdApi(id as string).then(res => {
        if (res) {
          setArticle(res || null)
        }
      })
    } else {
      router.push('/404')
    }
  }, [id])
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
          {article?.title}
        </Typography>
        <div className="my-4 flex w-full">
          <Stack direction="row" spacing={2}>
            <span>{article?.user.userName}</span>
            <span className="text-zinc-400">{article?.formatted_update_time}</span>
            <Stack direction={'row'} alignItems={'center'}>
              <RemoveRedEyeIcon fontSize="small" color="secondary" />
              <span className="ml-1 text-zinc-400">19415</span>
            </Stack>
          </Stack>
        </div>
        <Typography variant="body1" className="mb-2" component="div">
          <Viewer
            theme={(article?.theme as THEME_TYPES) || 'juejin'}
            value={article?.content || ''}
          />
        </Typography>
      </Stack>
    </Stack>
  )
}
