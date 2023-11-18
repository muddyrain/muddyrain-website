import { FC } from 'react'

export const Title: FC<{
  title: string
}> = ({ title = '标题' }) => {
  return <span className="text-xl font-bold text-blue-950 select-none">{title}</span>
}
