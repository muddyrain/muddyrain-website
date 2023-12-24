import { getRecentActivityListApi } from '@/api'
import { LoadingBox } from '@/components/LoadingBox'
import { RecentActivityType, RecentActivityTypeEnum } from '@/types'
import { FC, useEffect, useState } from 'react'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { Empty } from '@/components'
import { formatTime } from '@/utils'

const RecentActivityLoading: FC = () => {
  return (
    <Stack spacing={2}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Stack key={index} direction={'row'} spacing={2} className="p-2" alignItems={'center'}>
          {/* 头像 */}
          <Skeleton variant="circular" width={50} height={50} />
          <Stack spacing={1} className="flex-1">
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
              {/* 文字 */}
              <Skeleton variant="rounded" className="w-full" height={20} />
              {/* 时间 */}
              <Skeleton variant="rounded" className="w-10" height={20} />
            </Stack>
            <Skeleton variant="rounded" className="w-full" height={20} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}

export const RecentActivityList: FC = () => {
  const [recentActivityList, setRecentActivityList] = useState<RecentActivityType[]>([])
  const [loading, setLoading] = useState(true)
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
    <LoadingBox loading={loading} component={<RecentActivityLoading />}>
      <List className="h-[240]">
        {recentActivityList.length === 0 ? (
          <Empty />
        ) : (
          <>
            {recentActivityList.map((item, index) => {
              return (
                <ListItem key={index} className="mb-2" alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={item.user?.nickName} src={item.user?.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <div className="flex justify-between">
                        {item.user?.nickName || item.user?.userName || '匿名用户'}
                        <span>{formatTime(item.formatted_create_time, 'YYYY-MM-DD')}</span>
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
