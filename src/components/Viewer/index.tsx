import { FC } from 'react'
import styles from '@/styles/md/index.module.scss'
import '@/styles/md/index.scss'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import highlight from '@bytemd/plugin-highlight'
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import { Viewer as BytemdViewer } from '@bytemd/react'

export const Viewer: FC<{
  value: string
}> = ({ value }) => {
  return (
    <div className={`${styles.markdown_container}`}>
      <BytemdViewer plugins={[gfm(), mediumZoom(), highlight(), frontmatter()]} value={value} />
    </div>
  )
}
