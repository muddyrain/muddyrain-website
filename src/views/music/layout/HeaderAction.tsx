import { Avatar, Button } from '@mui/material'
import { FC } from 'react'
import { useMusicStore } from '../store/useMusicStore'

export const HeaderAction: FC = () => {
  const setShowLogin = useMusicStore(state => state.setShowLogin)
  const isShowLogin = useMusicStore(state => state.isShowLogin)
  const currentProfile = useMusicStore(state => state.userProfile)

  return (
    <>
      <Button
        className="flex items-center cursor-pointer"
        onClick={() => {
          if (!currentProfile) {
            setShowLogin(!isShowLogin)
          }
        }}
      >
        <Avatar className="w-8 h-8" src={currentProfile?.avatarUrl} />
        <span className="text-zinc-700 ml-2">{currentProfile?.nickname || '未登录'}</span>
      </Button>
    </>
  )
}
