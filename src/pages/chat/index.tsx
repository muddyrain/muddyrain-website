import { Layout } from '@/Layout'
import { ScrollView } from '@/components'
import { useChatStore } from '@/store/useChatStore'
import { ClearOutlined, Search } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import { useEffect, useLayoutEffect, useState } from 'react'

export default function Page() {
  const [isShow, setIsShow] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [currentActiveId, setCurrentActiveId] = useChatStore(state => [
    state.currentActiveId,
    state.setCurrentActiveId,
  ])
  useLayoutEffect(() => {
    setTimeout(() => {
      setIsShow(true)
    }, 250)
  }, [])
  return (
    <Layout>
      <div
        className={`duration-500 w-3/4 mx-auto h-3/4 top-1/2 left-1/2 absolute translate-x-[-50%] translate-y-[-50%] flex ${
          isShow ? 'scale-100' : 'scale-0'
        }`}
      >
        <div className="w-[20%] h-full bg-white flex flex-shrink-0 flex-col">
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
                    className={`h-20 flex items-center p-3 border-0 border-b border-solid border-zinc-200 last:border-b-0 cursor-pointer duration-300 ${
                      currentActiveId === index ? 'bg-zinc-100' : 'bg-white'
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
                          <span className="mr-2">Jennifer Fritz</span>
                          <span>3:15 PM</span>
                        </div>
                        <span className="truncate mt-2">
                          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa cupiditate
                          incidunt dicta aliquam inventore placeat iusto pariatur saepe nam,
                          possimus similique sequi sed odio, quidem omnis nobis eos neque eligendi.
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollView>
          </div>
        </div>
        <div className="flex-1 ml-4 bg-white"></div>
      </div>
    </Layout>
  )
}
