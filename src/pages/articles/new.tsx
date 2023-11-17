'use client'
import { Editor } from '@/components'
import { useEffect, useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { CloudUpload as CloudUploadIcon, Add as AddIcon } from '@mui/icons-material'
import styles from './new.module.scss'
export default function Page() {
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [content, setContent] = useState<string>('')
  const [visible, setVisible] = useState(false)
  const [categories, setCategories] = useState<{ label: string }[]>([])
  const [currentCategory, setCurrentCategory] = useState('')
  useEffect(() => {
    setCategories([
      {
        label: '前端',
      },
      {
        label: '后端',
      },
    ])
  }, [])
  return (
    <div
      className={`w-full min-w-[860px] mx-auto my-4 p-4 rounded-lg bg-white ${styles.new_container}`}
    >
      <Stack className="mb-2" spacing={1} direction="row">
        <TextField
          error={titleError}
          color="primary"
          fullWidth
          onChange={e => {
            setTitleError(e.target.value.length === 0)
            setTitle(e.target.value)
          }}
          value={title}
          label="好文标题"
          size="small"
        />
        <div className="relative">
          <Button
            className="w-24 h-[40px]"
            startIcon={<CloudUploadIcon />}
            variant="outlined"
            onClick={e => {
              e.stopPropagation()
              setVisible(!visible)
            }}
          >
            <span>发布</span>
          </Button>
          <div
            className={`absolute top-[110%] z-10 w-4 h-4 border-solid border-r-0 border-b-0 border-t border-l rotate-45 border-zinc-200 bg-white duration-300 ${
              visible ? 'scale-100' : 'scale-0'
            }`}
          ></div>
          <div
            className={`absolute w-[480px] origin-top flex flex-col duration-300 bg-white border-solid border-zinc-200 rounded-lg top-[130%] overflow-hidden right-[-20%] ${
              visible ? 'border scale-y-100' : 'scale-y-0 border-0'
            }`}
          >
            <div className="p-4 border-0 border-b border-zinc-200 border-solid">
              <span className="text-primary">发布文章</span>
            </div>
            <div className="flex-1 p-4">
              <div className="mb-4 flex">
                <div className="w-24 text-right">
                  <span className="text-red-500 mr-1">*</span>
                  <span>分类：</span>
                </div>
                <div className="ml-2 flex-1 flex flex-wrap">
                  {categories.map((item, index) => {
                    return (
                      <Button
                        key={index}
                        className="mr-2 mb-2"
                        size="small"
                        color={currentCategory === item.label ? 'primary' : 'secondary'}
                        variant="outlined"
                        onClick={() => {
                          setCurrentCategory(item.label)
                        }}
                      >
                        {item.label}
                      </Button>
                    )
                  })}
                </div>
              </div>
              <div className="mb-2 flex">
                <div className="w-24 text-right">
                  <span className="text-red-500 mr-1">*</span>
                  <span>文章封面：</span>
                </div>
                <div className="ml-2 flex-1">
                  <Button
                    className="w-48 h-32 border-dashed hover:border-dashed"
                    variant="outlined"
                  >
                    <div className="flex flex-col justify-center items-center">
                      <AddIcon />
                      <span>上传封面</span>
                    </div>
                  </Button>
                  <div className="text-sm text-zinc-400 mt-2">
                    建议尺寸：6:4 (封面仅展示在首页信息流中)
                  </div>
                </div>
              </div>
            </div>
            <Stack
              direction={'row'}
              spacing={1}
              justifyContent={'flex-end'}
              className="p-4 border-0 border-t border-zinc-200 border-solid"
            >
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setVisible(!visible)
                }}
              >
                取消
              </Button>
              <Button size="small" variant="outlined">
                确定并发布
              </Button>
            </Stack>
          </div>
        </div>
      </Stack>
      <Editor
        value={content}
        onChange={e => {
          setContent(e)
        }}
      />
    </div>
  )
}
