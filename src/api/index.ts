import { fetch } from '@/service'

export const uploadFile = (data: any) => {
  console.log(data)
  const formData = new FormData()
  formData.append('file', data)
  return fetch.post('/utils/upload', formData)
}
