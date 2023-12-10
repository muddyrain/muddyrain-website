import { FC, memo, useEffect, useState } from 'react'
import styles from '@/styles/md/index.module.scss'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import highlight from '@bytemd/plugin-highlight'
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import { Editor as BytemdEditor } from '@bytemd/react'
import * as icons from '@icon-park/svg'
import zh from 'bytemd/locales/zh_Hans.json'
import { BytemdPlugin } from 'bytemd'
import themes from 'juejin-markdown-themes'
import { JUEJIN_MARKDOWN_THEME_ID } from '@/constant'
import { uploadFile } from '@/api'
import { Loading } from '../Loading'
import { throttle } from '@/utils'
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
                click: () => {
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

const MEditor: FC<{
  value: string
  onChange: (value: string) => void
  onChangeTheme?: (value: string) => void
}> = ({ value, onChange, onChangeTheme: _onChangeTheme }) => {
  const [loading, setLoading] = useState(false)
  const onChangeTheme = (theme: string) => {
    _onChangeTheme?.(theme)
  }
  const handleChange = (value: string) => {
    onChange(value)
  }
  const formatContent = (markdownString: string): Promise<string> => {
    return new Promise(resolve => {
      // 使用正则表达式替换将每个图片标签替换为带有 <p> 包裹的形式
      markdownString = markdownString.replace(/<img(.*?)>/g, '<p><img$1></p>')
      // 使用正则表达式替换将每个图片标记替换为带有 <p> 包裹的形式
      markdownString = markdownString.replace(
        /!\[(.*?)\]\((.*?)\)/g,
        '<p><img alt="$1" src="$2"></p>'
      )
      resolve(markdownString)
    })
  }
  useEffect(() => {}, [])
  useEffect(() => {
    changeTheme('juejin', onChangeTheme)
  }, [])
  const handlePaste = throttle((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    // 获取粘贴的内容
    const clipboardData = e.clipboardData
    const pastedContent = clipboardData?.getData('text/plain')
    setLoading(true)
    formatContent((value + pastedContent) as string)
      .then(markdownString => {
        handleChange(markdownString)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 150)
      })
  }, 300)
  return (
    <div className={`${styles.markdown_container} relative`} onPaste={handlePaste}>
      {loading && (
        <div
          className={`absolute top-0 left-0 w-full h-full bg-white z-50 flex justify-center items-center duration-300`}
        >
          <div className="flex flex-col justify-center items-center">
            <Loading />
            <div>正在解析...</div>
          </div>
        </div>
      )}
      <BytemdEditor
        locale={zh}
        onChange={value => {
          handleChange(value)
        }}
        uploadImages={files => {
          const promiseList: Promise<any>[] = []
          return new Promise(resolve => {
            const imageList: { alt: string; title: string; url: string }[] = []
            for (const file of files) {
              promiseList.push(
                uploadFile(file).then(res => {
                  imageList.push({
                    url: res.url as string,
                    alt: file.name,
                    title: file.name,
                  })
                })
              )
            }
            Promise.all(promiseList).then(() => {
              resolve(imageList)
            })
          })
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

export const Editor = memo(MEditor)
Editor.displayName = 'Editor'
