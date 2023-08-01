import { FC } from 'react';
import styles from './index.module.css';
import "./index.css"
import mediumZoom from '@bytemd/plugin-medium-zoom'
import highlight from "@bytemd/plugin-highlight"
import gfm from '@bytemd/plugin-gfm'
import {Viewer as BytemdViewer} from "@bytemd/react"
import 'highlight.js/styles/default.css'
import 'bytemd/dist/index.css'

export const Viewer: FC<{
  value:string
}> = ({value}) => {
return   <div className={`${styles.markdown_container}`}>
<BytemdViewer  plugins={[
  gfm(),
  mediumZoom(),
  highlight(),
]} value={value} /> 
</div>
};