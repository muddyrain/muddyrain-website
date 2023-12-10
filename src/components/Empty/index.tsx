import { Box } from '@mui/material'
import { FC } from 'react'
import NoData from './NoData.svg'
import Image from 'next/image'
export const Empty: FC<{
  ImageWidth?: number
  description?: string
}> = ({ ImageWidth = 180, description = '暂无数据' }) => {
  return (
    <Box
      flexDirection={'column'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      p={2}
    >
      <Image
        className="pointer-events-none select-none"
        width={ImageWidth}
        src={NoData}
        alt="no-data"
      />
      <span className="text-gray-600 mt-2">{description}</span>
    </Box>
  )
}
