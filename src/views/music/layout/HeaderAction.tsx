import { Avatar, Button } from '@mui/material'
import { FC, ReactNode, useState } from 'react'
import { useMusicStore } from '../store/useMusicStore'
import { CSSTransition } from 'react-transition-group'
import '@/styles/transition.scss'
import { AssignmentOutlined, Logout, NavigateNext } from '@mui/icons-material'
import { Headset, Level, LinkOne, SettingOne, ShoppingBag, Vip } from '@icon-park/react'

const UserMenu: FC<{
  open?: boolean
}> = ({ open }) => {
  type ListItem = {
    label: string
    extra?: string
    link?: string
    icon?: ReactNode
  }
  const TopList: ListItem[] = [
    {
      label: '我的会员',
      extra: '2024.09.20到期',
      link: '',
      icon: <Vip theme="outline" className={'h-5'} size={20} />,
    },
    {
      label: '等级',
      icon: <Level theme="outline" className={'h-5'} size={20} />,
    },
    {
      label: '商城',
      icon: <ShoppingBag theme="outline" className={'h-5'} size={20} />,
    },
  ]
  const bottomList: ListItem[] = [
    {
      label: '个人信息设置',
      icon: <SettingOne theme="outline" className={'h-5'} size={20} />,
    },
    {
      label: '绑定社交账号',
      icon: <LinkOne theme="outline" className={'h-5'} size={20} />,
    },
    {
      label: '我的客服',
      icon: <Headset theme="outline" className={'h-5'} size={20} />,
    },
  ]
  return (
    <CSSTransition in={open} timeout={300} classNames={'fade'} unmountOnExit>
      <div className="absolute shadow-lg w-[375px] bg-white z-20 right-2 rounded-md">
        <div className="p-2">
          <div className="flex items-center cursor-pointer px-4 h-[100px]">
            <div className="flex-1 flex flex-col justify-center items-center">
              <span className={'text-2xl font-bold'}>2</span>
              <span className={'text-zinc-400 mt-1 text-sm'}>动态</span>
            </div>
            <div className="w-[1px] h-1/2 bg-zinc-100"></div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <span className={'text-2xl font-bold'}>15</span>
              <span className={'text-zinc-400 mt-1 text-sm'}>关注</span>
            </div>
            <div className="w-[1px] h-1/2 bg-zinc-100"></div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <span className={'text-2xl font-bold'}>3</span>
              <span className={'text-zinc-400 mt-1 text-sm'}>粉丝</span>
            </div>
          </div>
          <div className="flex justify-center">
            <Button variant="contained" color={'error'} className={'rounded-full w-24'}>
              <AssignmentOutlined className={'text-sm mr-0.5'} />
              <span>签到</span>
            </Button>
          </div>
          <div className="h-[1px] w-full bg-zinc-100 mt-4"></div>
        </div>
        <div className="my-2">
          {TopList.map((item, index) => (
            <div
              className="py-2 px-4 hover:bg-zinc-100 duration-300 flex items-center justify-between cursor-pointer text-zinc-600"
              key={index}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </div>
              <span>
                <NavigateNext />
              </span>
            </div>
          ))}
        </div>
        <div className="h-[1px] w-full bg-zinc-100"></div>
        <div className="my-2">
          {bottomList.map((item, index) => (
            <div
              className="py-2 px-4 hover:bg-zinc-100 duration-300 flex items-center justify-between cursor-pointer text-zinc-600"
              key={index}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="ml-1">{item.label}</span>
              </div>
              <span>
                <NavigateNext />
              </span>
            </div>
          ))}
        </div>
        <div className="h-[1px] w-full bg-zinc-100"></div>
        <div className="p-4 duration-300 hover:text-red-600 flex items-center justify-between cursor-pointer text-zinc-600">
          <div className="flex items-center">
            <Logout />
            <span className="ml-1">退出登录</span>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
export const HeaderAction: FC = () => {
  const setShowLogin = useMusicStore(state => state.setShowLogin)
  const isShowLogin = useMusicStore(state => state.isShowLogin)
  const currentProfile = useMusicStore(state => state.userProfile)
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className={'relative'}>
      <Button
        className="flex items-center cursor-pointer"
        onClick={() => {
          if (!currentProfile) {
            setShowLogin(!isShowLogin)
          } else {
            setMenuOpen(!menuOpen)
          }
        }}
      >
        <Avatar className="w-8 h-8" src={currentProfile?.avatarUrl} />
        <span className="text-zinc-700 ml-2">{currentProfile?.nickname || '未登录'}</span>
      </Button>
      <UserMenu open={menuOpen} />
    </div>
  )
}
