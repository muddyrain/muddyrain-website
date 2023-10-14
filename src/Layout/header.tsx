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
  Badge,
} from '@mui/material'
import { AccountCircle, Add, EditNote } from '@mui/icons-material'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, Suspense, useRef, useState } from 'react'
import { Login } from '@/components'
import { useLayoutStore } from '@/store/useLayoutStore'
import { PROJECT_NAME } from '@/constant'

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
    label: '音乐',
    href: '/music',
  },
  {
    label: '图画',
    href: '/picture',
  },
  {
    label: '聊天',
    href: '/chat',
    number: 1,
  },
]
export const Header: FC<{
  isHome: boolean
}> = ({ isHome }) => {
  const router = useRouter()
  const isShowLogin = useLayoutStore(state => state.isShowLogin)
  const HeaderAction = dynamic(
    () => import('./components/HeaderAction').then(e => e.HeaderAction),
    { ssr: false }
  )
  return (
    <div className="w-full flex items-center bg-white z-20 sticky top-0 py-2 shadow-md justify-between px-4 header_container duration-300">
      {/* Logo */}
      <IconButton color="primary">{PROJECT_NAME}</IconButton>
      {/* nav */}
      <Stack className="flex-1 mx-40 justify-center" direction="row" spacing={2}>
        {naves.map((nav, index) => {
          return (
            <Badge badgeContent={nav.number} color="error" key={index}>
              <Button
                color={router?.route === nav.href ? 'primary' : 'inherit'}
                onClick={() => {
                  location.pathname = nav.href
                }}
              >
                {nav.label}
              </Button>
            </Badge>
          )
        })}
      </Stack>
      {/* actions */}
      <HeaderAction />
      {isShowLogin && <Login />}
    </div>
  )
}
