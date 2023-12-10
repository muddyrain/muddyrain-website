import { useMessage } from '@/hooks/useMessage'
import { useLayoutStore } from '@/store/useLayoutStore'
import { useUserStore } from '@/store/useUserStore'
import { Button, Stack, TextField } from '@mui/material'
import { FC, useState } from 'react'

const MaxCommentLength = 200
export const CommentInput: FC<{
  onSubmit?: (content: string) => Promise<void>
  rows?: number
  isSimple?: boolean
}> = ({ onSubmit, rows = 4, isSimple }) => {
  const [commentContent, setCommentContent] = useState('')
  const accountInfo = useUserStore(state => state.accountInfo)
  const setShowLogin = useLayoutStore(state => state.setShowLogin)
  const message = useMessage()
  return (
    <div
      className={`${
        isSimple ? 'border flex-1 border-primary border-solid' : 'flex-1 bg-zinc-100'
      }  py-2 px-4 rounded-md `}
    >
      <TextField
        fullWidth
        multiline
        rows={rows}
        value={commentContent}
        variant="standard"
        onChange={e => {
          setCommentContent(e.target.value)
        }}
        placeholder="写下你的评论..."
        InputProps={{ disableUnderline: true }}
      />
      <Stack
        direction={'row'}
        alignItems={'center'}
        className="mt-2"
        spacing={2}
        justifyContent={'flex-end'}
      >
        <span
          className={commentContent.length > MaxCommentLength ? 'text-red-600' : 'text-gray-600'}
        >
          {commentContent.length}/{MaxCommentLength}
        </span>
        <Button
          variant="contained"
          onClick={async () => {
            if (!accountInfo?.token) {
              message.showMessage('请先登录', 'info')
              setShowLogin(true)
              return
            }
            if (commentContent.length > MaxCommentLength) {
              message.showMessage(`评论内容不能超过${MaxCommentLength}个字符`, 'error')
              return
            }
            await onSubmit?.(commentContent)
            setCommentContent('')
          }}
        >
          发表
        </Button>
      </Stack>
    </div>
  )
}
