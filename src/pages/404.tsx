import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Stack direction="row" spacing={6}>
          <Stack spacing={2}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">您要查找的页面不存在。</Typography>
            <Button
              className="mt-4"
              variant="contained"
              onClick={() => {
                history.go(-1)
              }}
            >
              返回
            </Button>
          </Stack>
          <Image
            src="https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/website/not-found-404.jpg"
            width={500}
            height={250}
            alt="404"
          />
        </Stack>
      </Container>
    </Box>
  )
}
