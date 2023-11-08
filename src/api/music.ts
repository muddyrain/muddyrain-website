import { fetchMusic } from '@/service'

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
