import { FC, useState } from 'react'
import {
  Search,
  NotificationsNoneOutlined,
  HighlightOff,
  NavigateBefore,
} from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
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
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="搜索音乐、歌单、专辑"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="outline-none border w-60 border-solid border-zinc-400/60 text-zinc-500 placeholder:text-zinc-400/80 rounded-md px-8 bg-transparent h-8 text-md"
            />
            <Search className="absolute left-2 text-zinc-400/60 text-xl" />
            {searchValue && (
              <IconButton
                className="absolute cursor-pointer  right-1"
                size="small"
                onClick={() => {
                  setSearchValue('')
                }}
              >
                <HighlightOff className="duration-300 text-zinc-400/60 text-xl" />
              </IconButton>
            )}
          </div>
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
