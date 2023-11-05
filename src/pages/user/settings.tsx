'use client'
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function Page() {
  const [selectedDate, handleDateChange] = useState(new Date())
  return (
    <div className="w-container rounded-sm bg-white mx-auto border my-4 border-solid border-zinc-200">
      <div className="p-4">
        <p>个人资料</p>
      </div>
      <Divider />
      <div className="p-4">
        <p>基本信息</p>
        <Stack direction={'row'} spacing={2}>
          <form
            className="mt-4 w-2/3"
            onSubmit={e => {
              e.preventDefault()
            }}
          >
            <Stack spacing={2}>
              <TextField name="nickName" size="small" label="昵称" fullWidth />
              <TextField name="address" size="small" label="地址" fullWidth />
              <span>11</span>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
                <DatePicker format="YYYY-MM-DD" label="生日" />
              </LocalizationProvider>
              <FormControl>
                <FormLabel>性别</FormLabel>
                <RadioGroup row defaultValue="female" name="gender">
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Stack>
          </form>
          <Stack
            flex={1}
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            spacing={1}
          >
            <Avatar className="w-24 h-24" />
            <Button variant="text" size="small">
              上传头像
            </Button>
            <Typography variant="body2" color="grey">
              格式: 支持JPG、PNG、JPEG 大小: 5M以内
            </Typography>
          </Stack>
        </Stack>
      </div>
    </div>
  )
}
