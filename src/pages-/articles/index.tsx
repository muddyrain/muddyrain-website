import { PageComponentProps } from '@/types'
import ArticlesPage from '@/views/articles'

export default function Page(props: PageComponentProps) {
  return <ArticlesPage {...props} />
}
