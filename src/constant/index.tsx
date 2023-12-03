import CodeIcon from '@mui/icons-material/Code'
import TerminalIcon from '@mui/icons-material/Terminal'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import StorageIcon from '@mui/icons-material/Storage'
import LanguageIcon from '@mui/icons-material/Language'
import FaceIcon from '@mui/icons-material/Face'
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'

/**
 * @file 全局常量
 */
/**
 * 项目名称
 */
export const PROJECT_NAME = '前端视窗'
/**
 * 掘金主题ID
 */
export const JUEJIN_MARKDOWN_THEME_ID = 'juejin-markdown-theme'

/**
 * 请求地址
 */

export const REQUEST_URL = process.env['NEXT_PUBLIC_BASE_URL'] as string
/**
 * socket请求地址
 */

export const SOCKET_URL = process.env['NEXT_PUBLIC_SOCKET_URL'] as string
/**
 * socket请求地址
 */

export const MUSIC_URL = process.env['NEXT_PUBLIC_MUSIC_URL'] as string

/**
 * 文章标签配置项
 */
export const ArticleTagOptions = [
  { label: '前端', value: 0, icon: CodeIcon },
  { label: '后端', value: 1, icon: TerminalIcon },
  { label: '移动端', value: 2, icon: SmartphoneIcon },
  { label: '数据库', value: 3, icon: StorageIcon },
  { label: '服务器', value: 4, icon: LanguageIcon },
  { label: '人工智能', value: 5, icon: FaceIcon },
  { label: '开发工具', value: 6, icon: DeveloperBoardIcon },
  { label: '代码人生', value: 7, icon: IntegrationInstructionsIcon },
]
