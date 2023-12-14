'use client'
import { FC, useMemo } from 'react'
import styles from './index.module.css'
export const BlockLoading: FC<{ color?: string; size?: 'default' | 'small' | 'large' }> = ({
  color = '#333333',
  size = 'default',
}) => {
  const containerSize = useMemo(() => {
    switch (size) {
      case 'default':
        return 'w-12 h-12'
      case 'small':
        return 'w-9 h-9'
      case 'large':
        return 'w-15 h-15'
      default:
        return 'w-12 h-12'
    }
  }, [size])
  const itemSize = useMemo(() => {
    switch (size) {
      case 'default':
        return 'w-4 h-4'
      case 'small':
        return 'w-3 h-3'
      case 'large':
        return 'w-5 h-5'
      default:
        return 'w-4 h-4'
    }
  }, [size])
  return (
    <div className={`${containerSize}`}>
      <div
        className={`${itemSize} float-left ${styles.cube_item}`}
        style={{
          animationDelay: '0s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`${itemSize} float-left ${styles.cube_item}`}
        style={{
          animationDelay: '0.1s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`${itemSize} float-left ${styles.cube_item}`}
        style={{
          animationDelay: '0.2s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`${itemSize} float-left ${styles.cube_item}`}
        style={{
          animationDelay: '-0.1s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`${itemSize} float-left ${styles.cube_item}`}
        style={{
          animationDelay: '0s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`${itemSize} float-left ${styles.cube_item}`}
        style={{
          animationDelay: '0.1s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`${itemSize} float-left ${styles.cube_item}`}
        style={{
          animationDelay: '-0.2s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`${itemSize} float-left ${styles.cube_item}`}
        style={{
          animationDelay: '-0.1s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
      <div
        className={`${itemSize} float-left ${styles.cube_item}`}
        style={{
          animationDelay: '0s',
          animationDuration: '1300ms',
          backgroundColor: color,
        }}
      ></div>
    </div>
  )
}
