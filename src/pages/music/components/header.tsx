import { FC, useState } from 'react'
import { NotificationsNoneOutlined, NavigateBefore } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import { Search } from './Search'
export const Header: FC = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <>
      {/* 头部栏 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <IconButton className="mr-2">
            <NavigateBefore className="text-2xl text-zinc-400/60" />
          </IconButton>
          {/* 搜索框 */}
          <Search inputClassName="w-60" placeholder="搜索音乐、歌单、专辑" />
        </div>
        <div className="flex items-center">
          <IconButton color="primary">
            <NotificationsNoneOutlined className="text-xl text-zinc-600" />
          </IconButton>
          <IconButton className="ml-2" color="primary" size="small">
            <Avatar className="w-8 h-8" />
          </IconButton>
        </div>
      </div>
    </>
  )
}
