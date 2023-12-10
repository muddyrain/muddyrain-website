import { Avatar, Button, Stack } from '@mui/material'
import { FC } from 'react'
import { Comment as CommentIcon, Favorite as FavoriteIcon } from '@mui/icons-material'
import { CommentInput } from './CommentInput'
import { useArticleStore } from '@/store/useArticleStore'
import { CommentType } from '@/types'

export const Comment: FC<{
  children?: React.ReactNode
  isSimple?: boolean
  comment?: CommentType
  onSubmit?: (content: string, reply_id: number, reply_to_reply_id?: number) => void
}> = ({ children, isSimple, comment, onSubmit }) => {
  const setCurrentCommentId = useArticleStore(state => state.setCurrentCommentId)
  const currentCommentId = useArticleStore(state => state.currentCommentId)
  const authorName = comment?.user?.nikeName || comment?.user?.userName || '匿名用户'
  const replyAuthorName =
    comment?.replyToReply?.user?.nikeName || comment?.replyToReply?.user?.userName || '匿名用户'
  let title = ''
  if (comment?.reply_to_reply_id) {
    title = authorName + ' 回复 ' + replyAuthorName
  } else {
    title = authorName
  }

  return (
    <Stack direction="row" className="w-full mt-8" spacing={2}>
      <Avatar />
      <Stack direction="column" spacing={1} className="flex-1">
        {isSimple ? (
          <div>
            <span>{title}</span>
            <span className="inline-block mx-0.5 text-sm rounded-sm bg-primary/10 text-primary w-10 text-center ">
              作者
            </span>
            <span>:</span>
            <span>{comment?.content}</span>
          </div>
        ) : (
          <>
            <div>
              <span className="text-lg">{title}</span>
            </div>
            <div>{comment?.content}</div>
          </>
        )}
        <Stack direction="row" alignItems={'center'} spacing={0.5}>
          <span className={'text-zinc-500'}>5月前</span>
          <Button
            variant="text"
            size="small"
            className={'text-zinc-500'}
            startIcon={<FavoriteIcon />}
            onClick={() => {}}
          >
            0
          </Button>
          <Button
            size="small"
            className={'text-zinc-500'}
            variant="text"
            startIcon={<CommentIcon />}
            onClick={() => {
              if (currentCommentId === comment?.id) {
                setCurrentCommentId(0)
                return
              }
              setCurrentCommentId(comment?.id as number)
            }}
          >
            0
          </Button>
        </Stack>
        {currentCommentId === comment?.id ? (
          <CommentInput
            isSimple
            rows={2}
            onSubmit={content => {
              if (comment?.reply_id) {
                onSubmit?.(content, comment?.reply_id as number, comment?.id as number)
              } else {
                onSubmit?.(content, comment?.id as number)
              }
            }}
          />
        ) : null}
        {children}
      </Stack>
    </Stack>
  )
}
