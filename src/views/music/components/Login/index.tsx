import { CloseOutlined } from '@mui/icons-material'
import { Button, IconButton, Stack, TextField } from '@mui/material'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { LOGO } from '../../assets'
import { useMusicStore } from '@/views/music/store/useMusicStore'
import { gsap } from 'gsap'
import { useMessage } from '@/hooks/useMessage'
import { cellphoneLoginApi, sendCaptchaApi } from '@/api/music'

const send_time = 50

export const Login: FC = () => {
  const setShowLogin = useMusicStore(state => state.setShowLogin)
  const isShowLogin = useMusicStore(state => state.isShowLogin)
  const setUserProfile = useMusicStore(state => state.setUserProfile)
  const message = useMessage()
  // 验证码倒计时
  const [countdown, setCountdown] = useState(60)
  // 切换登录方式
  const [loginType, setLoginType] = useState<'password' | 'captcha'>('captcha')
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
    captcha: '',
  })
  const sendCaptcha = () => {
    if (state.userName === '') {
      message.showMessage('请输入手机号', 'info')
      return
    }
    if (countdown < 60) {
      return
    }
    sendCaptchaApi(state.userName).then(res => {
      if (res.code === 200) {
        message.showMessage('验证码已发送', 'success')
      } else {
        message.showMessage(res.message, 'error')
      }
    })
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1)
      setCountdown(prevCountdown => {
        if (prevCountdown <= 0) {
          clearInterval(timer)
          return 60
        }
        return prevCountdown
      })
    }, send_time)
  }
  const handleSubmit = () => {
    if (state.userName === '') {
      message.showMessage('请输入手机号', 'info')
      return
    }
    if (state.captcha === '' && loginType === 'captcha') {
      message.showMessage('请输入验证码', 'info')
      return
    }
    if (state.password === '' && loginType === 'password') {
      message.showMessage('请输入密码', 'info')
      return
    }
    cellphoneLoginApi(state.userName, state.captcha).then(res => {
      if (res.code === 200) {
        setShowLogin(false)
        setUserProfile(res.profile)
        message.showMessage('登录成功', 'success')
      } else {
        message.showMessage(res.message, 'error')
      }
    })
  }
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
      <Stack spacing={2} className="px-8 mt-12">
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
        {
          // 验证码登录
          loginType === 'captcha' ? (
            <div className="flex">
              <TextField
                fullWidth
                name="captcha"
                label="验证码"
                className="rounded-full"
                onChange={e => {
                  setState({
                    ...state,
                    captcha: e.target.value,
                  })
                }}
              />
              <Button variant="outlined" className="ml-2 w-36 px-2" onClick={sendCaptcha}>
                {countdown < 60 ? `${countdown}s重新获取` : `获取验证码`}
              </Button>
            </div>
          ) : (
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
          )
        }
        <div
          className="w-full py-4 rounded-full bg-primary text-center text-white cursor-pointer hover:bg-opacity-95 duration-200"
          onClick={() => {
            handleSubmit()
          }}
        >
          <span className="select-none">登录</span>
        </div>
      </Stack>
      <div className="flex justify-between px-8 mt-2">
        {/* 自动登录 */}
        <Button variant="text">自动登录</Button>
        {/* 验证码登录 */}
        <Button
          variant="text"
          onClick={() => {
            setLoginType(loginType === 'password' ? 'captcha' : 'password')
          }}
        >
          验证码登录
        </Button>
      </div>
    </div>
  )
}
