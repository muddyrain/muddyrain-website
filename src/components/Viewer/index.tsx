import { FC } from 'react'
import styles from '@/styles/md/index.module.scss'
import '@/styles/md/index.scss'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import highlight from '@bytemd/plugin-highlight'
import frontmatter from '@bytemd/plugin-frontmatter'
import { Viewer as BytemdViewer } from '@bytemd/react'
import themes from 'juejin-markdown-themes'
import { THEME_TYPES } from '@/types'
export const Viewer: FC<{
  value: string
  theme?: THEME_TYPES
}> = ({ value, theme = 'juejin' }) => {
  return (
    <div className={`${styles.markdown_container}  `}>
      <style dangerouslySetInnerHTML={{ __html: themes[theme].style }} />
      <BytemdViewer plugins={[mediumZoom(), highlight({}), frontmatter()]} value={value} />
    </div>
  )
}
