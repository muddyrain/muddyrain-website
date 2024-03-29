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

export enum RecentActivityTypeEnum {
  // 注册
  register = 0,
  // 登录
  login = 1,
  // 发布文章
  publishArticle = 2,
}

export interface CommonType {
  formatted_create_time: string
  formatted_update_time: string
}

/**
 * 信息类型
 */
export interface ChatType extends CommonType {
  id?: string
  sender_id: string
  receiver_id: string
  content: string

  [key: string]: any
}

/**
 * 用户类型
 */
export interface UserType extends CommonType {
  userName: string
  nickName: string
  password: string
  token: string
  description: string
  avatar: string
  birthday: string
  gender: number | string
  email: string
  mobile: number | string
  id: number | string
}

/**
 * 活动类型
 */
export interface RecentActivityType extends CommonType {
  id: number | string
  content: string
  user: UserType
  type: RecentActivityTypeEnum

  [key: string]: any
}

/**
 * 文章类型
 */
export interface ArticleType extends CommonType {
  title: string
  theme: string
  content: string
  tag: ArticleTag
  cover: string
  id: number | string
  user: UserType
  preview: number
  like: number
  commentCount: number
  isLike: boolean
  isComment: boolean

  [key: string]: any
}

/**
 * 评论类型
 */
export interface CommentType extends CommonType {
  id: number | string
  content: string
  article: ArticleType
  user: UserType
  reply_id: number | string
  reply_to_reply_id: number | string
  replyToReply?: CommentType
  children: CommentType[]

  [key: string]: any
}

/**
 * 文章标签
 */
export enum ArticleTag {
  '前端',
  '后端',
  '移动端',
  '数据库',
  '服务器',
  '人工智能',
  '开发工具',
  '代码人生',
}

/**
 * 响应数据类型
 */
export interface ResponseDataType<T = any> {
  data: T
  isFormate: boolean
  page: number
  pageSize: number
  total: number
}

/**
 * src 类型
 */
export interface srcType {
  landscape: string
  large: string
  large2x: string
  medium: string
  original: string
  portrait: string
  small: string
  tiny: string

  [key: string]: string
}

/**
 * RGB 颜色类型
 */
export type RGBColor = [number, number, number]
