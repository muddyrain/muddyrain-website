'use client'
import { Editor } from '@/components'
import { useEffect, useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { CloudUpload as CloudUploadIcon, Add as AddIcon, Close } from '@mui/icons-material'
import styles from './new.module.scss'
import LoadingButton from '@mui/lab/LoadingButton'
import Image from 'next/image'
import { createArticleApi, removeUploadFileApi, uploadFile } from '@/api'
import { useMessage } from '@/hooks/useMessage'
import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/router'
import { ArticleTagOptions } from '@/constant'
export default function Page() {
  const [titleError, setTitleError] = useState(false)
  const [visible, setVisible] = useState(false)
  type FormDataType = {
    title: string
    content: string
    tag: number
    cover: string
    theme: string
  }
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    content: '',
    tag: 0,
    cover: '',
    theme: 'juejin',
  })
  const router = useRouter()
  const accountInfo = useUserStore(state => state.accountInfo)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [categories, setCategories] = useState<
    {
      label: string
      value: number
    }[]
  >([])
  const changeFormData = (_formData: Partial<FormDataType>) => {
    setFormData({
      ...formData,
      ..._formData,
    })
  }
  const message = useMessage()
  useEffect(() => {
    setCategories(ArticleTagOptions)
  }, [])
  const [cover, setCover] = useState<{
    base64: string
    file: File | null
    url: string
    objectName: string
  }>({
    base64: '',
    file: null,
    url: '',
    objectName: '',
  })
  // 上传封面
  const handleUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = e => {
      setUploadLoading(true)
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        uploadFile(file)
          .then(res => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
              setCover({
                ...cover,
                base64: reader.result as string,
                file,
                url: res.url,
                objectName: res.objectName,
              })
            }
          })
          .catch(() => {
            message.showMessage('上传失败', {
              type: 'error',
            })
          })
          .finally(() => {
            setUploadLoading(false)
          })
      }
    }
    input.click()
  }
  const removeUploadFile = () => {
    removeUploadFileApi(cover.objectName)
      .then(() => {
        setCover({
          base64: '',
          file: null,
          url: '',
          objectName: '',
        })
      })
      .catch(() => {
        message.showMessage('删除失败', {
          type: 'error',
        })
      })
  }
  const handleSubmit = () => {
    if (formData.title.length === 0 || formData.content.length === 0) {
      message.showMessage('标题或内容不能为空', {
        type: 'info',
      })
      return
    }
    createArticleApi({ ...formData, user: accountInfo?.id, cover: cover.url }).then(res => {
      message.showMessage('发布成功', {
        type: 'success',
      })
      // 跳转到文章详情页
      router.push(`/articles/${res.id}`)
    })
  }
  return (
    <div
      className={`w-full relative overflow-hidden min-w-[860px] mx-auto my-4 p-4 rounded-lg bg-white ${styles.new_container}`}
    >
      <Stack className="mb-2 relative z-10" spacing={1} direction="row">
        <TextField
          error={titleError}
          color="primary"
          fullWidth
          onChange={e => {
            setTitleError(e.target.value.length === 0)
            changeFormData({
              title: e.target.value,
            })
          }}
          value={formData.title}
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
                        color={formData.tag === item.value ? 'primary' : 'secondary'}
                        variant="outlined"
                        onClick={() => {
                          changeFormData({
                            tag: item.value,
                          })
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
                  {/* <span className="text-red-500 mr-1">*</span> */}
                  <span>文章封面：</span>
                </div>
                <div className="ml-2 flex-1">
                  <div className="w-48 flex justify-center items-center border-dashed border border-zinc-400 rounded-md relative">
                    {cover?.file ? (
                      <>
                        <Image
                          src={cover.url || cover.base64}
                          alt="cover"
                          width={0}
                          height={0}
                          className="w-full h-auto min-h-[50px]"
                        />
                        <div
                          className="absolute bg-zinc-50 cursor-pointer w-6 h-6 flex justify-center items-center rounded-b-sm hover:bg-zinc-100 right-0 top-0 p-1"
                          onClick={() => {
                            removeUploadFile()
                          }}
                        >
                          <Close className="text-sm" />
                        </div>
                      </>
                    ) : (
                      <LoadingButton
                        loading={uploadLoading}
                        className="w-full h-32 border-none hover:border-none"
                        variant="outlined"
                        onClick={() => {
                          handleUpload()
                        }}
                      >
                        <div className="flex flex-col justify-center items-center">
                          <AddIcon />
                          <span>上传封面</span>
                        </div>
                      </LoadingButton>
                    )}
                  </div>
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
              <Button size="small" variant="outlined" onClick={handleSubmit}>
                确定并发布
              </Button>
            </Stack>
          </div>
        </div>
      </Stack>
      <Editor
        value={formData.content}
        onChangeTheme={e => {
          changeFormData({
            theme: e,
          })
        }}
        onChange={e => {
          changeFormData({
            content: e,
          })
        }}
      />
      <div className={`${styles.watermark}`}>{formData.theme}</div>
    </div>
  )
}
