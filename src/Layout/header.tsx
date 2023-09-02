'use client'
import {
  IconButton,
  Button,
  Stack,
  Chip,
  Icon,
  Popover,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Add, EditNote } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { FC, useRef, useState } from 'react'
import { Login } from '@/components'
import { useLayoutStore } from '@/store/useLayoutStore'

const naves = [
  {
    label: '首页',
    href: '/',
  },
  {
    label: '好文',
    href: '/articles',
  },
  {
    label: '碎语',
    href: '/words',
  },
  {
    label: '图画',
    href: '/picture',
  },
  {
    label: '留言板',
    href: '/message',
  },
]
export const Header: FC<{
  isHome: boolean
}> = ({ isHome }) => {
  const router = useRouter()
  const setShowLogin = useLayoutStore(state => state.setShowLogin)
  const isShowLogin = useLayoutStore(state => state.isShowLogin)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  return (
    <div className="w-full flex items-center bg-white z-20 sticky top-0 py-2 shadow-md justify-between px-4 header_container duration-300">
      {/* Logo */}
      <IconButton color="primary">M</IconButton>
      {/* nav */}
      <Stack className="flex-1 mx-40 justify-center" direction="row" spacing={2}>
        {naves.map((nav, index) => {
          return (
            <Button
              key={index}
              color={router?.route === nav.href ? 'primary' : 'inherit'}
              onClick={() => {
                location.pathname = nav.href
              }}
            >
              {nav.label}
            </Button>
          )
        })}
      </Stack>
      {/* actions */}
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
          open={open}
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
                window.location.href = '/articles/new'
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
        <Chip label="注册" color="primary" onClick={() => {}} variant="outlined" />
        <Chip
          label="登录"
          color="info"
          onClick={() => {
            setShowLogin(true)
          }}
          variant="outlined"
        />
      </Stack>
      {isShowLogin && <Login />}
    </div>
  )
}
