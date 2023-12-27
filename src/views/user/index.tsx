'use client'
import { MTabs, TabItem } from '@/components/MTabs'
import { Female, Male, Transgender, Place } from '@mui/icons-material'
import { Avatar, Breadcrumbs, Button, Stack, Typography } from '@mui/material'
import { Trends } from './components'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { getUserByIdApi } from '@/api'
import { LoadingBox } from '@/components/LoadingBox'
import { UserType } from '@/types'
import { GenderOptions } from '@/constant'
import { useUserStore } from '@/store/useUserStore'

export default function Page() {
  const tabsList: TabItem[] = [
    { label: '动态', value: 0, children: <Trends /> },
    { label: '好文', value: 1 },
    { label: '碎语', value: 2 },
    { label: '关注', value: 3 },
    { label: '赞', value: 4 },
  ]
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const { id } = useParams<{ id: string }>()
  const accountInfo = useUserStore(state => state.accountInfo)
  const [loading, setLoading] = useState(false)
  const getInfo = async () => {
    setLoading(true)
    getUserByIdApi(id)
      .then(res => {
        setUser(res)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 250)
      })
  }
  const genderText = useMemo(() => {
    return GenderOptions.find(item => item.value === (user?.gender || 2))?.label
  }, [user])
  const genderIcon = useMemo(() => {
    switch (user?.gender) {
      case 0:
        return <Male />
      case 1:
        return <Female />
      case 2:
        return <Transgender />
      default:
        return <Transgender />
    }
  }, [user])
  useEffect(() => {
    id && getInfo()
  }, [id])
  return (
    <LoadingBox loading={loading}>
      <Stack className="w-container flex mx-auto mt-8" direction={'row'} spacing={2}>
        <Stack className="w-2/3">
          <Stack direction={'row'} spacing={2}>
            <Avatar src={user?.avatar} sx={{ width: 128, height: 128 }} />
            <Stack spacing={1} className="flex-1" alignItems={'start'}>
              <Typography variant="h6">{user?.nickName}</Typography>
              <Stack direction="row" spacing={1}>
                <Breadcrumbs separator="|" aria-label="breadcrumb">
                  <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <span className="text-sm">关注</span>
                    <span className="text-lg">371</span>
                  </Stack>
                  <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <span className="text-sm">点赞</span>
                    <span className="text-lg">41</span>
                  </Stack>
                  <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <span className="text-sm">收藏</span>
                    <span className="text-lg">51</span>
                  </Stack>
                </Breadcrumbs>
              </Stack>
              <Typography variant="body2">邮箱: {user?.email}</Typography>
              <Typography variant="body2">手机号: xxxxxxxxxxxx</Typography>
              <Typography variant="body2">生日: {user?.birthday}</Typography>
              <Stack
                direction="row"
                className="w-full"
                spacing={1}
                justifyContent={'space-between'}
              >
                <Stack direction="row" spacing={1}>
                  <div className="rounded-2xl border border-solid border-zinc-400 flex items-center px-3 py-1">
                    <>{genderIcon}</>
                    <span>性别: {genderText}</span>
                  </div>
                  <div className="rounded-2xl border border-solid border-zinc-400 flex items-center px-3 py-1">
                    <Place />
                    <span>浙江·杭州</span>
                  </div>
                </Stack>
                {user?.id === accountInfo?.id && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      router.push('/user/settings')
                    }}
                  >
                    编辑资料
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
          <MTabs className="mt-4" items={tabsList} />
        </Stack>
        <div className="w-1/3 border border-zinc-200 border-solid"></div>
      </Stack>
    </LoadingBox>
  )
}
