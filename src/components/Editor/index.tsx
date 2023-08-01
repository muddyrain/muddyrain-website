import { FC } from 'react'
import styles from '@/styles/md/index.module.scss'
import '@/styles/md/index.scss'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import highlight from '@bytemd/plugin-highlight'
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import { Viewer as BytemdViewer, Editor as BytemdEditor } from '@bytemd/react'

import zh from 'bytemd/locales/zh_Hans.json'

export const Editor: FC<{
  value: string
  onChange: (value: string) => void
}> = ({ value, onChange }) => {
  return (
    <div className={`${styles.markdown_container}`}>
      <BytemdEditor
        locale={zh}
        onChange={onChange}
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
        ]}
        value={value}
      />
    </div>
  )
}
