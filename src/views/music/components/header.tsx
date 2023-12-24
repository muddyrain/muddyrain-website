import { FC, useState } from 'react'
import { NotificationsNoneOutlined, NavigateBefore } from '@mui/icons-material'
import { Avatar, Button, IconButton } from '@mui/material'
import { Search } from './Search'
import { useMusicStore } from '@/store/useMusicStore'
export const Header: FC = () => {
  const setShowLogin = useMusicStore(state => state.setShowLogin)
  const isShowLogin = useMusicStore(state => state.isShowLogin)
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
          <Button
            className="flex items-center cursor-pointer"
            onClick={() => {
              setShowLogin(!isShowLogin)
            }}
          >
            <Avatar className="w-8 h-8" />
            <span className="text-zinc-700 ml-2">未登录</span>
          </Button>
        </div>
      </div>
    </>
  )
}
