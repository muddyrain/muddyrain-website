'use client'
import {
  WaterDrop as WaterDropIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
  CardMedia,
  CardActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'
import { Layout } from '@/Layout'
import { useState } from 'react'
import { Article } from '@/components'
export default function Page() {
  const list = [
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/1.jpg',
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/2.jpg',
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/3.jpg',
  ]
  const [autoPlay, setAutoPlay] = useState(true)
  return (
    <Layout>
      <div className="w-container mx-auto p-3">
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">展示风采</Typography>
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
              <div className="h-[660px] rounded-lg overflow-hidden relative group" key={index}>
                <Image
                  className="w-full h-full  cursor-pointer group-hover:scale-125 duration-500"
                  src={item}
                  layout="fill"
                  width={0}
                  height={0}
                  alt="Picture of the author"
                />
                <div className="absolute bottom-10 left-10">
                  <Button variant="contained" className="rounded-full duration-300">
                    请阅读我
                  </Button>
                  <Typography color="white" className="mt-2">
                    芳树无人花自落，春山一路鸟空啼
                  </Typography>
                </div>
              </div>
            )
          })}
        </Carousel>
        {/* 介绍 */}
        <Stack direction="row" spacing={4} className="mt-4">
          <Stack className="w-2/3">
            <Typography variant="h6">优质好文</Typography>
            <List>
              <Article />
            </List>
          </Stack>
          <Stack className="w-1/3">
            <Typography variant="h6">最近动态</Typography>
            <List className="h-[240]">
              {Array.from({ length: 5 }).map((_, index) => {
                return (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oui Oui"
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Sandra Adams
                          </Typography>
                          {' — Do you have Paris recommendations? Have you ever…'}
                        </>
                      }
                    />
                  </ListItem>
                )
              })}
              <div className="flex justify-center">
                <Button>查看更多</Button>
              </div>
            </List>
          </Stack>
        </Stack>
      </div>
    </Layout>
  )
}
