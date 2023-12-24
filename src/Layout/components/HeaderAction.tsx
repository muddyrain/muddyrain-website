import { useLayoutStore } from '@/store/useLayoutStore'
import { useUserStore } from '@/store/useUserStore'
import { Add, EditNote, Logout, Portrait } from '@mui/icons-material'
import {
  Avatar,
  Chip,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
} from '@mui/material'
import { FC, memo, useMemo, useState } from 'react'
import { useMessage } from '@/hooks/useMessage'
import { useRouter } from 'next/navigation'

const HeaderActionComponent: FC = () => {
  const [AccountEl, setAccountEl] = useState<HTMLButtonElement | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [accountInfo, setAccountInfo] = useUserStore(state => [
    state.accountInfo,
    state.setAccountInfo,
  ])
  const router = useRouter()
  const message = useMessage()
  const setShowLogin = useLayoutStore(state => state.setShowLogin)
  const setCurrentType = useLayoutStore(state => state.setCurrentType)
  const isLogged = useMemo(() => {
    return !!accountInfo?.token
  }, [accountInfo])
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <IconButton
        color="inherit"
        onClick={e => {
          if (accountInfo?.id) {
            setAnchorEl(e.currentTarget)
          } else {
            message.showMessage('请先登录', 'info')
            setShowLogin(true)
            setCurrentType(1)
          }
        }}
      >
        <Add />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null)
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List className="w-[160px]">
          <ListItemButton
            onClick={() => {
              router.push('/articles/new')
            }}
          >
            <ListItemIcon className="min-w-max ">
              <EditNote className="text-md" />
            </ListItemIcon>
            <ListItemText
              className="ml-1"
              primaryTypographyProps={{
                className: 'text-sm',
              }}
              primary="写文章"
            />
          </ListItemButton>
        </List>
      </Popover>
      {!isLogged ? (
        <>
          <Chip
            label="注册"
            color="primary"
            onClick={() => {
              setShowLogin(true)
              setCurrentType(2)
            }}
            variant="outlined"
          />
          <Chip
            label="登录"
            color="info"
            onClick={() => {
              setShowLogin(true)
              setCurrentType(1)
            }}
            variant="outlined"
          />
        </>
      ) : (
        <>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <span>{accountInfo?.nickName || accountInfo?.userName}</span>
            <IconButton
              color="inherit"
              onClick={e => {
                setAccountEl(e.currentTarget)
              }}
            >
              <Avatar src={accountInfo?.avatar} />
            </IconButton>
          </Stack>
          <Popover
            open={Boolean(AccountEl)}
            anchorEl={AccountEl}
            onClose={() => {
              setAccountEl(null)
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <List className="w-[160px]">
              <ListItemButton
                onClick={() => {
                  router.push('/user/' + accountInfo?.id)
                }}
              >
                <ListItemIcon className="min-w-max">
                  <Portrait className="text-md" />
                </ListItemIcon>
                <ListItemText
                  className="ml-1"
                  primaryTypographyProps={{
                    className: 'text-sm',
                  }}
                  primary="个人信息"
                />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  setAccountInfo(null)
                }}
              >
                <ListItemIcon className="min-w-max">
                  <Logout className="text-md" />
                </ListItemIcon>
                <ListItemText
                  className="ml-1"
                  primaryTypographyProps={{
                    className: 'text-sm',
                  }}
                  primary="退出登录"
                />
              </ListItemButton>
            </List>
          </Popover>
        </>
      )}
    </Stack>
  )
}

export const HeaderAction = memo(HeaderActionComponent)
