import { Box, Button, Stack } from '@mui/material'
import Image from 'next/image'
import NotFoundImage from './404.png'
import { useRouter } from 'next/router'

export default function NotFound() {
  const router = useRouter()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Stack spacing={4}>
        <Image src={NotFoundImage} alt="404" width={480} height={240} />
        <div className="flex justify-center">
          <Button
            className="w-36"
            variant="outlined"
            onClick={() => {
              router.push('/')
            }}
          >
            回到首页
          </Button>
        </div>
      </Stack>
    </Box>
  )
}
