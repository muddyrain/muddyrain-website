'use client'
import {
  Avatar,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useEffect, useRef, useState } from 'react'
import { UserType } from '@/types'
import { getUserByIdApi, updateUserApi, uploadFile } from '@/api'
import dayjs, { Dayjs } from 'dayjs'
import { useUserStore } from '@/store/useUserStore'
import { LoadingBox } from '@/components/LoadingBox'
import { useMessage } from '@/hooks/useMessage'
import { useRouter } from 'next/navigation'

const defaultBirthday = dayjs().subtract(18, 'year')
export default function Page() {
  type FormDataType = Partial<Omit<UserType, 'birthday'> & { birthday: Dayjs }>
  const [formData, setFormData] = useState<FormDataType>({
    gender: 2,
    birthday: defaultBirthday,
    nickName: '',
    email: '',
    avatar: '',
  })
  const [loading, setLoading] = useState(false)
  const accountInfo = useUserStore(state => state.accountInfo)
  const getInfo = () => {
    if (!accountInfo?.id) return
    setLoading(true)
    getUserByIdApi(accountInfo?.id)
      .then(res => {
        delete res.password
        onChange({
          ...res,
          avatar: res.avatar || '',
          nikeName: res.nikeName || '',
          email: res.email || '',
          birthday: res.birthday ? dayjs(res.birthday) : defaultBirthday,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const message = useMessage()
  const onChange = (_formData: FormDataType) => {
    setFormData(old => ({
      ...old,
      ..._formData,
    }))
  }
  const inputFileRef = useRef<HTMLInputElement>(null)
  const handleUpload = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
      inputFileRef.current.onchange = e => {
        const files = (e.target as HTMLInputElement).files
        if (files && files.length > 0) {
          const file = files[0]
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            const result = reader.result as string
            onChange({
              avatar: result,
            })
            uploadFile(file).then(res => {
              onChange({
                avatar: res.url,
              })
            })
          }
        }
      }
    }
  }
  const handleSubmit = () => {
    if (!accountInfo?.id) return
    updateUserApi(accountInfo?.id, {
      ...formData,
      birthday: formData.birthday?.format('YYYY-MM-DD') || '',
    }).then(() => {
      message.showMessage('修改成功', 'success')
      router.back()
    })
  }
  const router = useRouter()
  useEffect(() => {
    if (accountInfo?.id) {
      getInfo()
    } else {
      router.push('/')
    }
  }, [accountInfo])
  return (
    <div className="w-container rounded-sm bg-white mx-auto border my-4 border-solid border-zinc-200">
      <div className="p-4">
        <p>个人资料</p>
      </div>
      <Divider />
      <div className="p-4">
        <p>基本信息</p>
        <LoadingBox loading={loading}>
          <Stack direction={'row'} spacing={2}>
            <form
              className="mt-4 w-2/3"
              onSubmit={e => {
                e.preventDefault()
              }}
            >
              <Stack spacing={2}>
                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                  <div className="w-24 text-right flex-shrink-0">
                    <span className="text-red-500 mr-1">*</span>
                    <span>昵称</span>
                  </div>
                  <TextField
                    name="nickName"
                    value={formData.nickName}
                    onChange={e => {
                      onChange({
                        nickName: e.target.value,
                      })
                    }}
                    label="昵称"
                    placeholder="请输入昵称"
                    fullWidth
                  />
                </Stack>
                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                  <div className="w-24 text-right flex-shrink-0">
                    <span>邮箱地址</span>
                  </div>
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={e => {
                      onChange({
                        email: e.target.value,
                      })
                    }}
                    label="邮箱地址"
                    placeholder="请输入邮箱地址"
                    fullWidth
                  />
                </Stack>
                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                  <div className="w-24 text-right flex-shrink-0">
                    <span>手机号码</span>
                  </div>
                  <TextField
                    name="email"
                    type="number"
                    value={formData.mobile}
                    onChange={e => {
                      onChange({
                        mobile: e.target.value || '',
                      })
                    }}
                    label="手机号码"
                    placeholder="请输入手机号码"
                    fullWidth
                  />
                </Stack>
                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                  <div className="w-24 text-right flex-shrink-0">
                    <span>生日</span>
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="flex-1 "
                      format="YYYY-MM-DD"
                      label="生日"
                      value={formData.birthday}
                      onChange={e => {
                        if (e) {
                          onChange({
                            birthday: e as Dayjs,
                          })
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Stack>
                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                  <div className="w-24 text-right flex-shrink-0">
                    <span>性别</span>
                  </div>
                  <RadioGroup
                    row
                    defaultValue="female"
                    name="gender"
                    value={formData.gender}
                    onChange={e => {
                      onChange({
                        gender: e.target.value,
                      })
                    }}
                  >
                    <FormControlLabel value={0} control={<Radio />} label="男" />
                    <FormControlLabel value={1} control={<Radio />} label="女" />
                    <FormControlLabel value={2} control={<Radio />} label="保密" />
                  </RadioGroup>
                </Stack>
              </Stack>
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleSubmit()
                  }}
                >
                  保存并修改
                </Button>
              </div>
            </form>
            <Stack
              flex={1}
              direction={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              spacing={1}
            >
              <div
                className="cursor-pointer"
                onClick={() => {
                  handleUpload()
                }}
              >
                <Avatar className="w-24 h-24" src={formData.avatar} />
              </div>
              <Button
                variant="text"
                size="small"
                onClick={() => {
                  handleUpload()
                }}
              >
                上传头像
              </Button>
              <Typography variant="body2" color="grey">
                格式: 支持JPG、PNG、JPEG 大小: 5M以内
              </Typography>
              <input
                className="hidden"
                type="file"
                ref={inputFileRef}
                max={1}
                accept=".jpg,.png,.jpeg"
              />
            </Stack>
          </Stack>
        </LoadingBox>
      </div>
    </div>
  )
}
