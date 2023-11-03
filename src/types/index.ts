export type THEME_TYPES =
  | 'juejin'
  | 'github'
  | 'smartblue'
  | 'cyanosis'
  | 'channing-cyan'
  | 'fancy'
  | 'hydrogen'
  | 'condensed-night-purple'
  | 'greenwillow'
  | 'v-green'
  | 'vue-pro'
  | 'healer-readable'
  | 'mk-cute'
  | 'jzman'
  | 'geek-black'
  | 'awesome-green'
  | 'qklhk-chocolate'
  | 'orange'
  | 'scrolls-light'
  | 'simplicity-green'
  | 'arknights'
  | 'vuepress'
  | 'Chinese-red'
  | 'nico'
  | 'devui-blue'
  | 'serene-rose'

export interface MessageType {
  type: 'chat' | 'event' | 'status'
  payload: any
}

/**
 * 信息类型
 */
export interface ChatType {
  id?: string
  sender_id: string
  receiver_id: string
  content: string
  formatted_create_time: string
  formatted_update_time: string
  [key: string]: any
}
/**
 * 用户类型
 */
export interface UserType {
  userName?: string
  password?: string
  token?: string
  id?: number | string
  [key: string]: any
}
