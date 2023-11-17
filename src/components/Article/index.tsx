import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import { FC } from 'react'
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'

export const Article: FC<{
  className?: string
}> = ({ className }) => {
  return (
    <Card className={`shadow-none border border-solid border-zinc-100 ${className}`}>
      <CardMedia
        component="img"
        height="240"
        image={'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/2.jpg'}
        alt="Paella dish"
      />
      <CardContent>
        <Typography className="mb-2" variant="h6" color="InfoText">
          <Stack direction="row" alignItems="center" spacing={1} className="mb-2">
            <span>江畔河谷</span>
            {/* 标签 */}
            <Chip
              size="small"
              label="Javascript"
              color="primary"
              className="text-sm"
              variant="outlined"
            />
          </Stack>
        </Typography>
        <Typography className="mb-2" variant="body2" color="text.secondary">
          长歌濯足烟霞里，始信幽人乐是真。 芦汀洲隐浦应制; 长镵种玉云千亩，短棹垂纶雨一蓑。
          川原和居野应制; 三年游宦客京师，长忆丰城送别时
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            window.location.href = '/articles/1'
          }}
        >
          开始阅读
        </Button>
      </CardContent>
      <CardActions>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button variant="text" startIcon={<VisibilityIcon />}>
            20
          </Button>
          <Button variant="text" startIcon={<FavoriteIcon />}>
            1
          </Button>
          <Button variant="text" startIcon={<ShareIcon />}>
            2
          </Button>
        </Stack>
      </CardActions>
    </Card>
  )
}
