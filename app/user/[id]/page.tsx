import UserPage from '@/views/user'

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

export default function Page() {
  return <UserPage />
}
