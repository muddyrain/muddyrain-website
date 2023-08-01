'use client'
import { Layout } from '@/Layout'
import { Editor } from '@/components'
import { useState } from 'react'

export default function Page() {
  const [content, setContent] = useState<string>('')
  return (
    <Layout>
      <div className="w-container mx-auto my-4 p-4 rounded-lg bg-white">
        <Editor
          value={content}
          onChange={e => {
            setContent(e)
          }}
          onChangeTheme={theme => {
            console.log(theme)
          }}
        ></Editor>
      </div>
    </Layout>
  )
}
