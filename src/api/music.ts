import { fetchMusic } from '@/service'
import { SongListItem, SongsItem } from '@/views/music/types'

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
export const getPersonalizedNewSongApi = async (): Promise<SongListItem> =>
  fetchMusic.get('/personalized/newsong')
/**
 * 获取歌曲详情
 */
export const getSongDetailApi = async (ids: string | number): Promise<SongsItem> =>
  fetchMusic.get('/song/detail?ids=' + ids)
/**
 * 获取音乐 url
 */
export const getSongUrlApi = async (id: string | number) => fetchMusic.get('/song/url?id=' + id)
