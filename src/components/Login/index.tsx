import { useLayoutStore } from '@/store/useLayoutStore'
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import gsap from 'gsap'
import { QqOutlined, WechatOutlined } from '@ant-design/icons'
import { loginApi, registerApi } from '@/api'
import { useUserStore } from '@/store/useUserStore'
import { useMessage } from '@/hooks/useMessage'
export const Login: FC = () => {
  const setShowLogin = useLayoutStore(state => state.setShowLogin)
  const isShowLogin = useLayoutStore(state => state.isShowLogin)
  const setCurrentType = useLayoutStore(state => state.setCurrentType)
  const currentType = useLayoutStore(state => state.currentType)
  const { showMessage } = useMessage()
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    if (currentType === 1) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [currentType])
  const [setAccountInfo] = useUserStore(state => [state.setAccountInfo])
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
        className={`absolute flex flex-col w-[1080px] h-[640px] bg-white m-auto inset-0 rounded-lg overflow-hidden`}
        style={{
          transform: `scale(${state.scale})`,
        }}
      >
        <div className="header border-0 border-b border-solid border-zinc-200 px-4 py-2 items-center  flex justify-between">
          <span>登录畅享更多权益</span>
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
                  setShowLogin(false)
                },
              })
            }}
          >
            关闭
          </Button>
        </div>
        <div className="flex-1  flex overflow-hidden">
          <form
            onSubmit={e => {
              e.preventDefault()
              loginApi({
                userName: state.userName,
                password: state.password,
              }).then(res => {
                if (res) {
                  setAccountInfo(res)
                  setShowLogin(false)
                }
              })
            }}
            className={`${isLogin ? 'w-1/2' : 'w-0'} duration-500 pt-20 overflow-hidden`}
          >
            <div className={`px-6`}>
              <div className="text-center">
                <Typography className="mb-6" variant="h4">
                  <span className="whitespace-nowrap">登录</span>
                </Typography>
              </div>
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
                <Stack direction={'row'} spacing={2}>
                  <Button className="py-2 flex-1" variant="contained" type="submit">
                    <span className="whitespace-nowrap">登录</span>
                  </Button>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span className="whitespace-nowrap">其他登录</span>
                    <IconButton>
                      <WechatOutlined />
                    </IconButton>
                    <IconButton>
                      <QqOutlined />
                    </IconButton>
                  </Stack>
                  <Stack direction={'row'} spacing={1} alignItems="center">
                    <Button
                      onClick={() => {
                        setCurrentType(2)
                      }}
                    >
                      <span className="whitespace-nowrap"></span>
                    </Button>
                    <Button>
                      <span className="whitespace-nowrap">忘记密码</span>
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </div>
          </form>
          <div className="w-1/2 bg-primary/90 overflow-hidden flex-shrink-0">
            <Stack
              className="w-full h-full"
              spacing={3}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography
                variant="h4"
                className="text-white w-full h-12 items-center justify-center flex relative"
              >
                <span className={`duration-500 absolute ${isLogin ? 'opacity-100' : 'opacity-0'}`}>
                  欢迎回来!
                </span>
                <span className={`duration-500 absolute ${!isLogin ? 'opacity-100' : 'opacity-0'}`}>
                  你好!
                </span>
              </Typography>
              <Typography
                variant="body2"
                className="text-white w-full h-4 items-center justify-center flex relative"
              >
                <span className={`duration-500 absolute ${isLogin ? 'opacity-100' : 'opacity-0'}`}>
                  输入您的信息并与我们一起开始愉快的旅程!
                </span>
                <span className={`duration-500 absolute ${!isLogin ? 'opacity-100' : 'opacity-0'}`}>
                  为了您的账户安全，请使用您的个人信息登录!
                </span>
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsLogin(!isLogin)
                }}
                className="text-white border h-12 px-20 border-white border-solid rounded-full hover:border-white relative"
              >
                <span className={`duration-500 absolute ${isLogin ? 'opacity-100' : 'opacity-0'}`}>
                  注册
                </span>
                <span className={`duration-500 absolute ${!isLogin ? 'opacity-100' : 'opacity-0'}`}>
                  登录
                </span>
              </Button>
            </Stack>
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
                  setShowLogin(false)
                }
              })
            }}
            className={`${!isLogin ? 'w-1/2' : 'w-0'} duration-500 pt-20 overflow-hidden`}
          >
            <div className="px-6">
              <Typography className="mb-6 text-center" variant="h4">
                <span className="whitespace-nowrap">注册</span>
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
                    <span className="whitespace-nowrap">注册</span>
                  </Button>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="flex-end">
                  <Stack direction={'row'} spacing={1} alignItems="center">
                    <Button
                      onClick={() => {
                        setCurrentType(1)
                      }}
                    >
                      <span className="whitespace-nowrap">我要登录</span>
                    </Button>
                    <Button>
                      <span className="whitespace-nowrap">忘记密码</span>
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
