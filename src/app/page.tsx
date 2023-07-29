import Link from 'next/link';
import { Loading } from '../components/Loading';
export default function Home() {
  return (
    <div className='w-20 h-20 bg-red-400'>
      <Link href={'/detail'}>跳转详情</Link>
      <Loading />
    </div>
  );
}
