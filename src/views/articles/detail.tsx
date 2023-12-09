'use client'
import { Badge, IconButton, Stack, Typography } from '@mui/material'
import {
  Recommend as RecommendIcon,
  Sms as SmsIcon,
  Star as StarIcon,
  Share as ShareIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from '@mui/icons-material'
import { Loading, Viewer } from '@/components'
import { useEffect, useState } from 'react'
import { getArticleByIdApi, postArticleLikeApi } from '@/api'
import { useRouter } from 'next/router'
import { ArticleType, THEME_TYPES } from '@/types'
import { useUserStore } from '@/store/useUserStore'
import { useLayoutStore } from '@/store/useLayoutStore'
import { useMessage } from '@/hooks/useMessage'

export default function Page() {
  const accountInfo = useUserStore(state => state.accountInfo)
  const setShowLogin = useLayoutStore(state => state.setShowLogin)
  const message = useMessage()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { id } = router.query
  const [article, setArticle] = useState<ArticleType | null>(null)
  useEffect(() => {
    if (!id) return
    setLoading(true)
    getArticleByIdApi(id as string)
      .then(res => {
        if (res) {
          setArticle(res || null)
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 250)
      })
  }, [id])
  const handleClickLike = () => {
    if (!id) return
    postArticleLikeApi(id as string).then(res => {
      if (res) {
        setArticle(
          article => ({ ...article, isLike: !article?.isLike, like: res.like }) as ArticleType
        )
      }
    })
  }

  return (
    <Stack direction={'row'} className="w-container mx-auto my-4" spacing={3}>
      {/* 操作导航 */}
      <Stack className="py-10 fixed -translate-x-12" spacing={2}>
        {/* 点赞 */}
        <Badge badgeContent={article?.like} color={article?.isLike ? 'error' : 'secondary'}>
          <IconButton
            size="large"
            className="bg-white"
            onClick={() => {
              if (accountInfo?.token) {
                handleClickLike()
              } else {
                message.showMessage('请先登录', {
                  type: 'info',
                })
                setShowLogin(true)
              }
            }}
          >
            <RecommendIcon className={`${article?.isLike ? 'text-red-400' : ''} scale-125`} />
          </IconButton>
        </Badge>
        {/* 评论 */}
        <Badge badgeContent={0} color="secondary">
          <IconButton size="large" className="bg-white">
            <SmsIcon />
          </IconButton>
        </Badge>
        {/* 收藏 */}
        <Badge badgeContent={0} color="secondary">
          <IconButton size="large" className="bg-white">
            <StarIcon />
          </IconButton>
        </Badge>
        {/* 分享 */}
        <Badge badgeContent={0} color="secondary">
          <IconButton size="large" className="bg-white">
            <ShareIcon />
          </IconButton>
        </Badge>
      </Stack>
      <Stack className="flex-1 py-12 px-20 rounded-lg bg-white">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Typography variant="h4" className="">
              {article?.title}
            </Typography>
            <div className="my-4 flex w-full">
              <Stack direction="row" spacing={2}>
                <span>{article?.user?.userName}</span>
                <span className="text-zinc-400">{article?.formatted_update_time}</span>
                <Stack direction={'row'} alignItems={'center'}>
                  <RemoveRedEyeIcon fontSize="small" color="secondary" />
                  <span className="ml-1 text-zinc-400">{article?.preview}</span>
                </Stack>
              </Stack>
            </div>
            <Typography variant="body1" className="mb-2" component="div">
              <Viewer
                theme={(article?.theme as THEME_TYPES) || 'juejin'}
                value={article?.content || ''}
              />
            </Typography>
          </>
        )}
      </Stack>
    </Stack>
  )
}
