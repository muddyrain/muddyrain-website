import { FC, useEffect } from 'react'
import styles from '@/styles/md/index.module.scss'
import '@/styles/md/index.scss'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import highlight from '@bytemd/plugin-highlight'
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import { Viewer as BytemdViewer, Editor as BytemdEditor } from '@bytemd/react'
import * as icons from '@icon-park/svg'
import zh from 'bytemd/locales/zh_Hans.json'
import { BytemdPlugin } from 'bytemd'
import themes from 'juejin-markdown-themes'
import { JUEJIN_MARKDOWN_THEME_ID } from '@/constant'
type onChangeThemeType = (theme: string) => void
const changeTheme = (themeKey: string, onChangeTheme: onChangeThemeType) => {
  const theme = themes[themeKey]
  const targetIdStyle = document.getElementById(JUEJIN_MARKDOWN_THEME_ID)
  onChangeTheme?.(themeKey)
  if (targetIdStyle) {
    targetIdStyle.innerHTML = theme.style
    return
  }
  const style = document.createElement('style')
  style.id = JUEJIN_MARKDOWN_THEME_ID
  style.innerHTML = theme.style
  document.head.appendChild(style)
}
const themePlugins = (onChangeTheme: onChangeThemeType): BytemdPlugin => {
  return {
    actions: [
      {
        title: '主题',
        icon: icons.Theme({ theme: 'outline' }),
        position: 'right',
        handler: {
          type: 'dropdown',
          actions: Array.from({ length: Object.keys(themes).length }, (_, i) => {
            return {
              title: Object.keys(themes)[i],
              handler: {
                type: 'action',
                click: editor => {
                  changeTheme(Object.keys(themes)[i], onChangeTheme)
                },
              },
            }
          }),
        },
      },
    ],
  }
}

export const Editor: FC<{
  value: string
  onChange: (value: string) => void
  onChangeTheme: (value: string) => void
}> = ({ value, onChange, onChangeTheme }) => {
  useEffect(() => {
    changeTheme('juejin', onChangeTheme)
  }, [])
  return (
    <div className={`${styles.markdown_container}`}>
      <BytemdEditor
        locale={zh}
        onChange={onChange}
        placeholder="开始写作..."
        plugins={[
          gfm({
            locale: {
              table: '表格',
              task: '任务',
              strike: '删除线',
            },
          }),
          mediumZoom(),
          highlight(),
          frontmatter(),
          themePlugins(onChangeTheme),
        ]}
        value={value}
      />
    </div>
  )
}
