import { FC, useState } from 'react'
import { NotificationsNoneOutlined, NavigateBefore } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Search } from '../components/Search'
import { BlockLoading } from '@/components'
import { colors } from '@mui/material'
import dynamic from 'next/dynamic'
const HeaderAction = dynamic(() => import('./HeaderAction').then(e => e.HeaderAction), {
  ssr: false,
  loading: () => <BlockLoading size="small" color={colors['indigo']['400']} />,
})
export const Header: FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [inputFocus, setInputFocus] = useState(false)
  return (
    <>
      {/* 头部栏 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <IconButton className="mr-2">
            <NavigateBefore className="text-2xl text-zinc-400/60" />
          </IconButton>
          {/* 搜索框 */}
          <Search
            inputClassName={`${inputFocus ? 'w-80' : 'w-50'} duration-300`}
            value={searchValue}
            onFocus={() => {
              setInputFocus(true)
            }}
            onBlur={() => {
              setInputFocus(false)
            }}
            onChange={e => {
              setSearchValue(e)
            }}
            placeholder="搜索音乐、歌单、专辑"
          />
        </div>
        <div className="flex items-center">
          <IconButton color="primary">
            <NotificationsNoneOutlined className="text-xl text-zinc-600" />
          </IconButton>
          <HeaderAction />
        </div>
      </div>
    </>
  )
}
