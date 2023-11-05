import { useLayoutStore } from '@/store/useLayoutStore'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import gsap from 'gsap'
import { registerApi } from '@/api'
import { useUserStore } from '@/store/useUserStore'
import { useMessage } from '@/hooks/useMessage'
export const Register: FC = () => {
  const setShowLogin = useLayoutStore(state => state.setShowLogin)
  const isShowLogin = useLayoutStore(state => state.isShowLogin)
  const setShowRegister = useLayoutStore(state => state.setShowRegister)
  const isShowRegister = useLayoutStore(state => state.isShowRegister)
  const { showMessage } = useMessage()
  const [setAccountInfo] = useUserStore(state => [state.setAccountInfo])
  useEffect(() => {
    if (isShowRegister) {
      gsap.to(state, {
        scale: 1,
        opacity: 0.5,
        duration: 0.3,
        onUpdate: () => {
          setState({ ...state })
        },
      })
    }
  }, [isShowRegister])
  const [state, setState] = useState({
    scale: 0,
    opacity: 0.5,
    userName: '',
    password: '',
    password2: '',
  })
  return (
    <div
      className={`w-screen h-screen top-0 left-0 fixed z-50 overflow-hidden`}
      style={{
        backgroundColor: `rgba(0,0,0,${state.opacity})`,
      }}
    >
      <div
        className={`absolute flex flex-col w-[640px] h-[480px] bg-white m-auto inset-0 rounded-lg overflow-hidden`}
        style={{
          transform: `scale(${state.scale})`,
        }}
      >
        <div className="header border-0 border-b border-solid border-zinc-200 px-4 py-2 items-center  flex justify-between">
          <span>注册畅享更多权益</span>
          <Button
            onClick={() => {
              gsap.to(state, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                onUpdate: () => {
                  setState({ ...state })
                },
                onComplete: () => {
                  setShowRegister(false)
                },
              })
            }}
          >
            关闭
          </Button>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault()
            if (state.password !== state.password2) {
              showMessage('俩次密码不一致', {
                type: 'error',
              })
              return
            }
            registerApi({
              userName: state.userName,
              password: state.password,
            }).then(res => {
              if (res) {
                setAccountInfo(res)
                setShowRegister(false)
              }
            })
          }}
          className="flex-1 px-6 p-4"
        >
          <Typography className="mb-6" variant="h6">
            账号密码注册
          </Typography>
          <Stack spacing={3}>
            <TextField
              fullWidth
              name="userName"
              value={state.userName}
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
            <TextField
              fullWidth
              label="确认密码"
              name="password2"
              value={state.password2}
              type="password"
              onChange={e => {
                setState({
                  ...state,
                  password2: e.target.value,
                })
              }}
            />
            <Stack direction={'row'} spacing={2}>
              <Button className="py-2 flex-1" variant="contained" type="submit">
                注册
              </Button>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              <Stack direction={'row'} spacing={1} alignItems="center">
                <Button
                  onClick={() => {
                    setShowLogin(false)
                    setShowRegister(true)
                  }}
                >
                  我要登录
                </Button>
                <Button>忘记密码</Button>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </div>
    </div>
  )
}
