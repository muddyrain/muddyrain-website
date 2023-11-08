import { FC } from 'react'
import { Banner } from './components/Banner'

export const DiscoverMusic: FC = () => {
  return (
    <>
      <div className="flex">
        <Banner />
        <div className="w-1/3"></div>
        <div className="w-1/3"></div>
      </div>
    </>
  )
}
