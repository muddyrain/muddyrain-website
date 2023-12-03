'use client'
import { Article } from '@/components'
import { Button, Card, Stack } from '@mui/material'
import { Assistant as AssistantIcon, Star as StarIcon } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { ArticleTagOptions as _ArticleTagOptions } from '@/constant'
import { getArticleListApi } from '@/api'
import { ArticleType } from '@/types'
import { Empty } from '@/components/Empty'
const ArticleTagOptions = [
  {
    label: '关注',
    value: -2,
    icon: StarIcon,
  },
  {
    label: '推荐',
    value: -1,
    icon: AssistantIcon,
  },
  ..._ArticleTagOptions,
]
export default function Page() {
  const [currentTag, setCurrentTag] = useState(-1)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [articleList, setArticleList] = useState<ArticleType[]>([])
  const getArticleList = () => {
    console.log('getArticleList')
    getArticleListApi({ page, pageSize: 10 }).then(res => {
      setArticleList(res.data || [])
      setTotal(res.total || 0)
    })
  }

  useEffect(() => {
    setPage
    total
    getArticleList()
  }, [])
  return (
    <Stack direction={'row'} spacing={2} className="w-container mx-auto my-4">
      {/* 类型列表 */}
      <Stack
        spacing={1}
        className="shadow-sm rounded-lg border border-solid bg-white border-zinc-100 w-[180px] p-4"
      >
        {ArticleTagOptions.map(item => {
          const Icon = item.icon
          return (
            <Button
              key={item.value}
              variant={'text'}
              color={currentTag === item.value ? 'primary' : 'inherit'}
              className={`justify-start py-3 duration-300 px-6  ${
                currentTag === item.value
                  ? 'bg-purple-50 border border-purple-100 border-solid'
                  : 'border border-transparent border-solid text-zinc-500'
              }`}
              onClick={() => {
                setCurrentTag(item.value)
              }}
              startIcon={<Icon />}
            >
              {item.label}
            </Button>
          )
        })}
      </Stack>
      {/* 文章列表 */}
      <div className="shadow-sm rounded-lg flex-1 border border-solid bg-white border-zinc-100 w-[180px] p-4">
        {articleList?.length ? (
          articleList.map((item, index) => {
            return <Article key={index} article={item} className="mb-4" />
          })
        ) : (
          <Empty />
        )}
      </div>
      <div className="w-[240px]">
        <Card className="shadow-lg rounded-lg">
          <Stack
            direction={'row'}
            spacing={1}
            alignItems={'center'}
            justifyContent={'space-between'}
            className="p-4"
          >
            <div className="flex flex-col justify-center ">
              <span>连续签到100天</span>
              <span className="text-sm mt-2 text-zinc-400">点亮每一天</span>
            </div>
            <div>
              <Button variant="outlined" size="small">
                签到
              </Button>
            </div>
          </Stack>
        </Card>
      </div>
    </Stack>
  )
}
