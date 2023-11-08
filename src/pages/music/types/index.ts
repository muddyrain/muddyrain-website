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
  name: string
  picUrl: string
  song: {
    artists: ArtistsType[]
    privilege: {
      maxBrLevel: string
    }
  }
}

/**
 * 歌单类型
 */
export interface SongListItem {
  name: string
  picUrl: string
  playCount: number
}
