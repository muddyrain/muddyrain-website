import { CSSProperties, FC } from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
interface RingImageProps {
  className?: string
  src: string
  ringWidth?: number
}
export const RingImage: FC<RingImageProps> = ({ className, src, ringWidth = 50 }) => {
  const cssVariables = {
    '--ring-width': `${ringWidth}px`,
    '--ring-width2': `${ringWidth + 1}px`,
  }
  return (
    <>
      <div className={`${styles.container} ${className}`} style={cssVariables as CSSProperties}>
        <Image
          className="h-full w-full pointer-events-none rounded-sm object-contain select-none absolute left-0 z-10"
          alt="cd"
          src={src}
          width={0}
          height={0}
        />
      </div>
    </>
  )
}
