/**
 * 音乐人类型
 */
export interface ArtistsType {
  id: number
  name: string
}
/**
 * 专辑类型
 */
export interface AlbumType {
  id: number
  name: string
  picUrl: string
}

/**
 * 新歌曲推荐歌曲类型
 */
export interface newSongsItem {
  id: number
  name: string
  picUrl: string
  type?: string
  url?: string
  song: SongsItem
}

/**
 * 歌曲类型
 */
export interface SongsItem {
  id: number
  name: string
  picUrl: string
  duration: number
  dt: number
  privilege: {
    maxBrLevel: string
  }
  ar: ArtistsType[]
  artists: ArtistsType[]
  al: AlbumType
  url: string
}

/**
 * 歌单类型
 */
export interface SongListItem {
  name: string
  picUrl: string
  playCount: number
}

/**
 * 用户信息类型
 */
export interface UserInfoType {
  avatarUrl: string
  nickname: string
  userId: number
}
