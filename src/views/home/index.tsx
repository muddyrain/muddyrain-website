'use client'
import { WaterDrop as WaterDropIcon } from '@mui/icons-material'
import {
  Avatar,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
} from '@mui/material'
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'
import { FC, useEffect, useState } from 'react'
import { Article } from '@/components'
import { getArticleListApi, getRecentActivityListApi } from '@/api'
import { ArticleType, RecentActivityType, RecentActivityTypeEnum } from '@/types'
import { LoadingBox } from '@/components/LoadingBox'
import { Empty } from '@/components/Empty'
import { formateTime } from '@/utils'
const RecentActivityList: FC = () => {
  const [recentActivityList, setRecentActivityList] = useState<RecentActivityType[]>([])
  const [loading, setLoading] = useState(false)
  const formatType = (type: RecentActivityTypeEnum) => {
    switch (type) {
      case RecentActivityTypeEnum.login:
        return '登录了系统'
      case RecentActivityTypeEnum.register:
        return '注册了系统'
      default:
        return '未知'
    }
  }
  const getRecentActivityList = () => {
    setLoading(true)
    getRecentActivityListApi()
      .then(res => {
        setRecentActivityList(res || [])
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 250)
      })
  }
  useEffect(() => {
    getRecentActivityList()
  }, [])
  return (
    <LoadingBox loading={loading}>
      <List className="h-[240]">
        {recentActivityList.length === 0 ? (
          <Empty />
        ) : (
          <>
            {recentActivityList.map((item, index) => {
              return (
                <ListItem key={index} className="mb-2" alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Cindy Baker" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <div className="flex justify-between">
                        {item.user?.nikeName || item.user?.userName || '匿名用户'}
                        <span>{formateTime(item.formatted_create_time, 'YYYY-MM-DD')}</span>
                      </div>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {formatType(item.type as RecentActivityTypeEnum)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              )
            })}
          </>
        )}
      </List>
    </LoadingBox>
  )
}
export default function Page() {
  const list = [
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/1.jpg',
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/2.jpg',
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/3.jpg',
  ]
  const [articleList, setArticleList] = useState<ArticleType[]>([])
  const [loading, setLoading] = useState(false)
  const getArticleList = () => {
    setLoading(true)
    getArticleListApi({ page: 1, pageSize: 10 })
      .then(res => {
        setArticleList(res.data || [])
        // setTotal(res.total || 0)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 250)
      })
  }

  useEffect(() => {
    getArticleList()
  }, [])
  const [autoPlay, setAutoPlay] = useState(true)
  return (
    <div className="w-container mx-auto p-3">
      <Stack direction="row" justifyContent="space-between">
        <div className="text-2xl">展示风采</div>
        <FormControlLabel
          control={
            <Switch
              checked={autoPlay}
              onChange={e => {
                setAutoPlay(e.target.checked)
              }}
            />
          }
          label="自动播放"
        />
      </Stack>
      {/* 轮播图 */}
      <Carousel
        autoPlay={autoPlay}
        interval={5000}
        duration={1000}
        className="relative h-[660px]"
        IndicatorIcon={<WaterDropIcon />}
        indicatorContainerProps={{
          className: 'absolute bottom-4 z-10',
        }}
        indicatorIconButtonProps={{
          className: 'hover:text-white text-zinc-400 mx-1',
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: 'white',
          },
        }}
      >
        {list.map((item, index) => {
          return (
            <div
              className="h-[660px] duration-300 rounded-lg overflow-hidden relative group"
              key={index}
            >
              <Image
                className="w-full h-full  cursor-pointer group-hover:scale-125 duration-500"
                src={item}
                width={0}
                loading={'eager'}
                height={0}
                sizes="100%,100%"
                alt="Picture of the author"
              />
              <div className="absolute bottom-10 left-10">
                <Button variant="contained" className="rounded-full duration-300">
                  请阅读我
                </Button>
                <div className="mt-2">
                  <Typography color="white">芳树无人花自落，春山一路鸟空啼</Typography>
                </div>
              </div>
            </div>
          )
        })}
      </Carousel>
      {/* 介绍 */}
      <Stack direction="row" spacing={4} className="mt-4">
        <Stack className="w-2/3">
          <div className="text-2xl">优质好文</div>
          <LoadingBox loading={loading} className="mt-2">
            {articleList.length === 0 && <Empty />}
            <Stack direction={'column'} spacing={1}>
              {articleList.map((item, index) => {
                return <Article article={item} key={index} />
              })}
            </Stack>
          </LoadingBox>
        </Stack>
        <Stack className="w-1/3">
          <Typography variant="h6">最近动态</Typography>
          <RecentActivityList />
        </Stack>
      </Stack>
    </div>
  )
}
