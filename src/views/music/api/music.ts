import { fetchMusic } from '@/service'
import { SongsItem, newSongsItem } from '@/views/music/types'
import { useMusicStore } from '../store/useMusicStore'

const getCookie = () => {
  const cookie = useMusicStore.getState().cookie
  return cookie ? `${encodeURIComponent(cookie)}` : ''
}

/**
 * 获取轮播图
 */
export const getBannerApi = async () => fetchMusic.get('/banner')
/**
 * 获取推荐歌单
 * @param limit 取出数量 , 默认为 4 (不支持 offset)
 */
export const getPersonalizedApi = async (limit: number = 4) =>
  fetchMusic.get('/personalized?limit=' + limit)
/**
 * 获取推荐最新音乐
 */
export const getPersonalizedNewSongApi = async (): Promise<{ result: newSongsItem[] }> =>
  fetchMusic.get('/personalized/newsong')
/**
 * 获取歌曲详情
 */
export const getSongDetailApi = async (ids: string | number): Promise<{ songs: SongsItem[] }> =>
  fetchMusic.get('/song/detail?ids=' + ids)

/**
 * 获取音乐 url
 */
export const getSongUrlApi = async (id: string | number): Promise<{ data: { url: string }[] }> =>
  fetchMusic.get('/song/url?id=' + id)

/**
 * 发送验证码
 */
export const sendCaptchaApi = async (phone: string) =>
  fetchMusic.get('/captcha/sent?phone=' + phone)

/**
 * 手机号登录
 */
export const cellphoneLoginApi = async (phone: string, captcha: string) =>
  fetchMusic.get(`/login/cellphone?phone=${phone}&captcha=${captcha}`)

/**
 * 获取喜欢音乐列表
 */
export const getLikeListApi = async (uid: string | number) => {
  return fetchMusic.get(`/likelist?uid=${uid}&cookie=${getCookie()}`)
}
