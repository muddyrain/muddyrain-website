import { Layout } from '@/Layout'
import { ScrollView } from '@/components'
import { LAYOUT_SCROLLBAR_CLASSES } from '@/constant/classes'
import { useChatStore } from '@/store/useChatStore'
import { ClearOutlined, Search, Settings } from '@mui/icons-material'
import { Avatar, Button, IconButton, Stack } from '@mui/material'
import { OverlayScrollbarsComponentRef } from 'overlayscrollbars-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export default function Page() {
  const [isShow, setIsShow] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [messageValue, setMessageValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const [currentActiveId, setCurrentActiveId] = useChatStore(state => [
    state.currentActiveId,
    state.setCurrentActiveId,
  ])
  const [messageList, setMessageList] = useState([
    {
      content: '你好',
      isOwn: true,
      id: 1,
      time: '13:10',
    },
    {
      content: '我是机器人小A，有什么可以帮您的吗？',
      isOwn: false,
      id: 2,
      time: '13:11',
    },
    {
      content: '请问你会做 UI 设计吗？',
      isOwn: true,
      id: 3,
      time: '13:12',
    },
    {
      content: '会的，您需要什么样式的气泡框？',
      isOwn: false,
      id: 4,
      time: '13:13',
    },
  ])
  const handleSendMessage = () => {
    if (!messageValue) {
      return
    }
    setMessageValue('')
    textareaRef.current?.focus()
    setMessageList(prev => {
      return [
        ...prev,
        {
          content: messageValue,
          isOwn: Math.random() > 0.5,
          id: prev.length + 1,
          time: '13:14',
        },
      ]
    })
  }
  useEffect(() => {
    // 在组件更新后滚动到底部
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messageList])
  useLayoutEffect(() => {
    setTimeout(() => {
      setIsShow(true)
      textareaRef.current?.focus()
    }, 250)
  }, [])
  return (
    <Layout>
      <div
        className={`duration-500 min-w-[650px] w-3/4 mx-auto h-3/4 top-1/2 left-1/2 absolute translate-x-[-50%] translate-y-[-55%] flex ${
          isShow ? 'scale-100' : 'scale-0'
        }`}
      >
        <div className="w-[250px] h-full bg-white flex flex-shrink-0 flex-col">
          {/* 搜索框 */}
          <div className="h-14 bg-zinc-50 shadow-sm relative flex items-center px-4 flex-shrink-0">
            <Search className="absolute" />
            <input
              type="text"
              value={searchValue}
              placeholder="搜索"
              onChange={e => {
                setSearchValue(e.target.value)
              }}
              className="pl-8 pr-4 border-0 text-lg bg-transparent w-full h-full outline-none"
            />
            {searchValue && (
              <IconButton
                onClick={() => {
                  setSearchValue('')
                }}
              >
                <ClearOutlined
                  className={`border border-solid rounded-full cursor-pointer text-xl`}
                />
              </IconButton>
            )}
          </div>
          {/* 信息列表 */}
          <div className="flex-1 flex flex-col overflow-hidden relative ">
            <ScrollView>
              <div className="w-full h-full">
                {Array.from({ length: 100 }).map((item, index) => (
                  <div
                    className={`h-20 flex items-center pr-4 px-3 pl-3 border-0 border-b border-solid border-zinc-200 last:border-b-0 cursor-pointer duration-300 ${
                      currentActiveId === index ? 'bg-zinc-100 ' : 'bg-white'
                    }`}
                    onClick={() => {
                      setCurrentActiveId(index)
                    }}
                    key={index}
                  >
                    <Avatar className="mr-2" />
                    <div className="flex-1 overflow-hidden">
                      <div className="flex flex-col w-full h-full">
                        <div className="flex justify-between">
                          <span className="mr-2">琚天雷</span>
                          <span>3:15</span>
                        </div>
                        <span className="truncate mt-2">哈喽，你好吗？</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollView>
          </div>
        </div>
        {/* 主体信息 */}
        <div className="flex-1 flex flex-col ml-4 bg-white">
          <div className="h-24 px-8 border-0 border-b border-zinc-200 border-solid flex items-center">
            {/* 人物信息 */}
            <div className="flex items-center">
              <div className="relative w-12 h-12">
                <Avatar className="w-full h-full" />
                <div className="w-4 h-4 border-2 border-solid border-white bg-green-400 absolute right-0 top-0 rounded-full" />
              </div>
              <div className="flex flex-col ml-2">
                <div>琚天雷</div>
                <div className="text-sm">在线</div>
              </div>
            </div>
            {/* 操作 */}
            <div className="flex-1 flex justify-end">
              <IconButton>
                <Settings />
              </IconButton>
            </div>
          </div>
          {/* 聊天记录 */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* 自动滚动到最底部 */}
            <div
              ref={messageContainerRef}
              className={`w-full h-full flex flex-col p-4 pr-6 overflow-y-scroll ${LAYOUT_SCROLLBAR_CLASSES}`}
            >
              {messageList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`w-full flex mb-6 relative ${
                      item.isOwn ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[55%] gap-x-4 flex items-start ${
                        item.isOwn ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <Avatar />
                      <div className={`bg-blue-100 flex-1 p-3 relative rounded-md`}>
                        {/* 气泡内容 */}
                        <div className="whitespace-pre-line">{item.content}</div>
                        {/* 气泡角标 */}
                        <div
                          className={`absolute top-4 ${
                            item.isOwn
                              ? 'right-[-10px] border-r-0 border-l-blue-100'
                              : 'left-[-10px] border-l-0 border-r-blue-100'
                          } border-[10px]  border-solid border-t-transparent border-b-transparent `}
                        />
                      </div>
                      <span>3:21</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          {/* 输入框 */}
          <div className="h-36 pt-4 pb-2 px-4 border-0 border-t border-zinc-200 border-solid flex flex-col">
            <textarea
              placeholder="请输入内容"
              value={messageValue}
              ref={textareaRef}
              onChange={e => {
                setMessageValue(e.target.value)
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className={`flex-1 whitespace-pre-line w-full outline-none border-0 text-lg resize-none ${LAYOUT_SCROLLBAR_CLASSES}`}
            />
            <div className="flex justify-end mt-2">
              <Button
                className="px-6"
                size="small"
                variant="outlined"
                onClick={() => {
                  handleSendMessage()
                }}
              >
                发送
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
