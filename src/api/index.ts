import { fetch } from '@/service'

export const uploadFile = (data: any) => {
  const formData = new FormData()
  formData.append('file', data)
  return fetch.post('/utils/upload', formData)
}

export const loginApi = (data: { username: string; password: string }) => {
  return fetch.post('/user/login', data)
}
