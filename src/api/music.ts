import { fetchMusic } from '@/service'

export const getBannerApi = async () => fetchMusic.get('/banner')
