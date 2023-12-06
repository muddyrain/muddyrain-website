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
import { FC, useMemo } from 'react'
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import { ArticleType } from '@/types'
import { ArticleTagOptions } from '@/constant'
import { useRouter } from 'next/router'
export const Article: FC<{
  className?: string
  article: ArticleType
}> = ({ className, article = null }) => {
  const router = useRouter()
  const tag = useMemo(() => {
    return ArticleTagOptions.find(item => item.value === article?.tag)?.label
  }, [article])
  return (
    <Card className={`shadow-none border border-solid border-zinc-100 ${className}`}>
      {article?.cover && (
        <CardMedia component="img" height="240" image={article.cover} alt="Paella dish" />
      )}
      <CardContent>
        <Typography className="mb-2" variant="h6" color="InfoText">
          <Stack direction="row" alignItems="center" spacing={1} className="mb-2">
            <span>{article?.title}</span>
            {/* 标签 */}
            {tag && (
              <Chip
                size="small"
                label={tag}
                color="primary"
                className="text-sm"
                variant="outlined"
              />
            )}
          </Stack>
        </Typography>
        <Typography className="mb-2 truncate text-ellipsis" variant="body2" color="text.secondary">
          <span>{article?.brief_content || ''}</span>
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            router.push('/articles/' + article?.id)
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
