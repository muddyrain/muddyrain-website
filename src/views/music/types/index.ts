/**
 * 音乐人类型
 */
export interface ArtistsType {
  id: number
  name: string
}

/**
 * 歌曲类型
 */
export interface SongsItem {
  id: number
  name: string
  picUrl: string
  song: {
    artists: ArtistsType[]
    privilege: {
      maxBrLevel: string
    }
    duration: number
  }
  type?: string
  url?: string
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
