import { fetch } from '@/service'

/**
 * 分页查询参数类型
 */
export interface PagerQueryParams {
  page: number
  pageSize: number
}

export const uploadFile = (data: any) => {
  const formData = new FormData()
  formData.append('file', data)
  return fetch.post('/utils/upload', formData)
}
export const removeUploadFileApi = (name: string) => {
  return fetch.delete('/utils/upload/' + name)
}

export const loginApi = (data: { userName: string; password: string }) => {
  return fetch.post('/user/login', data)
}

export const registerApi = (data: { userName: string; password: string }) => {
  return fetch.post('/user/register', data)
}

export const getUsersListApi = (data: PagerQueryParams) => {
  return fetch.get('/user', { params: data })
}

export const createArticleApi = (data: unknown) => {
  return fetch.post(`/article`, data)
}

export const getArticleListApi = (data: unknown) => {
  return fetch.get(`/article`, { params: data })
}

export const getArticleByIdApi = (id: string) => {
  return fetch.get(`/article/` + id)
}

export const postArticleLikeApi = (id: string) => {
  return fetch.post(`/article/like/` + id)
}
