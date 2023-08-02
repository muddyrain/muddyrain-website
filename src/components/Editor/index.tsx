import { FC, useEffect, useState } from 'react'
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
import { Button, Stack, TextField } from '@mui/material'
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material'
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
}> = ({ value, onChange, onChangeTheme: _onChangeTheme }) => {
  const onChangeTheme = (theme: string) => {
    _onChangeTheme(theme)
    const themeText = `---\ntheme: ${theme}\n---\n`
    if (value.includes('---\ntheme:')) {
      const reg = /---\ntheme:.*\n---\n/
      onChange(value.replace(reg, themeText))
      return
    }
    onChange(themeText + '\n' + value)
  }
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  useEffect(() => {
    changeTheme('juejin', onChangeTheme)
  }, [])
  return (
    <div className={`${styles.markdown_container}`}>
      <Stack className="mb-2" spacing={1} direction="row">
        <TextField
          error={titleError}
          color="primary"
          fullWidth
          onChange={e => {
            setTitleError(e.target.value.length === 0)
            setTitle(e.target.value)
          }}
          value={title}
          label="好文标题"
          size="small"
        />
        <Button className="w-24" variant="outlined" startIcon={<CloudUploadIcon />}>
          发布
        </Button>
      </Stack>
      <BytemdEditor
        locale={zh}
        onChange={value => {
          const reg = /---\ntheme:.*\n---\n/
          // 获取匹配到的字符串
          const matchStr = value.match(reg)
          if (matchStr) {
            const themeName = matchStr[0]?.split('---\ntheme:')?.[1]?.split('\n---\n')?.[0].trim()
            if (Object.keys(themes).includes(themeName)) {
              changeTheme(themeName, onChangeTheme)
            }
          }
          onChange(value)
        }}
        uploadImages={file => {
          console.log(file)
          return new Promise(resolve => {})
        }}
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
