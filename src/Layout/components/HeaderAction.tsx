import { useLayoutStore } from '@/store/useLayoutStore'
import { useUserStore } from '@/store/useUserStore'
import { AccountCircle, Add, EditNote, Logout, Portrait } from '@mui/icons-material'
import {
  Chip,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
} from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

export const HeaderAction: FC = () => {
  const [AccountEl, setAccountEl] = useState<HTMLButtonElement | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [accountInfo, setAccountInfo] = useUserStore(state => [
    state.accountInfo,
    state.setAccountInfo,
  ])
  const router = useRouter()
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
          setAnchorEl(e.currentTarget)
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
            <ListItemIcon className="min-w-max mr-2">
              <EditNote className="text-md" />
            </ListItemIcon>
            <ListItemText
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
            <span>{accountInfo?.userName}</span>
            <IconButton
              color="inherit"
              onClick={e => {
                setAccountEl(e.currentTarget)
              }}
            >
              <AccountCircle />
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
                <ListItemIcon className="min-w-max mr-2">
                  <Portrait className="text-md" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    className: 'text-sm',
                  }}
                  primary="个人信息"
                />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  setAccountInfo({})
                }}
              >
                <ListItemIcon className="min-w-max mr-2">
                  <Logout className="text-md" />
                </ListItemIcon>
                <ListItemText
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
