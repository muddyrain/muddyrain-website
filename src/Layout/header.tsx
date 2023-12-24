import { Button, Stack, Badge } from '@mui/material'

import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import { FC, memo, useMemo } from 'react'
import { BlockLoading, Login } from '@/components'
import { useLayoutStore } from '@/store/useLayoutStore'
import { PROJECT_NAME } from '@/constant'

const HeaderAction = dynamic(() => import('./components/HeaderAction').then(e => e.HeaderAction), {
  ssr: false,
  loading: () => <BlockLoading size="small" />,
})

const HeaderComponent: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const isShowLogin = useLayoutStore(state => state.isShowLogin)
  const navList = useMemo(() => {
    return [
      {
        label: '首页',
        href: '/',
      },
      {
        label: '好文',
        href: '/articles/',
      },
      {
        label: '碎语',
        href: '/words/',
      },
      {
        label: '音乐',
        href: '/music/',
      },
      {
        label: '图画',
        href: '/picture/',
      },
      {
        label: '聊天',
        href: '/chat/',
        number: 1,
      },
    ]
  }, [])
  return (
    <div className="w-full flex items-center bg-white z-20 top-0 py-2 shadow-md justify-between px-4 header_container relative duration-300">
      {/* Logo */}
      <Button
        color="primary"
        variant="text"
        onClick={() => {
          router.push('/')
        }}
      >
        <span className="text-2xl">{PROJECT_NAME}</span>
      </Button>
      {/* nav */}
      <Stack
        className="flex-1 absolute left-1/2 translate-x-[-50%] justify-center"
        direction="row"
        spacing={2}
      >
        {navList.map((nav, index) => {
          return (
            <Badge badgeContent={nav.number} color="error" key={index}>
              <Button
                color={pathname === nav.href ? 'primary' : 'inherit'}
                onClick={() => {
                  router.push(nav.href)
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

export const Header = memo(HeaderComponent)
