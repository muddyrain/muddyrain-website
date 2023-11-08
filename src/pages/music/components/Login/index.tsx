import { CloseOutlined } from '@mui/icons-material'
import { Button, IconButton, Stack, TextField } from '@mui/material'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { LOGO } from '../../assets'
import { useMusicStore } from '@/store/useMusicStore'
import { gsap } from 'gsap'

export const Login: FC = () => {
  const setShowLogin = useMusicStore(state => state.setShowLogin)
  const isShowLogin = useMusicStore(state => state.isShowLogin)
  useEffect(() => {
    if (isShowLogin) {
      gsap.to(state, {
        scale: 1,
        opacity: 0.5,
        duration: 0.3,
        onUpdate: () => {
          setState({ ...state })
        },
      })
    }
  }, [isShowLogin])
  const [state, setState] = useState({
    scale: 0,
    opacity: 0.5,
    userName: '',
    password: '',
  })
  return (
    <div
      className="fixed inset-0 m-auto z-50 w-[480px] h-[480px] bg-white border border-solid border-zinc-200 shadow-sm rounded-xl"
      style={{
        transform: `scale(${state.scale})`,
        transformOrigin: 'center center',
      }}
    >
      <div className="absolute right-2 top-2">
        <IconButton
          onClick={() => {
            gsap.to(state, {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              onUpdate: () => {
                setState({ ...state })
              },
              onComplete: () => {
                setShowLogin(false)
              },
            })
          }}
        >
          <CloseOutlined />
        </IconButton>
      </div>
      <div className="flex justify-center items-center mt-[64px]">
        <Image src={LOGO} width={36} height={36} className="rounded-md" alt="logo" />
        <span className="ml-2 text-xl">网易云音乐</span>
      </div>
      <Stack spacing={3} className="px-8 mt-12">
        <TextField
          fullWidth
          name="userName"
          value={state.userName}
          className="rounded-full"
          onChange={e => {
            setState({
              ...state,
              userName: e.target.value,
            })
          }}
          label="账号"
        />
        <TextField
          fullWidth
          label="密码"
          name="password"
          value={state.password}
          type="password"
          onChange={e => {
            setState({
              ...state,
              password: e.target.value,
            })
          }}
        />
        <div>
          <Button variant="contained" fullWidth className="mt-4">
            登录
          </Button>
        </div>
      </Stack>
    </div>
  )
}
