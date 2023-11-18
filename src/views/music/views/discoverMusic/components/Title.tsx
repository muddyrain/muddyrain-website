import { NavigateNext } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { FC } from 'react'

export const Title: FC<{
  title: string
}> = ({ title }) => {
  return (
    <>
      <Typography variant={'h6'} className="flex items-center">
        <span>{title}</span>
        <NavigateNext />
      </Typography>
    </>
  )
}
