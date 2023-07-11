import Link from 'next/link';

export default function Home() {
  return (
    <div className='text-2xl'>
      <span></span>
      <Link href={'/detail'}>跳转详情</Link>
    </div>
  );
}
