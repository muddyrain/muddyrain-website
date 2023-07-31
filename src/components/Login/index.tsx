import { useLayoutStore } from '@/store/useLayoutStore';
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import gsap from 'gsap';
import { QqOutlined, WechatOutlined } from '@ant-design/icons';
export const Login: FC = () => {
  const setShowLogin = useLayoutStore(state => state.setShowLogin);
  const isShowLogin = useLayoutStore(state => state.isShowLogin);
  useEffect(() => {
    if (isShowLogin) {
      gsap.to(state, {
        scale: 1,
        opacity: 0.5,
        duration: 0.3,
        onUpdate: () => {
          setState({ ...state });
        },
      });
    }
  }, [isShowLogin]);
  const [state, setState] = useState({
    scale: 0,
    opacity: 0.5,
  });
  return (
    <div
      className={`w-screen h-screen top-0 left-0 fixed z-50 overflow-hidden`}
      style={{
        backgroundColor: `rgba(0,0,0,${state.opacity})`,
      }}
    >
      <div
        className={`absolute flex flex-col w-[640px] h-[420px] bg-white m-auto inset-0 rounded-lg overflow-hidden`}
        style={{
          transform: `scale(${state.scale})`,
        }}
      >
        <div className='header border-0 border-b border-solid border-zinc-200 px-4 py-2 items-center  flex justify-between'>
          <span>登录畅享更多权益</span>
          <Button
            onClick={() => {
              gsap.to(state, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                onUpdate: () => {
                  setState({ ...state });
                },
                onComplete: () => {
                  setShowLogin(false);
                },
              });
            }}
          >
            关闭
          </Button>
        </div>
        <div className='flex-1 px-6 p-4'>
          <Typography className='mb-6' variant='h6'>
            账号密码登录
          </Typography>
          <Stack spacing={3}>
            <TextField fullWidth label='账号' />
            <TextField fullWidth label='密码' type='password' />
            <Button className='py-2' variant='contained'>
              登录
            </Button>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Stack direction='row' spacing={1} alignItems='center'>
                <span>其他登录</span>
                <IconButton>
                  <WechatOutlined />
                </IconButton>
                <IconButton>
                  <QqOutlined />
                </IconButton>
              </Stack>
              <Button>忘记密码</Button>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
};
