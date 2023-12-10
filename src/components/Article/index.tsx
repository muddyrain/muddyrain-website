import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import { ArticleType } from '@/types'
import { ArticleTagOptions } from '@/constant'
import { useRouter } from 'next/router'
import { postArticleLikeApi } from '@/api'
import { useUserStore } from '@/store/useUserStore'
import { useLayoutStore } from '@/store/useLayoutStore'
import { useMessage } from '@/hooks/useMessage'
import Image from 'next/image'
export const Article: FC<{
  className?: string
  article: ArticleType
}> = ({ className, article = null }) => {
  const accountInfo = useUserStore(state => state.accountInfo)
  const setShowLogin = useLayoutStore(state => state.setShowLogin)
  const message = useMessage()
  const router = useRouter()
  const tag = useMemo(() => {
    return ArticleTagOptions.find(item => item.value === article?.tag)?.label
  }, [article])
  const [likeCount, setLikeCount] = useState(article?.like || 0)
  const [isLike, setIsLike] = useState(article?.isLike || false)
  const handleClickLike = () => {
    if (!article?.id) return
    postArticleLikeApi(article?.id as string).then(res => {
      if (res) {
        setIsLike(!isLike)
        setLikeCount(res.like)
      }
    })
  }
  return (
    <Card className={`shadow-none border border-solid border-zinc-100 ${className}`}>
      {article?.cover && (
        <div className="h-[240px] w-full relative overflow-hidden flex justify-center items-center group cursor-pointer">
          <Image
            width={0}
            height={0}
            className="w-full h-auto group-hover:scale-150 duration-300"
            src={article.cover}
            alt="article-image"
          />
        </div>
      )}
      <CardContent>
        <Typography className="mb-2" variant="h6" color="InfoText">
          <Stack direction="row" alignItems="center" spacing={1} className="mb-2">
            <span>{article?.title}</span>
            {/* 标签 */}
            {tag && (
              <Chip
                size="small"
                label={tag}
                color="primary"
                className="text-sm"
                variant="outlined"
              />
            )}
          </Stack>
        </Typography>
        <Typography className="mb-2 truncate text-ellipsis" variant="body2" color="text.secondary">
          <span>{article?.brief_content || ''}</span>
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            router.push('/articles/' + article?.id)
          }}
        >
          开始阅读
        </Button>
      </CardContent>
      <CardActions>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button variant="text" startIcon={<VisibilityIcon />}>
            {article?.preview}
          </Button>
          <Button
            variant="text"
            className={isLike ? 'text-red-500' : ''}
            startIcon={<FavoriteIcon />}
            onClick={() => {
              if (accountInfo?.token) {
                handleClickLike()
              } else {
                message.showMessage('请先登录', 'info')
                setShowLogin(true)
              }
            }}
          >
            {likeCount}
          </Button>
          <Button variant="text" startIcon={<ShareIcon />}>
            0
          </Button>
        </Stack>
      </CardActions>
    </Card>
  )
}
