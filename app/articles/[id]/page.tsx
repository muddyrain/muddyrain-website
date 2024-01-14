import ArticlesDetailPage from '@/views/articles/detail'
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

export default function Page() {
  return <ArticlesDetailPage />
}
