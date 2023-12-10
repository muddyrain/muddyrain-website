'use client'
import { Avatar, Badge, IconButton, Stack, Typography } from '@mui/material'
import {
  Recommend as RecommendIcon,
  Sms as SmsIcon,
  Star as StarIcon,
  Share as ShareIcon,
  Refresh as RefreshIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from '@mui/icons-material'
import { Loading, Viewer } from '@/components'
import { useEffect, useRef, useState } from 'react'
import {
  createArticleCommentApi,
  getArticleByIdApi,
  getArticleCommentListApi,
  postArticleLikeApi,
} from '@/api'
import { useRouter } from 'next/router'
import { ArticleType, CommentType, THEME_TYPES } from '@/types'
import { useUserStore } from '@/store/useUserStore'
import { useLayoutStore } from '@/store/useLayoutStore'
import { useMessage } from '@/hooks/useMessage'
import { CommentInput } from '@/components/Article/CommentInput'
import { Comment } from '@/components/Article/Comment'
import { Empty } from '@/components/Empty'

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Stack className={`w-full py-8 px-10 rounded-lg bg-white ${className}`}>{children}</Stack>
)

export default function Page() {
  const accountInfo = useUserStore(state => state.accountInfo)
  const setShowLogin = useLayoutStore(state => state.setShowLogin)
  const message = useMessage()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const commentTitleRef = useRef<HTMLSpanElement>(null)
  const { id } = router.query
  const [article, setArticle] = useState<ArticleType | null>(null)
  const [commentList, setCommentList] = useState<CommentType[]>([])
  const getArticleCommentList = () => {
    getArticleCommentListApi(id as string).then(res => {
      setCommentList(res || [])
    })
  }
  const getArticleInfo = () => {
    getArticleByIdApi(id as string)
      .then((res: ArticleType) => {
        if (res) {
          setArticle(res || null)
        } else {
          router.push('/404')
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 250)
      })
  }
  const getData = () => {
    if (!id) return
    getArticleInfo()
    getArticleCommentList()
  }
  useEffect(() => {
    setLoading(true)
    getData()
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
  const handleSubmitComment = async (
    content: string,
    reply_id: number = 0,
    reply_to_reply_id = 0
  ) => {
    await createArticleCommentApi(id as string, { content, reply_id, reply_to_reply_id })
    message.showMessage('评论成功', 'success')
    getData()
  }

  return (
    <Stack direction={'row'} className="w-content mx-auto my-4" spacing={3}>
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
                message.showMessage('请先登录', 'info')
                setShowLogin(true)
              }
            }}
          >
            <RecommendIcon className={`${article?.isLike ? 'text-red-400' : ''} scale-125`} />
          </IconButton>
        </Badge>
        {/* 评论 */}
        <Badge
          badgeContent={article?.commentCount}
          color={article?.isComment ? 'error' : 'secondary'}
        >
          <IconButton
            size="large"
            className="bg-white"
            onClick={() => {
              commentTitleRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
          >
            <SmsIcon className={`${article?.isComment ? 'text-red-400' : ''} scale-125`} />
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
        {/* 刷新 */}
        <IconButton
          size="large"
          className="bg-white"
          onClick={() => {
            getData()
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Stack>
      {loading ? (
        <Card className="min-h-[50vh]">
          <Loading />
        </Card>
      ) : (
        <Stack spacing={2} className="flex-1">
          {/* 文章主体信息 */}
          <Card>
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
          </Card>
          {/* 文章评论信息 */}
          <Card>
            <Typography variant="h5" className="">
              <span ref={commentTitleRef}>评论</span>
            </Typography>
            {/* 评论内容 */}
            <Stack direction="row" className="w-full mt-2" spacing={2}>
              <Avatar />
              <CommentInput onSubmit={handleSubmitComment} />
            </Stack>
            {/* 评论列表 */}
            {commentList.length === 0 && <Empty description="暂无评论数据" />}
            {commentList.map(item => (
              <Comment
                article={article}
                key={item.id}
                comment={item}
                onSubmit={handleSubmitComment}
              >
                {item?.children?.map(child => (
                  <Comment
                    article={article}
                    isSimple
                    key={child.id}
                    comment={child}
                    onSubmit={handleSubmitComment}
                  />
                ))}
              </Comment>
            ))}
          </Card>
        </Stack>
      )}
    </Stack>
  )
}
