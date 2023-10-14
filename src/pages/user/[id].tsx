'use client'
import { Layout } from '@/Layout'
import { MTabs, TabItem } from '@/components/MTabs'
import { Female, Male, Place } from '@mui/icons-material'
import { Avatar, Box, Breadcrumbs, Button, Chip, Stack, Tab, Tabs, Typography } from '@mui/material'
import { Trends } from './components'
import { useRouter } from 'next/router'

export default function Page() {
  const tabsList: TabItem[] = [
    { label: '动态', value: 0, children: <Trends /> },
    { label: '好文', value: 1 },
    { label: '碎语', value: 2 },
    { label: '关注', value: 3 },
    { label: '赞', value: 4 },
  ]
  const router = useRouter()
  return (
    <Layout>
      <Stack className="w-container flex mx-auto mt-8" direction={'row'} spacing={2}>
        <Stack className="w-2/3">
          <Stack direction={'row'} spacing={2}>
            <Avatar className="w-24 h-24" />
            <Stack spacing={1} className="flex-1" alignItems={'start'}>
              <Typography variant="h6">Muddyrain</Typography>
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
              <Typography variant="body2">邮箱: qiu3291002845@gmail.com</Typography>
              <Typography variant="body2">手机号: 15100404109</Typography>
              <Typography variant="body2">生日: 2002-10-10</Typography>
              <Stack
                direction="row"
                className="w-full"
                spacing={1}
                justifyContent={'space-between'}
              >
                <Stack direction="row" spacing={1}>
                  <Chip
                    icon={Math.random() > 0.5 ? <Male /> : <Female />}
                    label="性别: 男"
                    variant="outlined"
                  />
                  <Chip icon={<Place />} label="浙江·杭州" variant="outlined" />
                </Stack>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    router.push('/user/settings')
                  }}
                >
                  编辑资料
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <MTabs className="mt-4" items={tabsList} />
        </Stack>
        <div className="w-1/3 border border-zinc-200 border-solid"></div>
      </Stack>
    </Layout>
  )
}
