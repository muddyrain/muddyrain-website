'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Loading } from '../../components/Loading';
import { useEffect } from 'react';
export default function Home() {
  return (
    <div>
      <Link href={'/detail'}>详情</Link>
    </div>
  );
}
